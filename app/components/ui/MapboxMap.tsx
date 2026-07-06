'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapFeatures from '../../data/kjOahuMap.json';

interface MapboxMapProps {
  accessToken: string;
  username: string;
  styleId: string;
  /** [lat, lng] as stored in wedding.json (Mapbox itself wants [lng, lat]) */
  coordinates: [number, number];
  zoom: number;
  pitch: number;
  bearing: number;
  /** Rendered instead of the map if the style fails to load (offline,
      blocked network, revoked/URL-restricted token, unpublished style) —
      e.g. the old Google embed. */
  fallback?: React.ReactNode;
}

type MapFeature = {
  properties: { name: string; kind: string; subtitle?: string; address?: string };
  geometry: { type: string; coordinates: number[] | number[][] };
};

const FEATURES = (mapFeatures as { features: MapFeature[] }).features;

/**
 * Interactive venue map running the couple's custom Studio style
 * ("Midnight Aloha 3D").
 *
 * The published style is only the basemap — Studio rejects inline geojson
 * sources, so the wedding pins and shuttle routes were split into
 * `app/data/kjOahuMap.json` and are layered back on here at runtime: the
 * three shuttle routes as rose-gold lines, the venue + pickups as labelled
 * markers with popups.
 *
 * Cooperative gestures keep page scrolling usable: ctrl/cmd + scroll zooms
 * (plain scroll passes through, matching the old embed's zoomwheel=false),
 * and touch needs two fingers to pan.
 */
export default function MapboxMap({
  accessToken,
  username,
  styleId,
  coordinates,
  zoom,
  pitch,
  bearing,
  fallback,
}: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (failed || !mapContainer.current || !accessToken) return;

    mapboxgl.accessToken = accessToken;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: `mapbox://styles/${username}/${styleId}`,
      center: [coordinates[1], coordinates[0]],
      zoom,
      pitch,
      bearing,
      cooperativeGestures: true,
      attributionControl: false,
    });

    // Zoom buttons + a working compass (click resets the 3D bearing to north)
    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'top-left');
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right');

    const markers: mapboxgl.Marker[] = [];
    let loaded = false;

    // If the custom style never arrives (blocked network, bad/URL-restricted
    // token, unpublished style), hand the plate back to the fallback. A
    // watchdog covers the case where neither `load` nor `error` ever fires.
    const watchdog = setTimeout(() => {
      if (!loaded) setFailed(true);
    }, 9000);

    map.on('error', e => {
      const err = e.error as (Error & { status?: number }) | undefined;
      const authFail = err?.status === 401 || err?.status === 403 || err?.status === 404;
      if (!loaded && (authFail || /style|Failed to fetch|Unauthorized|Forbidden|Not Found/i.test(String(err?.message)))) {
        clearTimeout(watchdog);
        setFailed(true);
      }
    });

    map.on('load', () => {
      loaded = true;
      clearTimeout(watchdog);

      // ---- Shuttle routes: rose-gold ribbons converging on the estate ----
      const routes = {
        type: 'FeatureCollection' as const,
        features: FEATURES.filter(f => f.geometry.type === 'LineString'),
      };
      if (routes.features.length && !map.getSource('kj-routes')) {
        map.addSource('kj-routes', {
          type: 'geojson',
          data: routes,
        } as unknown as mapboxgl.GeoJSONSourceSpecification);

        // Keep the route beneath the style's road/place labels
        const firstSymbol = map.getStyle().layers?.find(l => l.type === 'symbol')?.id;

        map.addLayer(
          {
            id: 'kj-routes-glow',
            type: 'line',
            source: 'kj-routes',
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
              'line-color': '#DFA777',
              'line-width': ['interpolate', ['linear'], ['zoom'], 10, 3, 15, 9],
              'line-opacity': 0.22,
              'line-blur': 3,
            },
          },
          firstSymbol
        );
        map.addLayer(
          {
            id: 'kj-routes-line',
            type: 'line',
            source: 'kj-routes',
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
              'line-color': '#E9C18F',
              'line-width': ['interpolate', ['linear'], ['zoom'], 10, 1.2, 15, 3.2],
              'line-opacity': 0.9,
              'line-dasharray': [1.5, 1.1],
            },
          },
          firstSymbol
        );
      }

      // ---- Markers: the venue, and the three shuttle pickups -------------
      FEATURES.filter(f => f.geometry.type === 'Point').forEach(f => {
        const [lng, lat] = f.geometry.coordinates as number[];
        const isVenue = f.properties.kind === 'venue';

        const el = document.createElement('div');
        el.style.cssText =
          'display:flex;flex-direction:column;align-items:center;cursor:pointer;transform:translateY(-2px);';

        const dot = document.createElement('div');
        const size = isVenue ? 18 : 11;
        dot.style.cssText = [
          `width:${size}px`,
          `height:${size}px`,
          'border-radius:9999px',
          isVenue ? 'background:#E7CF9F' : 'background:#EFE7D8',
          isVenue ? 'border:2px solid #8C6F3F' : 'border:1.5px solid #B75C58',
          isVenue
            ? 'box-shadow:0 0 0 4px rgba(201,166,107,0.35),0 0 14px rgba(231,207,159,0.7)'
            : 'box-shadow:0 0 0 3px rgba(183,92,88,0.3)',
        ].join(';');
        el.appendChild(dot);

        if (isVenue) {
          const label = document.createElement('span');
          label.textContent = f.properties.name;
          label.style.cssText = [
            'margin-top:4px',
            'font-family:Georgia,serif',
            'font-size:11px',
            'letter-spacing:0.06em',
            'text-transform:uppercase',
            'color:#F4E4CD',
            'text-shadow:0 1px 3px rgba(5,8,20,0.95),0 0 2px rgba(5,8,20,0.95)',
            'white-space:nowrap',
            'pointer-events:none',
          ].join(';');
          el.appendChild(label);
        }

        const popup = new mapboxgl.Popup({ offset: 16, closeButton: false }).setHTML(
          `<div style="font-family:Georgia,serif;color:#2B1B10;max-width:200px">
             <div style="font-weight:700;font-size:13px;color:#560216">${f.properties.name}</div>
             ${f.properties.subtitle ? `<div style="font-size:12px;margin-top:2px">${f.properties.subtitle}</div>` : ''}
             ${f.properties.address ? `<div style="font-size:11px;opacity:0.7;margin-top:3px">${f.properties.address}</div>` : ''}
           </div>`
        );

        const marker = new mapboxgl.Marker({ element: el, anchor: 'bottom' })
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(map);
        markers.push(marker);
      });
    });

    return () => {
      clearTimeout(watchdog);
      markers.forEach(m => m.remove());
      map.remove();
    };
  }, [failed, accessToken, username, styleId, coordinates, zoom, pitch, bearing]);

  if (failed && fallback) return <>{fallback}</>;

  return <div ref={mapContainer} className="w-full h-[300px]" data-venue-map />;
}

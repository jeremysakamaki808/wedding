'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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
      blocked network, revoked token) — e.g. the old Google embed. */
  fallback?: React.ReactNode;
}

/**
 * Interactive venue map running the couple's custom Studio style
 * ("Midnight Aloha 3D"). Cooperative gestures keep page scrolling usable:
 * ctrl/cmd + scroll zooms (plain scroll passes through, matching the
 * embed's zoomwheel=false), and touch needs two fingers to pan.
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

    // If the custom style never arrives, hand the plate back to the fallback
    let loaded = false;
    map.on('load', () => {
      loaded = true;
    });
    map.on('error', e => {
      if (!loaded && /style|Failed to fetch|Unauthorized|Forbidden/i.test(String(e.error?.message))) {
        setFailed(true);
      }
    });

    return () => {
      map.remove();
    };
  }, [failed, accessToken, username, styleId, coordinates, zoom, pitch, bearing]);

  if (failed && fallback) return <>{fallback}</>;

  return <div ref={mapContainer} className="w-full h-[300px]" data-venue-map />;
}

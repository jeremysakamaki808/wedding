# Kaimea Estates Image Sourcing Guide

## Overview
This document helps identify and source the 3 required venue images from https://kaimeaestates.com/

## Required Images

### venue-1.jpg: Lush Gardens with Coastal Views
**Description:** Wide shot showing tropical gardens with ocean/coastal views visible
**Target Size:** 600×400px (3:2 aspect ratio)
**File Size Target:** 150–250 KB
**Location on site:** Likely in Gallery, Grounds, or Outdoor Spaces section
**Visual Elements to Look For:**
- Tropical vegetation/palm trees
- Ocean or coastal landscape in background
- Golden hour/afternoon light preferred
- Professional photography quality

**Where to Find:**
- Check: "Gallery" → "Grounds" or "Outdoor Spaces"
- Or: Home page hero section
- Or: "Venue Features" or similar section

---

### venue-2.jpg: Elegant Decorated Garden/Pavilion
**Description:** Garden pavilion or decorated space set up for celebration/ceremony
**Target Size:** 600×400px (3:2 aspect ratio)
**File Size Target:** 150–250 KB
**Location on site:** Likely in Wedding Events, Gallery, or Pavilion section
**Visual Elements to Look For:**
- Elegant setup (string lights, florals, seating, etc.)
- Covered pavilion or garden setting
- Daylight or soft evening light
- Professional event photography

**Where to Find:**
- Check: "Weddings" or "Events" section
- Or: "Gallery" → "Decorated Spaces"
- Or: "Venue Features" → "Pavilion"

---

### venue-3.jpg: Ceremony Lawn—Expansive Grass Space
**Description:** Open, spacious lawn area suitable for outdoor ceremony
**Target Size:** 600×400px (3:2 aspect ratio)
**File Size Target:** 150–250 KB
**Location on site:** Likely in Grounds, Ceremony, or Outdoor Spaces section
**Visual Elements to Look For:**
- Open, manicured lawn
- Surrounded by gardens/greenery
- Sky visible (dramatic cloud formations ideal)
- No people or minimal decoration (natural/blank canvas feel)

**Where to Find:**
- Check: "Gallery" → "Grounds" or "Lawn"
- Or: "Ceremony" section
- Or: Aerial/overhead shot if available

---

## How to Source Images

### Option A: Direct Image Download
1. Browse https://kaimeaestates.com/
2. Right-click on suitable images
3. Select "Save image as..."
4. Save with names: `venue-1.jpg`, `venue-2.jpg`, `venue-3.jpg`
5. Place in: `/public/images/venue/`

### Option B: Get Image URLs
1. Right-click on image → "Copy image link"
2. Paste the URLs into a text file
3. Provide URLs to Claude for download and optimization

### Option C: Take Screenshots
1. Screenshot the relevant sections showing the images
2. Provide screenshots to Claude
3. Claude can help extract and prepare images

---

## Backup Strategy (If Images Unavailable)

If Kaimea doesn't have ideal images for specific categories:
- **venue-1 fallback:** Use any expansive garden shot with greenery
- **venue-2 fallback:** Use elegant covered area or interior pavilion space
- **venue-3 fallback:** Use alternative lawn/grounds photo

Document all substitutions in `/public/images/CREDITS.md`

---

## Next Steps

Once you've sourced the images:
1. Place them in `/public/images/venue/` (venue-1.jpg, venue-2.jpg, venue-3.jpg)
2. Run optimization (Claude will handle this)
3. Update `wedding.json` with real URLs
4. Test across devices (mobile, tablet, desktop)

---

## Permission Reminder

Consider contacting Kaimea Estates for official permission to use their venue photography on your wedding website. You can reference this email template:

```
Subject: Permission to Use Venue Photography on Wedding Website

Dear Kaimea Estates,

We are excited to celebrate our wedding at your beautiful venue on [DATE]. 
As part of our wedding website, we would like to feature [NUMBER] photographs 
of your venue to showcase the space to our guests.

We would appreciate permission to use these images on our wedding website and 
social media, with proper attribution to Kaimea Estates.

Please let us know if you have any questions or require additional information.

Thank you,
[Your Names]
```

---

Generated: July 6, 2026

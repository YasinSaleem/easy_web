# Image Assets Directory

This directory contains static images used by the real estate website generator.

## Directory Structure:
- `gallery/` - Sample gallery images
- `hero/` - Hero background images  
- `logos/` - Company and project logos
- `amenities/` - Amenity and facility images

## Usage:
Images are referenced in components using `/images/[folder]/[filename]` paths.
These serve as fallback images when campaign data doesn't include specific images.

## Image Guidelines:
- Use WebP format for better compression
- Optimize for web (< 1MB per image)
- Include alt text in component props
- Maintain aspect ratios: 16:9 for hero, 4:3 for gallery, 1:1 for icons
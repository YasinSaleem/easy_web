import type { NextApiRequest, NextApiResponse } from 'next';
import { renderToStaticMarkup } from 'react-dom/server';
import { campaignSchema, type Campaign } from '../../schema/campaignSchema';
import { jsonToProps } from '../../utils/jsonToProps';
import Template from '../../templates/springleaf/Template';
import React from 'react';

export default async function handler(
  req: NextApiRequest & { method?: string },
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Only POST requests are supported'
    });
  }

  try {
    const { campaignData, route = '/' } = req.body;

    // Validate required fields
    if (!campaignData) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'campaignData is required'
      });
    }

    // Valid routes for our React components
    const availableRoutes = ['/', '/home', '/location', '/register-interest', '/project-detail', '/gallery', '/floor-plans'];
    if (!availableRoutes.includes(route)) {
      return res.status(400).json({
        error: 'Invalid route',
        message: `Route must be one of: ${availableRoutes.join(', ')}`,
        availableRoutes
      });
    }

    // Parse and validate campaign data using Zod schema
    let validatedCampaign: Campaign;
    try {
      validatedCampaign = campaignSchema.parse(campaignData);
    } catch (error: any) {
      return res.status(400).json({
        error: 'Invalid campaign data',
        message: 'The provided campaign data does not match the required schema',
        validationErrors: error.issues?.map((err: any) => ({
          path: err.path?.join('.') || 'unknown',
          message: err.message || 'Validation error',
          code: err.code || 'invalid'
        })) || []
      });
    }

    // Convert campaign data to component props (preview mode - not static generation)
    const componentData = jsonToProps(validatedCampaign, route, false);
    
    // Render React component to HTML
    const componentHTML = renderToStaticMarkup(React.createElement(Template, { data: componentData }));

    // Create full HTML document
    const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${componentData.projectName} - Modern luxury living">
  <title>${componentData.projectName}${route !== '/' ? ' - ' + route.replace('/', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : ''}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: {
              50: '#f0fdf4',
              100: '#dcfce7',
              200: '#bbf7d0',
              300: '#86efac',
              400: '#4ade80',
              500: '#22c55e',
              600: '#16a34a',
              700: '#15803d',
              800: '#166534',
              900: '#14532d'
            },
            sage: {
              50: '#f6f7f6',
              100: '#e3e8e3',
              200: '#c7d2c7',
              300: '#a3b3a3',
              400: '#7a917a',
              500: '#5a745a',
              600: '#475d47',
              700: '#3a4b3a',
              800: '#303e30',
              900: '#2a332a'
            },
            accent: {
              50: '#fffbeb',
              100: '#fef3c7',
              200: '#fde68a',
              300: '#fcd34d',
              400: '#fbbf24',
              500: '#f59e0b',
              600: '#d97706',
              700: '#b45309',
              800: '#92400e',
              900: '#78350f'
            }
          },
          fontFamily: {
            sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif']
          }
        }
      }
    }
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body>
  ${componentHTML}
  <script>
    // Add mobile menu functionality
    document.addEventListener('DOMContentLoaded', function() {
      const menuButton = document.querySelector('[data-mobile-menu-button]');
      const mobileMenu = document.querySelector('[data-mobile-menu]');
      
      if (menuButton && mobileMenu) {
        let isOpen = false;
        
        // Set initial state - menu should be hidden
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('block');
        
        menuButton.addEventListener('click', function(e) {
          e.preventDefault();
          isOpen = !isOpen;
          
          if (isOpen) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('block');
            // Update hamburger icon to show X
            const hamburgerIcon = menuButton.querySelector('svg:first-child');
            const closeIcon = menuButton.querySelector('svg:last-child');
            if (hamburgerIcon && closeIcon) {
              hamburgerIcon.classList.add('hidden');
              hamburgerIcon.classList.remove('block');
              closeIcon.classList.remove('hidden');
              closeIcon.classList.add('block');
            }
          } else {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('block');
            // Update icon back to hamburger
            const hamburgerIcon = menuButton.querySelector('svg:first-child');
            const closeIcon = menuButton.querySelector('svg:last-child');
            if (hamburgerIcon && closeIcon) {
              hamburgerIcon.classList.remove('hidden');
              hamburgerIcon.classList.add('block');
              closeIcon.classList.add('hidden');
              closeIcon.classList.remove('block');
            }
          }
        });
        
        // Close menu when clicking on a link
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(function(link) {
          link.addEventListener('click', function() {
            isOpen = false;
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('block');
            // Reset icons
            const hamburgerIcon = menuButton.querySelector('svg:first-child');
            const closeIcon = menuButton.querySelector('svg:last-child');
            if (hamburgerIcon && closeIcon) {
              hamburgerIcon.classList.remove('hidden');
              hamburgerIcon.classList.add('block');
              closeIcon.classList.add('hidden');
              closeIcon.classList.remove('block');
            }
          });
        });
      }
      
      // Handle navigation links for preview mode
      const navLinks = document.querySelectorAll('header a, footer a');
      navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const href = link.getAttribute('href');
          
          console.log('Navigation clicked:', href);
          
          // Send message to parent window to update preview
          if (window.parent && window.parent !== window) {
            console.log('Sending message to parent');
            window.parent.postMessage({
              type: 'PREVIEW_NAVIGATE',
              route: href
            }, '*');
          }
        });
      });
    });
  </script>
</body>
</html>`.trim();

    // Set appropriate headers
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    // Return the generated HTML
    return res.status(200).send(fullHTML);

  } catch (error) {
    console.error('Preview generation error:', error);
    
    // Handle different types of errors
    if (error instanceof Error) {
      return res.status(500).json({
        error: 'Internal server error',
        message: 'An error occurred while generating the preview',
        details: error.message
      });
    }

    return res.status(500).json({
      error: 'Internal server error',
      message: 'An unexpected error occurred'
    });
  }
}

// API route configuration
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Allow larger JSON payloads for campaign data with images
    },
  },
};
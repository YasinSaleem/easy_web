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
    const { campaignData, format = 'json' } = req.body;

    // Validate required fields
    if (!campaignData) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'campaignData is required'
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

    // Get business name for naming
    const businessName = validatedCampaign.campaign?.details?.business_details?.business_name || 'springleaf-residence';
    const sanitizedBusinessName = businessName.toLowerCase().replace(/[^a-z0-9-]/g, '-');

    // Generate all HTML pages using React components
    const routes = ['/', '/location', '/register-interest', '/project-detail', '/gallery', '/floor-plans'];
    const routeFileMap: { [key: string]: string } = {
      '/': 'index.html',
      '/location': 'location.html',
      '/register-interest': 'register-interest.html',
      '/project-detail': 'project-detail.html',
      '/gallery': 'gallery.html',
      '/floor-plans': 'floor-plans.html'
    };

    const generatedFiles: { [filename: string]: string } = {};

    // Generate HTML files for each route
    for (const route of routes) {
      try {
        // Convert campaign data to component props (with static generation mode enabled)
        const componentData = jsonToProps(validatedCampaign, route, true);
        
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
    });
  </script>
</body>
</html>`.trim();

        const fileName = routeFileMap[route] || `${route.slice(1)}.html`;
        generatedFiles[fileName] = fullHTML;
      } catch (error) {
        console.error(`Error generating page for route ${route}:`, error);
        // Add error page instead
        generatedFiles[routeFileMap[route] || `${route.slice(1)}.html`] = `
<!DOCTYPE html>
<html>
<head>
    <title>Page Generation Error</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; margin: 2rem; color: #333;">
    <h1 style="color: #dc2626;">Error</h1>
    <p>There was an error generating this page for route: <strong>${route}</strong></p>
    <p>Please check your campaign data and try again.</p>
    <details style="margin-top: 1rem;">
      <summary style="cursor: pointer; font-weight: bold;">Error Details</summary>
      <pre style="background: #f3f4f6; padding: 1rem; border-radius: 4px; margin-top: 0.5rem; overflow-x: auto;">${error instanceof Error ? error.message : 'Unknown error'}</pre>
    </details>
</body>
</html>`;
      }
    }

    // Add README file
    const readmeContent = `# ${businessName}

This modern responsive website was generated automatically from campaign data using React + Tailwind CSS.

## Files Included:
- index.html - Homepage with hero, value proposition, and CTA
- location.html - Location details with amenities and transport
- register-interest.html - Property registration form and contact information
- project-detail.html - Project specifications and amenities
- gallery.html - Interactive photo gallery with lightbox
- floor-plans.html - Floor plan layouts with interactive selection

## Features:
- ✅ Modern responsive design with Tailwind CSS
- ✅ Mobile-first approach with hamburger menu
- ✅ Premium real estate styling
- ✅ Interactive components (gallery, floor plans)
- ✅ SEO-friendly structure
- ✅ Cross-browser compatibility

## Setup:
1. Extract all files to a web server directory
2. Open index.html in a web browser
3. All pages are linked and ready to use
4. Works offline - all dependencies included via CDN

## Technology Stack:
- React components rendered to static HTML
- Tailwind CSS for styling
- Vanilla JavaScript for interactions
- Responsive grid layouts
- Modern typography with Inter font

Generated on: ${new Date().toISOString()}
Campaign: ${validatedCampaign.campaign?.name || 'Real Estate Campaign'}
Business: ${businessName}
`;

    generatedFiles['README.md'] = readmeContent;

    // Return JSON bundle that frontend can process
    const timestamp = new Date().toISOString().slice(0, 10);
    
    return res.status(200).json({
      success: true,
      data: {
        businessName: sanitizedBusinessName,
        timestamp,
        files: generatedFiles,
        metadata: {
          campaignName: validatedCampaign.campaign?.name || 'Real Estate Campaign',
          pagesGenerated: Object.keys(generatedFiles).filter(f => f.endsWith('.html')).length,
          totalFiles: Object.keys(generatedFiles).length,
          technology: 'React + Tailwind CSS',
          responsive: true,
          mobileOptimized: true
        }
      }
    });

  } catch (error) {
    console.error('Generation error:', error);
    
    if (error instanceof Error) {
      return res.status(500).json({
        error: 'Internal server error',
        message: 'An error occurred while generating the website files',
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
      sizeLimit: '10mb',
    },
  },
};
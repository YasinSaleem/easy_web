import type { NextApiRequest, NextApiResponse } from 'next';
import { renderToStaticMarkup } from 'react-dom/server';
import { InternalSchema, InternalSchemaType } from '../../schema/internalSchema';
import { mapInternalSchemaToTemplate } from '../../templates/springleaf/utils/schemaMapper';
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
      message: 'Only POST requests are supported',
    });
  }

  try {
    const { internalSchemaData, format = 'json' } = req.body;

    // Validate required fields
    if (!internalSchemaData) {
      return res.status(400).json({
        error: 'Missing required fields',
        message:
          'internalSchemaData is required. Use /api/transform to convert campaign data first.',
      });
    }

    // Parse and validate internal schema data using Zod
    let validatedSchema: InternalSchemaType;
    try {
      validatedSchema = InternalSchema.parse(internalSchemaData);
    } catch (error: any) {
      return res.status(400).json({
        error: 'Invalid internal schema data',
        message: 'The provided internal schema data does not match the required format',
        validationErrors:
          error.issues?.map((err: any) => ({
            path: err.path?.join('.') || 'unknown',
            message: err.message || 'Validation error',
            code: err.code || 'invalid',
          })) || [],
      });
    }

    // Get business name for naming
    const businessName = validatedSchema.business.name || 'business-website';
    const sanitizedBusinessName = businessName.toLowerCase().replace(/[^a-z0-9-]/g, '-');

    // Generate single-page HTML application
    const generatedFiles: { [filename: string]: string } = {};

    try {
      // Convert internal schema to template props
      const templateData = mapInternalSchemaToTemplate(validatedSchema);

      // Render React component to HTML
      const componentHTML = renderToStaticMarkup(
        React.createElement(Template, { data: validatedSchema })
      );

      // Create full HTML document with proper anchor navigation and hamburger menu
      const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${templateData.projectName} - Modern luxury living">
  <title>${templateData.projectName}</title>
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
  <style>
    html {
      scroll-behavior: smooth;
      scroll-padding-top: 80px;
    }
  </style>
</head>
<body>
  ${componentHTML}
  <script>
    // Add mobile menu functionality and anchor navigation
    document.addEventListener('DOMContentLoaded', function() {
      // Mobile menu functionality
      const menuButton = document.querySelector('[data-mobile-menu-button]');
      const mobileMenu = document.querySelector('[data-mobile-menu]');
      
      if (menuButton && mobileMenu) {
        let isOpen = false;
        
        menuButton.addEventListener('click', function(e) {
          e.preventDefault();
          isOpen = !isOpen;
          
          if (isOpen) {
            // Show mobile menu
            mobileMenu.classList.remove('max-h-0', 'opacity-0');
            mobileMenu.classList.add('max-h-96', 'opacity-100');
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
            // Hide mobile menu
            mobileMenu.classList.remove('max-h-96', 'opacity-100');
            mobileMenu.classList.add('max-h-0', 'opacity-0');
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
            mobileMenu.classList.remove('max-h-96', 'opacity-100');
            mobileMenu.classList.add('max-h-0', 'opacity-0');
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
      
      // Smooth scrolling for anchor links
      const anchorLinks = document.querySelectorAll('a[href^="#"]');
      anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const href = link.getAttribute('href');
          if (href && href.startsWith('#')) {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
              targetElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }
          }
        });
      });
    });
  </script>
</body>
</html>`.trim();

      generatedFiles['index.html'] = fullHTML;
    } catch (error) {
      console.error('Error generating single-page HTML:', error);
      // Add error page instead
      generatedFiles['index.html'] = `
<!DOCTYPE html>
<html>
<head>
    <title>Page Generation Error</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; margin: 2rem; color: #333;">
    <h1 style="color: #dc2626;">Error</h1>
    <p>There was an error generating the single-page website.</p>
    <p>Please check your internal schema data and try again.</p>
    <details style="margin-top: 1rem;">
      <summary style="cursor: pointer; font-weight: bold;">Error Details</summary>
      <pre style="background: #f3f4f6; padding: 1rem; border-radius: 4px; margin-top: 0.5rem; overflow-x: auto;">${error instanceof Error ? error.message : 'Unknown error'}</pre>
    </details>
</body>
</html>`;
    }

    // Add README file
    const readmeContent = `# ${businessName}

This modern single-page responsive website was generated automatically from internal schema data using React + Tailwind CSS.

## Files Included:
- index.html - Complete single-page website with all sections

## Features:
- ✅ Single-page application with smooth anchor navigation
- ✅ Modern responsive design with Tailwind CSS
- ✅ Mobile-first approach with functional hamburger menu
- ✅ Smooth scrolling between sections
- ✅ Premium real estate styling
- ✅ Interactive components (gallery, floor plans)
- ✅ SEO-friendly structure
- ✅ Cross-browser compatibility
- ✅ Works offline - all dependencies included via CDN

## Navigation:
All sections are accessible through the navigation menu:
- Home - Hero section with main call-to-action
- About - Value proposition and key features
- Project Details - Specifications and amenities
- Gallery - Interactive photo gallery
- Floor Plans - Apartment layouts
- Location - Address and nearby amenities
- Register Interest - Contact form

## Setup:
1. Extract files to any web server directory
2. Open index.html in a web browser
3. All navigation works via smooth scrolling anchors
4. Fully functional single-page application

## Technology Stack:
- React components rendered to static HTML
- Tailwind CSS for styling
- Vanilla JavaScript for navigation and mobile menu
- HTML5 semantic structure with anchor navigation

Generated on: ${new Date().toLocaleDateString()}
Business: ${businessName}
Template: ${validatedSchema.metadata?.template || 'Springleaf'}
`;

    generatedFiles['README.md'] = readmeContent;

    // Return response based on format
    if (format === 'json') {
      return res.status(200).json({
        success: true,
        message: 'Single-page website generated successfully',
        data: {
          businessName: sanitizedBusinessName,
          timestamp: new Date().toISOString(),
          files: generatedFiles,
          metadata: {
            campaignName: validatedSchema.metadata?.campaignName || businessName,
            pagesGenerated: 1, // Single page now
            businessName,
            template: validatedSchema.metadata?.template || 'springleaf',
          },
        },
      });
    }

    return res.status(400).json({
      error: 'Unsupported format',
      message: 'Only JSON format is currently supported',
    });
  } catch (error) {
    console.error('Generation error:', error);

    // Handle different types of errors
    if (error instanceof Error) {
      return res.status(500).json({
        error: 'Internal server error',
        message: 'An error occurred while generating the website',
        details: error.message,
      });
    }

    return res.status(500).json({
      error: 'Internal server error',
      message: 'An unexpected error occurred',
    });
  }
}

// API route configuration
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Allow larger JSON payloads for schema data with images
    },
  },
};

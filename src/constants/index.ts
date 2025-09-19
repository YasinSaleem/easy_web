export const AVAILABLE_ROUTES = [
  { path: '/', label: 'Homepage' },
  { path: '/location', label: 'Location' },
  { path: '/project-detail', label: 'Project Details' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/floor-plans', label: 'Floor Plans' },
  { path: '/register-interest', label: 'Register Interest' },
] as const;

export const FALLBACK_CAMPAIGN_DATA = {
  campaign: {
    name: 'Sample Property Campaign',
    details: {
      business_details: {
        business_name: 'Springleaf Residence',
        website: 'https://example.com',
        mobile: '+65 1234 5678',
      },
      ai_assisted_product_usps: [
        'Prime location with excellent connectivity',
        'Modern amenities and facilities',
      ],
      ad_copies: [
        {
          headline: 'Your Dream Home Awaits',
          primary_text: 'Experience luxury living',
          description: 'Modern comfort meets natural beauty',
        },
      ],
      ad_banners: [
        {
          banner_data: {
            creative_title: 'Exterior View',
            call_out: 'Register Now!',
            call_to_action: 'Register Your Interest',
            creative_image_url:
              'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
          },
        },
      ],
    },
  },
} as const;

export const API_ENDPOINTS = {
  PREVIEW: '/api/preview',
  GENERATE: '/api/generate',
  SAMPLE_CAMPAIGN: '/sample-campaign.json',
} as const;

export const ERROR_MESSAGES = {
  MISSING_JSON: 'Please enter campaign data JSON',
  INVALID_JSON: 'Invalid JSON format. Please check your JSON syntax.',
  PREVIEW_FAILED: 'Preview generation failed',
  GENERATION_FAILED: 'Website generation failed',
  SAMPLE_DATA_FAILED: 'Failed to load sample data',
} as const;

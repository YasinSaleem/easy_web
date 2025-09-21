import { InternalSchema, InternalSchemaType } from '../schema/internalSchema';

interface GeminiRequest {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
  generationConfig?: {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
  };
}

interface GeminiResponse {
  candidates?: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
    finishReason?: string;
  }>;
  error?: {
    message: string;
    code: number;
  };
}

export class GeminiClient {
  private apiKey: string;
  private baseUrl =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
  }

  async generateContent(
    prompt: string,
    config?: {
      temperature?: number;
      maxTokens?: number;
    }
  ): Promise<string> {
    try {
      const request: GeminiRequest = {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: config?.temperature || 0.1, // Low temperature for consistent structured output
          maxOutputTokens: config?.maxTokens || 4096,
          topK: 40,
          topP: 0.95,
        },
      };

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      const data: GeminiResponse = await response.json();

      if (data.error) {
        throw new Error(`Gemini API error: ${data.error.message}`);
      }

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No response generated from Gemini API');
      }

      const generatedText = data.candidates[0].content.parts[0]?.text;
      if (!generatedText) {
        throw new Error('Empty response from Gemini API');
      }

      return generatedText;
    } catch (error) {
      console.error('Gemini API call failed:', error);
      throw error;
    }
  }

  async transformCampaign(campaignJson: any): Promise<InternalSchemaType> {
    const prompt = `
You are an expert at transforming raw campaign JSON data into a standardized internal schema for website templates.

INSTRUCTIONS:
1. Convert the provided campaign JSON into the exact internal schema format specified below
2. Extract and normalize all relevant information from the input
3. Generate sensible defaults for missing fields
4. Ensure all URLs are valid (use placeholder URLs if needed)
5. Create compelling, professional copy based on the campaign data
6. Return ONLY valid JSON - no markdown, no explanations, no additional text

INTERNAL SCHEMA STRUCTURE:
{
  "business": {
    "name": "string (required)",
    "description": "string (optional - generate if missing)",
    "logo": "string (optional - URL)",
    "category": "string (optional)"
  },
  "contact": {
    "phone": "string (optional)",
    "email": "string (optional)",
    "address": "string (optional)",
    "mobile": "string (optional)",
    "country_code": "string (optional)"
  },
  "hero": {
    "title": "string (required - SHORT impactful headline, MAX 4-6 words, avoid lengthy sentences)",
    "subtitle": "string (optional - supporting text, can be longer than title)",
    "description": "string (optional - detailed description)",
    "backgroundImage": "string (optional - URL)",
    "ctaButtons": [
      {
        "text": "string",
        "href": "string",
        "variant": "primary" | "secondary"
      }
    ],
    "trustIndicators": ["string array (optional)"]
  },
  "valueProps": {
    "title": "string (optional)",
    "subtitle": "string (optional)",
    "usps": [
      {
        "title": "string",
        "description": "string",
        "icon": "string (optional)"
      }
    ],
    "stats": [
      {
        "number": "string",
        "label": "string"
      }
    ]
  },
  "cta": {
    "title": "string",
    "subtitle": "string (optional)",
    "ctaText": "string",
    "ctaLink": "string (MUST be anchor link like #register-interest, NOT external URL)",
    "backgroundImage": "string (optional)",
    "trustBadges": ["string array (optional)"]
  },
  "gallery": {
    "title": "string (optional)",
    "subtitle": "string (optional)",
    "images": [
      {
        "src": "string (URL)",
        "alt": "string",
        "category": "string (optional)",
        "title": "string (optional)",
        "callOut": "string (optional)",
        "callToAction": "string (optional)"
      }
    ],
    "categories": ["string array (optional)"]
  },
  "location": {
    "title": "string (optional)",
    "subtitle": "string (optional)",
    "address": "string (optional)",
    "transportation": ["string array (optional)"],
    "nearbyAmenities": ["string array (optional)"],
    "mapImage": "string (optional - URL)"
  },
  "projectDetail": {
    "title": "string (optional)",
    "subtitle": "string (optional)",
    "overview": {
      "title": "string",
      "description": "string",
      "features": ["string array"]
    },
    "specifications": [
      {
        "category": "string",
        "items": [
          {
            "label": "string",
            "value": "string"
          }
        ]
      }
    ],
    "amenities": [
      {
        "category": "string",
        "items": ["string array"]
      }
    ]
  },
  "floorPlans": {
    "title": "string (optional)",
    "subtitle": "string (optional)",
    "plans": [
      {
        "name": "string",
        "type": "string",
        "size": "string",
        "bedrooms": "number (optional)",
        "bathrooms": "number (optional)",
        "price": "string (optional)",
        "image": "string (optional - URL)",
        "features": ["string array (optional)"]
      }
    ]
  },
  "registerInterest": {
    "title": "string (optional)",
    "subtitle": "string (optional)",
    "businessName": "string (optional)",
    "contactInfo": {
      "email": "string (optional)",
      "phone": "string (optional)"
    }
  },
  "legal": {
    "privacyPolicy": "string (optional - URL)",
    "termsOfService": "string (optional - URL)",
    "disclaimers": ["string array (optional)"]
  },
  "footer": {
    "description": "string (optional)",
    "socialLinks": [
      {
        "platform": "string",
        "url": "string"
      }
    ],
    "navigationLinks": [
      {
        "label": "string",
        "href": "string"
      }
    ],
    "legalLinks": [
      {
        "label": "string",
        "href": "string"
      }
    ]
  },
  "navigation": [
    {
      "label": "string",
      "href": "string",
      "external": "boolean (optional)"
    }
  ],
  "metadata": {
    "campaignId": "string (optional)",
    "campaignName": "string (optional)",
    "platform": "string (optional)",
    "template": "string (optional)",
    "theme": "string (optional)"
  }
}

MAPPING GUIDELINES:
- business_details.business_name → business.name
- business_details.mobile → contact.mobile
- ai_assisted_product_usps → valueProps.usps (convert strings to objects with title/description)
- ad_copies[0] → hero.title/subtitle/description
- ad_banners → gallery.images (map banner_data to image objects)
- Generate navigation menu with ALL these sections: ["Home", "About", "Project Details", "Gallery", "Floor Plans", "Location", "Register Interest"]
- ALL navigation hrefs must use anchor links (e.g., "#home", "#about", "#project-detail", "#gallery", "#floor-plans", "#location", "#register-interest")
- Create compelling CTA sections from ad copy data
- For real estate: extract floor plans, location info, project details from context
- Generate reasonable defaults for missing required fields
- NEVER use external website URLs in navigation - only anchor links
- DO NOT generate fake contact information (email, phone, address) - use empty strings if not provided in input
- Only use actual contact details from the input JSON - never make up phone numbers, emails, or addresses
- DO NOT generate fake legal links (privacy policy, terms of service) - use empty strings if not provided in input
- Only use actual legal document URLs from the input JSON - never create placeholder legal links
- HERO TITLE MUST BE SHORT: Maximum 4-6 words, punchy and memorable (e.g., "Your Dream Home", "Luxury Redefined", "Modern Living Awaits")
- Use hero subtitle and description for longer explanatory text, keep title concise and impactful

INPUT CAMPAIGN JSON:
${JSON.stringify(campaignJson, null, 2)}

Return the transformed JSON following the exact schema structure above:
`;

    try {
      const result = await this.generateContent(prompt, {
        temperature: 0.1,
        maxTokens: 4000,
      });

      // Clean the response - remove any markdown formatting
      let cleanedText = result.trim();
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      // Parse the JSON response
      const parsedData = JSON.parse(cleanedText);

      // Validate against our internal schema
      const validatedData = InternalSchema.parse(parsedData);

      return validatedData;
    } catch (error) {
      console.error('Error transforming campaign with Gemini:', error);

      // Fallback: create a basic schema from the input data
      const fallbackData = this.createFallbackSchema(campaignJson);
      return InternalSchema.parse(fallbackData);
    }
  }

  /**
   * Creates a fallback internal schema when Gemini transformation fails
   */
  private createFallbackSchema(campaignJson: any): Partial<InternalSchemaType> {
    const campaign = campaignJson?.campaign || campaignJson;
    const details = campaign?.details || {};
    const business = details?.business_details || {};

    return {
      business: {
        name: business.business_name || 'Business Name',
        description: business.product_or_service_description || 'Business description',
        category: business.business_category || 'General',
      },
      contact: {
        mobile: business.mobile || '',
        phone: business.mobile || '',
        email: '', // Don't generate fake email
      },
      hero: {
        title: details.ad_copies?.[0]?.headline || campaign.name || 'Welcome to Our Business',
        subtitle: details.ad_copies?.[0]?.primary_text || 'Discover what makes us special',
        description:
          details.ad_copies?.[0]?.description || 'Learn more about our services and offerings',
        ctaButtons: [
          {
            text: 'Register Interest',
            href: '#register-interest',
            variant: 'primary' as const,
          },
          {
            text: 'View Gallery',
            href: '#gallery',
            variant: 'secondary' as const,
          },
        ],
      },
      valueProps: {
        title: 'Why Choose Us',
        usps:
          details.ai_assisted_product_usps?.slice(0, 6).map((usp: string, index: number) => ({
            title: `Feature ${index + 1}`,
            description: usp,
          })) || [],
      },
      cta: {
        title: 'Ready to Get Started?',
        ctaText: 'Register Interest',
        ctaLink: '#register-interest',
      },
      gallery: {
        title: 'Gallery',
        images:
          details.ad_banners?.map((banner: any) => ({
            src: banner.banner_data?.creative_image_url || '',
            alt: banner.banner_data?.creative_title || 'Gallery image',
            title: banner.banner_data?.creative_title,
            callOut: banner.banner_data?.call_out,
            callToAction: banner.banner_data?.call_to_action,
          })) || [],
      },
      navigation: [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Project Details', href: '#project-detail' },
        { label: 'Gallery', href: '#gallery' },
        { label: 'Floor Plans', href: '#floor-plans' },
        { label: 'Location', href: '#location' },
        { label: 'Register Interest', href: '#register-interest' },
      ],
      footer: {
        description: `${business.business_name || 'Our Business'} - Your trusted partner`,
        navigationLinks: [
          { label: 'Home', href: '#home' },
          { label: 'About', href: '#about' },
          { label: 'Project Details', href: '#project-detail' },
          { label: 'Gallery', href: '#gallery' },
          { label: 'Floor Plans', href: '#floor-plans' },
          { label: 'Location', href: '#location' },
          { label: 'Register Interest', href: '#register-interest' },
        ],
        legalLinks: [
          // Only add legal links if they actually exist in the input data
          // Don't generate fake privacy/terms links
        ],
      },
      registerInterest: {
        title: 'Register Your Interest',
        subtitle: 'Get in touch with us to learn more about this opportunity',
        businessName: business.business_name || 'Our Business',
        contactInfo: {
          email: '', // Don't generate fake email
          phone: business.mobile || '', // Only use real phone if provided
        },
      },
      metadata: {
        campaignId: campaign.id,
        campaignName: campaign.name,
        platform: campaign.platform || 'web',
        template: 'springleaf',
      },
    };
  }

  // Legacy method for backward compatibility
  async transformCampaignToSchema(campaignJson: any): Promise<string> {
    const result = await this.transformCampaign(campaignJson);
    return JSON.stringify(result, null, 2);
  }
}

// Singleton instance
export const geminiClient = new GeminiClient();

// Export the main function for easy importing
export async function transformCampaign(campaignJson: any): Promise<InternalSchemaType> {
  return geminiClient.transformCampaign(campaignJson);
}

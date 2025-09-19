// Zod schema for the provided JSON - Updated to handle both old and new campaign formats
import { z } from 'zod';

// Schema for the new extended campaign format
export const campaignSchema = z.object({
  campaign: z.object({
    // Basic campaign info (new format)
    id: z.string().optional(),
    name: z.string().optional(),
    platform: z.string().optional(),
    type: z.string().optional(),
    status: z.string().optional(),
    created_at: z
      .object({
        _seconds: z.number(),
        _nanoseconds: z.number(),
      })
      .optional(),
    updated_at: z
      .object({
        _seconds: z.number(),
        _nanoseconds: z.number(),
      })
      .optional(),
    uid: z.string().optional(),
    special_ad_categories: z.array(z.string()).optional(),

    // Campaign details (shared structure)
    details: z.object({
      // Configuration (new format)
      config: z
        .object({
          ad_account_id: z.string().optional(),
          fb_page_id: z.string().optional(),
          google_ad_account_id: z.string().optional(),
          advantage_campaign_budget: z.boolean().optional(),
          google_custom_conversion_action_doc_id: z.string().optional(),
          meta_sales_purchase_event_name: z.string().optional(),
          partner: z.string().nullable().optional(),
        })
        .optional(),

      // Business details (enhanced)
      business_details: z.object({
        business_name: z.string().optional().or(z.literal('')),
        business_category: z.string().optional(),
        product_or_service_description: z.string().optional(),
        product_or_service_offers_or_usp: z.string().optional().or(z.literal('')),
        website: z.string().optional().or(z.literal('')),
        mobile: z.string().optional(),
        mobile_without_country_code: z.string().optional(),
        country_code: z.string().optional(),
        business_logo: z
          .object({
            square: z
              .object({
                url: z.string().optional().or(z.literal('')),
                width: z.number().optional(),
                height: z.number().optional(),
              })
              .optional(),
          })
          .optional(),
        ideal_customers: z.string().optional(),
        consumer_type: z.string().optional(),
      }),

      // Targeting (new format)
      targeting: z
        .object({
          age_min: z.number().optional(),
          age_max: z.number().optional(),
          genders: z.array(z.number()).optional(),
          geo_locations: z
            .object({
              location_types: z.array(z.string()).optional(),
            })
            .optional(),
        })
        .optional(),

      // Lead generation form (new format)
      leadgen_form: z
        .object({
          is_optimized_for_quality: z.boolean().optional(),
          question_page_custom_headline: z.string().optional(),
          follow_up_action_url: z.string().optional(),
          privacy_policy: z
            .object({
              link_text: z.string().optional(),
              url: z.string().optional(),
            })
            .optional(),
          name: z.string().optional(),
          questions: z
            .array(
              z.object({
                type: z.string(),
                key: z.string(),
                label: z.string().optional(),
              })
            )
            .optional(),
          block_display_for_non_targeted_viewer: z.boolean().optional(),
          context_card: z
            .object({
              style: z.string().optional(),
              title: z.string().optional(),
              content: z.array(z.string()).optional(),
            })
            .optional(),
          follow_up_action_text: z.string().optional(),
        })
        .optional(),

      // Budget and scheduling (new format)
      budget_and_scheduling: z
        .object({
          start_time: z.string().optional(),
          end_time: z.string().optional(),
          currency: z.string().optional(),
          idr: z
            .object({
              lifetime_budget: z.number().optional(),
              daily_budget: z.number().optional(),
            })
            .optional(),
        })
        .optional(),

      // Existing shared fields
      ai_assisted_product_usps: z.array(z.string()).optional(),
      ad_copies: z
        .array(
          z.object({
            format_type: z.string().optional(),
            headline: z.string(),
            primary_text: z.string(),
            description: z.string().optional(),
            call_to_action_type: z.string().optional(),
          })
        )
        .optional(),
      ad_banners: z
        .array(
          z.object({
            image: z
              .object({
                hash: z.string().optional(),
                width: z.number().optional(),
                height: z.number().optional(),
                s3_url: z.string().optional(),
              })
              .optional(),
            banner_data: z.object({
              creative_title: z.string(),
              call_out: z.string(),
              call_to_action: z.string(),
              creative_image_url: z.string().url(),
              size: z.string().optional(),
              template_id: z.string().optional(),
            }),
          })
        )
        .optional(),
      ad_videos: z
        .array(
          z.object({
            video_url: z.string().url().optional(),
            tiktok: z
              .object({
                video_id: z.string().optional(),
                thumbnail: z
                  .object({
                    image_id: z.string().optional(),
                    width: z.number().optional(),
                    height: z.number().optional(),
                    image_url: z.string().url().optional(),
                  })
                  .optional(),
              })
              .optional(),
          })
        )
        .optional(),
    }),

    // TikTok specific data (new format)
    tiktok_ads_data: z
      .object({
        geo_locations: z
          .array(
            z.object({
              geo: z
                .object({
                  description: z.string().optional(),
                  geo_id: z.string().optional(),
                  geo_type: z.string().optional(),
                  parent_id: z.string().optional(),
                  region_code: z.string().optional(),
                })
                .optional(),
              isp: z.string().nullable().optional(),
              name: z.string().optional(),
              status_info: z
                .object({
                  reason: z.string().nullable().optional(),
                  status: z.string().optional(),
                })
                .optional(),
              targeting_type: z.string().optional(),
            })
          )
          .optional(),
      })
      .optional(),
  }),
});

export type Campaign = z.infer<typeof campaignSchema>;

// Template component prop types for all page sections
export interface CampaignData {
  projectName: string;
  route: 'home' | 'location' | 'register-interest' | 'projectDetail' | 'gallery' | 'floorPlans';
  header: HeaderProps;
  hero?: HeroProps;
  valueProposition?: ValuePropositionProps;
  cta?: CTAProps;
  footer: FooterProps;
  location?: LocationProps;
  registerInterest?: RegisterInterestProps;
  projectDetail?: ProjectDetailProps;
  gallery?: GalleryProps;
  floorPlans?: FloorPlansProps;
}

export interface HeaderProps {
  projectName: string;
  logo?: string;
  navigation: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
}

export interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaButtons: Array<{
    text: string;
    href: string;
    variant: 'primary' | 'secondary';
  }>;
  trustIndicators?: string[];
}

export interface ValuePropositionProps {
  title: string;
  subtitle: string;
  usps: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  stats?: Array<{
    number: string;
    label: string;
  }>;
}

export interface CTAProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
  trustBadges?: string[];
}

export interface FooterProps {
  projectName: string;
  description: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
  navigationLinks: Array<{
    label: string;
    href: string;
  }>;
  legalLinks: Array<{
    label: string;
    href: string;
  }>;
}

export interface LocationProps {
  title: string;
  subtitle: string;
  address: string;
  transportation?: string[];
  nearbyAmenities?: string[];
  mapImage?: string;
}

export interface RegisterInterestProps {
  title: string;
  subtitle: string;
  businessName: string;
  contactInfo?: {
    email?: string;
    phone?: string;
  };
}

export interface ProjectDetailProps {
  title: string;
  subtitle: string;
  overview: {
    title: string;
    description: string;
    features: string[];
  };
  specifications: Array<{
    category: string;
    items: Array<{
      label: string;
      value: string;
    }>;
  }>;
  amenities?: Array<{
    category: string;
    items: string[];
  }>;
}

export interface GalleryProps {
  title: string;
  subtitle: string;
  images: Array<{
    src: string;
    alt: string;
    category?: string;
  }>;
  categories?: string[];
}

export interface FloorPlansProps {
  title: string;
  subtitle: string;
  plans: Array<{
    name: string;
    type: string;
    size: string;
    bedrooms: number;
    bathrooms: number;
    price: string;
    image: string;
    features: string[];
  }>;
}

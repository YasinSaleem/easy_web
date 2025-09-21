import { z } from 'zod';

// Internal Schema for normalized campaign data that templates will consume
// This schema defines the canonical format that all templates expect

export const InternalBusinessSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  logo: z.string().optional(),
  category: z.string().optional(),
});

export const InternalContactSchema = z.object({
  phone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  mobile: z.string().optional(),
  country_code: z.string().optional(),
});

export const InternalHeroSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  backgroundImage: z.string().optional(),
  ctaButtons: z
    .array(
      z.object({
        text: z.string(),
        href: z.string(),
        variant: z.enum(['primary', 'secondary']).default('primary'),
      })
    )
    .optional(),
  trustIndicators: z.array(z.string()).optional(),
});

export const InternalValuePropsSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  usps: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
      })
    )
    .optional(),
  stats: z
    .array(
      z.object({
        number: z.string(),
        label: z.string(),
      })
    )
    .optional(),
});

export const InternalCtaSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  ctaText: z.string(),
  ctaLink: z.string(),
  backgroundImage: z.string().optional(),
  trustBadges: z.array(z.string()).optional(),
});

export const InternalGallerySchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  images: z.array(
    z.object({
      src: z.string(),
      alt: z.string(),
      category: z.string().optional(),
      title: z.string().optional(),
      callOut: z.string().optional(),
      callToAction: z.string().optional(),
    })
  ),
  categories: z.array(z.string()).optional(),
});

export const InternalLocationSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  address: z.string().optional(),
  transportation: z.array(z.string()).optional(),
  nearbyAmenities: z.array(z.string()).optional(),
  mapImage: z.string().optional(),
});

export const InternalProjectDetailSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  overview: z
    .object({
      title: z.string(),
      description: z.string(),
      features: z.array(z.string()),
    })
    .optional(),
  specifications: z
    .array(
      z.object({
        category: z.string(),
        items: z.array(
          z.object({
            label: z.string(),
            value: z.string(),
          })
        ),
      })
    )
    .optional(),
  amenities: z
    .array(
      z.object({
        category: z.string(),
        items: z.array(z.string()),
      })
    )
    .optional(),
});

export const InternalFloorPlansSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  plans: z.array(
    z.object({
      name: z.string(),
      type: z.string(),
      size: z.string(),
      bedrooms: z.number().optional(),
      bathrooms: z.number().optional(),
      price: z.string().optional(),
      image: z.string().optional(),
      features: z.array(z.string()).optional(),
    })
  ),
});

export const InternalRegisterInterestSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  businessName: z.string().optional(),
  contactInfo: z
    .object({
      email: z.string().optional(),
      phone: z.string().optional(),
    })
    .optional(),
});

export const InternalLegalSchema = z.object({
  privacyPolicy: z.string().optional(),
  termsOfService: z.string().optional(),
  disclaimers: z.array(z.string()).optional(),
});

export const InternalFooterSchema = z.object({
  description: z.string().optional(),
  socialLinks: z
    .array(
      z.object({
        platform: z.string(),
        url: z.string(),
      })
    )
    .optional(),
  navigationLinks: z
    .array(
      z.object({
        label: z.string(),
        href: z.string(),
      })
    )
    .optional(),
  legalLinks: z
    .array(
      z.object({
        label: z.string(),
        href: z.string(),
      })
    )
    .optional(),
});

export const InternalNavigationSchema = z.array(
  z.object({
    label: z.string(),
    href: z.string(),
    external: z.boolean().optional(),
  })
);

export const InternalMetadataSchema = z.object({
  campaignId: z.string().optional(),
  campaignName: z.string().optional(),
  platform: z.string().optional(),
  template: z.string().optional(),
  theme: z.string().optional(),
});

// Main internal schema that combines all sections
export const InternalSchema = z.object({
  business: InternalBusinessSchema,
  contact: InternalContactSchema,
  hero: InternalHeroSchema,
  valueProps: InternalValuePropsSchema.optional(),
  cta: InternalCtaSchema.optional(),
  gallery: InternalGallerySchema.optional(),
  location: InternalLocationSchema.optional(),
  projectDetail: InternalProjectDetailSchema.optional(),
  floorPlans: InternalFloorPlansSchema.optional(),
  registerInterest: InternalRegisterInterestSchema.optional(),
  legal: InternalLegalSchema.optional(),
  footer: InternalFooterSchema.optional(),
  navigation: InternalNavigationSchema.optional(),
  metadata: InternalMetadataSchema.optional(),
});

// Type exports for TypeScript
export type InternalBusiness = z.infer<typeof InternalBusinessSchema>;
export type InternalContact = z.infer<typeof InternalContactSchema>;
export type InternalHero = z.infer<typeof InternalHeroSchema>;
export type InternalValueProps = z.infer<typeof InternalValuePropsSchema>;
export type InternalCta = z.infer<typeof InternalCtaSchema>;
export type InternalGallery = z.infer<typeof InternalGallerySchema>;
export type InternalLocation = z.infer<typeof InternalLocationSchema>;
export type InternalProjectDetail = z.infer<typeof InternalProjectDetailSchema>;
export type InternalFloorPlans = z.infer<typeof InternalFloorPlansSchema>;
export type InternalRegisterInterest = z.infer<typeof InternalRegisterInterestSchema>;
export type InternalLegal = z.infer<typeof InternalLegalSchema>;
export type InternalFooter = z.infer<typeof InternalFooterSchema>;
export type InternalNavigation = z.infer<typeof InternalNavigationSchema>;
export type InternalMetadata = z.infer<typeof InternalMetadataSchema>;
export type InternalSchemaType = z.infer<typeof InternalSchema>;

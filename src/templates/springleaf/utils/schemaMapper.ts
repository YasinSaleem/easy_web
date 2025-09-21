import { InternalSchemaType } from '../../../schema/internalSchema';
import {
  HeroProps,
  ValuePropositionProps,
  CTAProps,
  GalleryProps,
  LocationProps,
  ProjectDetailProps,
  FloorPlansProps,
  HeaderProps,
  FooterProps,
  RegisterInterestProps,
} from '../../../schema/campaignSchema';

export interface TemplateData {
  projectName: string;
  route: 'home' | 'location' | 'register-interest' | 'projectDetail' | 'gallery' | 'floorPlans';
  header: HeaderProps;
  hero?: HeroProps;
  valueProposition?: ValuePropositionProps;
  cta?: CTAProps;
  gallery?: GalleryProps;
  location?: LocationProps;
  projectDetail?: ProjectDetailProps;
  floorPlans?: FloorPlansProps;
  footer: FooterProps;
  registerInterest?: RegisterInterestProps;
}

/**
 * Maps internal schema data to template props format
 */
export function mapInternalSchemaToTemplate(schema: InternalSchemaType): TemplateData {
  return {
    projectName: schema.business.name,
    route: 'home',

    // Header configuration
    header: {
      projectName: schema.business.name,
      logo: schema.business.logo,
      navigation: schema.navigation
        ?.filter((nav) => nav.label && nav.href)
        .map((nav) => ({
          label: nav.label!,
          href: nav.href!,
          external: nav.external,
        })) || [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Project Details', href: '#project-detail' },
        { label: 'Gallery', href: '#gallery' },
        { label: 'Floor Plans', href: '#floor-plans' },
        { label: 'Location', href: '#location' },
        { label: 'Register Interest', href: '#register-interest' },
      ],
    },

    // Hero section
    hero: schema.hero
      ? {
          title: schema.hero.title,
          subtitle: schema.hero.subtitle || 'Discover excellence in every detail',
          backgroundImage: schema.hero.backgroundImage || '',
          ctaButtons: schema.hero.ctaButtons?.map((btn) => ({
            text: btn.text,
            href: btn.href,
            variant: btn.variant,
          })) || [
            {
              text: 'Learn More',
              href: '#about',
              variant: 'primary' as const,
            },
          ],
          trustIndicators: schema.hero.trustIndicators,
        }
      : undefined,

    // Value proposition section
    valueProposition: schema.valueProps
      ? {
          title: schema.valueProps.title || 'Why Choose Us',
          subtitle: schema.valueProps.subtitle || 'Discover what makes us special',
          usps:
            schema.valueProps.usps?.map((usp) => ({
              title: usp.title,
              description: usp.description,
              icon: usp.icon || 'check-circle',
            })) || [],
          stats: schema.valueProps.stats?.map((stat) => ({
            number: stat.number,
            label: stat.label,
          })),
        }
      : undefined,

    // Call-to-action section
    cta: schema.cta
      ? {
          title: schema.cta.title,
          subtitle: schema.cta.subtitle || 'Take the next step',
          ctaText: schema.cta.ctaText,
          ctaLink: schema.cta.ctaLink,
          backgroundImage: schema.cta.backgroundImage,
          trustBadges: schema.cta.trustBadges,
        }
      : undefined,

    // Gallery section
    gallery: schema.gallery
      ? {
          title: schema.gallery.title || 'Gallery',
          subtitle: schema.gallery.subtitle || 'Explore our collection',
          images: schema.gallery.images.map((img) => ({
            src: img.src,
            alt: img.alt,
            category: img.category,
          })),
          categories: schema.gallery.categories,
        }
      : undefined,

    // Location section
    location: schema.location
      ? {
          title: schema.location.title || 'Location',
          subtitle: schema.location.subtitle || 'Find us here',
          address: schema.location.address || '',
          transportation: schema.location.transportation,
          nearbyAmenities: schema.location.nearbyAmenities,
          mapImage: schema.location.mapImage,
        }
      : undefined,

    // Project detail section
    projectDetail: schema.projectDetail
      ? {
          title: schema.projectDetail.title || 'Project Details',
          subtitle: schema.projectDetail.subtitle || 'Learn more about this project',
          overview: {
            title: schema.projectDetail.overview?.title || schema.business.name,
            description:
              schema.projectDetail.overview?.description ||
              schema.business.description ||
              'Premium project details',
            features: schema.projectDetail.overview?.features || [],
          },
          specifications:
            schema.projectDetail.specifications?.map((spec) => ({
              category: spec.category,
              items: spec.items.map((item) => ({
                label: item.label,
                value: item.value,
              })),
            })) || [],
          amenities: schema.projectDetail.amenities?.map((amenity) => ({
            category: amenity.category,
            items: amenity.items,
          })),
        }
      : undefined,

    // Floor plans section
    floorPlans: schema.floorPlans
      ? {
          title: schema.floorPlans.title || 'Floor Plans',
          subtitle: schema.floorPlans.subtitle || 'Choose your perfect space',
          plans: schema.floorPlans.plans.map((plan) => ({
            name: plan.name,
            type: plan.type,
            size: plan.size,
            bedrooms: plan.bedrooms || 0,
            bathrooms: plan.bathrooms || 0,
            price: plan.price || '',
            image: plan.image || '',
            features: plan.features || [],
          })),
        }
      : undefined,

    // Footer configuration
    footer: {
      projectName: schema.business.name,
      description:
        schema.footer?.description ||
        schema.business.description ||
        `${schema.business.name} - Your trusted partner`,
      contact: {
        phone: schema.contact.phone || schema.contact.mobile || '',
        email: schema.contact.email || '',
        address: schema.contact.address || schema.location?.address || '',
      },
      socialLinks: schema.footer?.socialLinks
        ?.filter((link) => link.platform && link.url)
        .map((link) => ({
          platform: link.platform!,
          url: link.url!,
        })),
      navigationLinks: schema.footer?.navigationLinks
        ?.filter((link) => link.label && link.href)
        .map((link) => ({
          label: link.label!,
          href: link.href!,
        })) || [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Project Details', href: '#project-detail' },
        { label: 'Gallery', href: '#gallery' },
        { label: 'Floor Plans', href: '#floor-plans' },
        { label: 'Location', href: '#location' },
        { label: 'Register Interest', href: '#register-interest' },
      ],
      legalLinks:
        schema.footer?.legalLinks
          ?.filter((link) => link.label && link.href && link.href.trim() !== '')
          .map((link) => ({
            label: link.label!,
            href: link.href!,
          })) || [],
    },

    // Register interest form
    registerInterest: schema.registerInterest
      ? {
          title: schema.registerInterest.title || 'Register Your Interest',
          subtitle:
            schema.registerInterest.subtitle ||
            `Get in touch with us to learn more about ${schema.business.name}`,
          businessName: schema.registerInterest.businessName || schema.business.name,
          contactInfo: {
            email: schema.registerInterest.contactInfo?.email || schema.contact.email,
            phone:
              schema.registerInterest.contactInfo?.phone ||
              schema.contact.phone ||
              schema.contact.mobile,
          },
        }
      : {
          title: 'Register Your Interest',
          subtitle: `Get in touch with us to learn more about ${schema.business.name}`,
          businessName: schema.business.name,
          contactInfo: {
            email: schema.contact.email,
            phone: schema.contact.phone || schema.contact.mobile,
          },
        },
  };
}

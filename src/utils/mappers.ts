import { InternalSchemaType } from '../schema/internalSchema';

/**
 * Helper functions for mapping campaign JSON to internal schema hints
 * These can be used as fallbacks when Gemini transformation fails
 */

export function extractBusinessInfo(campaignData: any): Partial<InternalSchemaType['business']> {
  return {
    name:
      campaignData.headline ||
      campaignData.title ||
      campaignData.business_name ||
      'Untitled Business',
    category:
      campaignData.category || campaignData.industry || inferCategoryFromContent(campaignData),
    logo: campaignData.logo_url || campaignData.brand_logo || undefined,
  };
}

export function extractContactInfo(campaignData: any): Partial<InternalSchemaType['contact']> {
  return {
    country_code: campaignData.country_code || '+1',
    mobile: campaignData.phone || campaignData.mobile || campaignData.contact_number || '',
    email: campaignData.email || campaignData.contact_email || '',
    website: campaignData.website || campaignData.website_url || undefined,
  };
}

export function extractHeroSection(campaignData: any): Partial<InternalSchemaType['hero']> {
  return {
    title: campaignData.headline || campaignData.primary_text || campaignData.title || 'Welcome',
    subtitle: campaignData.description || campaignData.secondary_text || campaignData.tagline || '',
    background:
      campaignData.banner_url || campaignData.hero_image || campaignData.primary_image || undefined,
  };
}

export function extractValuePropositions(campaignData: any): string[] {
  const props: string[] = [];

  // Look for various fields that might contain value propositions
  if (campaignData.value_propositions) {
    props.push(...campaignData.value_propositions);
  }

  if (campaignData.benefits) {
    props.push(...campaignData.benefits);
  }

  if (campaignData.features) {
    props.push(...campaignData.features);
  }

  if (campaignData.selling_points) {
    props.push(...campaignData.selling_points);
  }

  // Extract from description if no explicit value props
  if (props.length === 0 && campaignData.description) {
    const sentences = campaignData.description.split(/[.!?]+/).filter(Boolean);
    props.push(...sentences.slice(0, 3).map((s: string) => s.trim()));
  }

  return props.filter(Boolean).slice(0, 5); // Limit to 5 max
}

export function extractCtaInfo(campaignData: any): Partial<InternalSchemaType['cta']> {
  return {
    text:
      campaignData.cta_text ||
      campaignData.call_to_action ||
      campaignData.action_text ||
      'Get Started',
    link: campaignData.cta_url || campaignData.action_url || campaignData.landing_url || undefined,
  };
}

export function extractGallery(campaignData: any): InternalSchemaType['gallery'] {
  const gallery: InternalSchemaType['gallery'] = {
    images: [],
    videos: [],
  };

  // Collect images
  if (campaignData.images) {
    gallery.images.push(...campaignData.images);
  }

  if (campaignData.image_urls) {
    gallery.images.push(...campaignData.image_urls);
  }

  if (campaignData.gallery_images) {
    gallery.images.push(...campaignData.gallery_images);
  }

  // Add primary/banner images to gallery
  if (campaignData.banner_url) {
    gallery.images.push(campaignData.banner_url);
  }

  if (campaignData.primary_image) {
    gallery.images.push(campaignData.primary_image);
  }

  // Collect videos
  if (campaignData.videos) {
    gallery.videos.push(...campaignData.videos);
  }

  if (campaignData.video_urls) {
    gallery.videos.push(...campaignData.video_urls);
  }

  if (campaignData.video_url && campaignData.video_url !== '') {
    gallery.videos.push(campaignData.video_url);
  }

  // Remove duplicates and filter valid URLs
  gallery.images = Array.from(new Set(gallery.images)).filter(Boolean);
  gallery.videos = Array.from(new Set(gallery.videos)).filter(Boolean);

  return gallery;
}

export function extractLocationInfo(campaignData: any): Partial<InternalSchemaType['location']> {
  return {
    address:
      campaignData.address || campaignData.location || campaignData.business_address || undefined,
    mapEmbed: campaignData.map_embed || undefined,
    coordinates: campaignData.coordinates || campaignData.location_coordinates || undefined,
  };
}

export function generateLegalSection(campaignData: any): Partial<InternalSchemaType['legal']> {
  const category = campaignData.category || campaignData.industry || '';

  let disclaimer = 'All information provided is subject to change without notice.';

  // Industry-specific disclaimers
  if (
    category.toLowerCase().includes('real estate') ||
    category.toLowerCase().includes('property')
  ) {
    disclaimer =
      'Property details, prices, and availability are subject to change. Please verify all information before making any decisions.';
  } else if (
    category.toLowerCase().includes('financial') ||
    category.toLowerCase().includes('investment')
  ) {
    disclaimer =
      'Investment involves risk. Past performance does not guarantee future results. Please consult with a financial advisor.';
  } else if (
    category.toLowerCase().includes('health') ||
    category.toLowerCase().includes('medical')
  ) {
    disclaimer =
      'This information is for educational purposes only and should not replace professional medical advice.';
  }

  return {
    disclaimer,
    privacy: campaignData.privacy_url || undefined,
    terms: campaignData.terms_url || undefined,
  };
}

// Helper function to infer business category from content
function inferCategoryFromContent(campaignData: any): string {
  const content = JSON.stringify(campaignData).toLowerCase();

  if (
    content.includes('real estate') ||
    content.includes('property') ||
    content.includes('apartment') ||
    content.includes('home')
  ) {
    return 'Real Estate';
  }

  if (
    content.includes('restaurant') ||
    content.includes('food') ||
    content.includes('dining') ||
    content.includes('cafe')
  ) {
    return 'Food & Dining';
  }

  if (
    content.includes('fitness') ||
    content.includes('gym') ||
    content.includes('health') ||
    content.includes('wellness')
  ) {
    return 'Health & Fitness';
  }

  if (
    content.includes('education') ||
    content.includes('course') ||
    content.includes('learning') ||
    content.includes('training')
  ) {
    return 'Education';
  }

  if (
    content.includes('technology') ||
    content.includes('software') ||
    content.includes('app') ||
    content.includes('digital')
  ) {
    return 'Technology';
  }

  if (
    content.includes('travel') ||
    content.includes('hotel') ||
    content.includes('vacation') ||
    content.includes('tourism')
  ) {
    return 'Travel & Tourism';
  }

  return 'Business Services'; // Default fallback
}

// Main mapper function that combines all extractors
export function mapCampaignToSchema(campaignData: any): Partial<InternalSchemaType> {
  return {
    business: extractBusinessInfo(campaignData),
    contact: extractContactInfo(campaignData),
    hero: extractHeroSection(campaignData),
    valueProps: extractValuePropositions(campaignData),
    cta: extractCtaInfo(campaignData),
    gallery: extractGallery(campaignData),
    location: extractLocationInfo(campaignData),
    legal: generateLegalSection(campaignData),
  };
}

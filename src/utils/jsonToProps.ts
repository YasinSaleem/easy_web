import { CampaignData, Campaign } from '../schema/campaignSchema';

/*        { label: 'Home', href: getNavigationHref('/') },
        { label: 'About', href: getNavigationHref('/about') },
        {
          label: 'Project Detail',
          href: getNavigationHref('/project-detail'),
        },
        { label: 'Gallery', href: getNavigationHref('/gallery') },
        { label: 'Floor Plans', href: getNavigationHref('/floor-plans') },
        { label: 'Location', href: getNavigationHref('/location') },
        {
          label: 'Register Interest',
          href: getNavigationHref('/register-interest'),
        },unction to generate the correct href based on generation mode
 */
function getNavigationHref(route: string): string {
  // Always use anchor links for single-page navigation since we now have a single-page app
  const routeToAnchorMap: { [key: string]: string } = {
    '/': '#home',
    '/home': '#home',
    '/about': '#about',
    '/location': '#location',
    '/register-interest': '#register-interest',
    '/project-detail': '#project-detail',
    '/gallery': '#gallery',
    '/floor-plans': '#floor-plans',
    '/cta': '#cta',
  };

  return routeToAnchorMap[route] || '#home';
}

/**
 * Converts old Campaign schema data to new CampaignData format for React components
 * @param campaign - The campaign data to convert
 * @param route - The current route being rendered
 * @param isStaticGeneration - Whether this is for static HTML generation (true) or preview (false)
 */
export function jsonToProps(campaign: Campaign, route: string): CampaignData {
  // Determine the route type
  let componentRoute: CampaignData['route'];
  switch (route) {
    case '/':
    case '/home':
      componentRoute = 'home';
      break;
    case '/location':
      componentRoute = 'location';
      break;
    case '/register-interest':
      componentRoute = 'register-interest';
      break;
    case '/project-detail':
      componentRoute = 'projectDetail';
      break;
    case '/gallery':
      componentRoute = 'gallery';
      break;
    case '/floor-plans':
      componentRoute = 'floorPlans';
      break;
    default:
      componentRoute = 'home';
  }

  const businessDetails = campaign.campaign?.details?.business_details;
  const projectName =
    businessDetails?.business_name || businessDetails?.business_category || 'Premium Business';

  const campaignData: CampaignData = {
    projectName,
    route: componentRoute,
    header: {
      projectName,
      logo: businessDetails?.business_logo?.square?.url || '',
      navigation: [
        { label: 'Home', href: getNavigationHref('/') },
        { label: 'About', href: getNavigationHref('/about') },
        {
          label: 'Project Details',
          href: getNavigationHref('/project-detail'),
        },
        { label: 'Gallery', href: getNavigationHref('/gallery') },
        { label: 'Floor Plans', href: getNavigationHref('/floor-plans') },
        { label: 'Location', href: getNavigationHref('/location') },
        {
          label: 'Register Interest',
          href: getNavigationHref('/register-interest'),
        },
      ],
    },
    footer: {
      projectName,
      description:
        businessDetails?.product_or_service_description ||
        'Experience modern luxury living in the heart of nature.',
      contact: {
        phone: businessDetails?.mobile || '+65 1234 5678',
        email:
          'info@' + (projectName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'business') + '.com',
        address: '123 Business Avenue, Singapore 123456',
      },
      navigationLinks: [
        { label: 'Home', href: getNavigationHref('/') },
        { label: 'Location', href: getNavigationHref('/location') },
        {
          label: 'Project Details',
          href: getNavigationHref('/project-detail'),
        },
        { label: 'Gallery', href: getNavigationHref('/gallery') },
        { label: 'Floor Plans', href: getNavigationHref('/floor-plans') },
      ],
      legalLinks: [
        {
          label: 'Privacy Policy',
          href: getNavigationHref('/register-interest'),
        },
        {
          label: 'Terms of Service',
          href: getNavigationHref('/register-interest'),
        },
        {
          label: 'Cookie Policy',
          href: getNavigationHref('/register-interest'),
        },
      ],
    },
  };

  // For single-page layout, always add all sections
  const adCopies = campaign.campaign?.details?.ad_copies || [];
  const banners = campaign.campaign?.details?.ad_banners || [];
  const primaryAdCopy = adCopies[0];
  const primaryBanner = banners[0];

  // Hero Section
  campaignData.hero = {
    title: primaryAdCopy?.headline || 'Discover Your Dream Home',
    subtitle: primaryAdCopy?.primary_text || 'Experience luxury living in harmony with nature',
    backgroundImage: primaryBanner?.banner_data?.creative_image_url || '/images/hero-bg.jpg',
    ctaButtons: [
      {
        text: 'Register Interest',
        href: getNavigationHref('/register-interest'),
        variant: 'primary',
      },
      {
        text: 'View Gallery',
        href: getNavigationHref('/gallery'),
        variant: 'secondary',
      },
    ],
    trustIndicators: ['Award-Winning Developer', 'Green Building Certified', 'Prime Location'],
  };

  const usps = campaign.campaign?.details?.ai_assisted_product_usps || [];
  const businessDescription = businessDetails?.product_or_service_description || '';

  // Value Proposition Section
  campaignData.valueProposition = {
    title: 'Why Choose ' + projectName + '?',
    subtitle:
      businessDescription ||
      'Discover the unique advantages that make this business truly exceptional',
    usps: usps.slice(0, 3).map((usp, index) => ({
      title: ['Key Benefit', 'Premium Quality', 'Expert Service'][index] || 'Premium Feature',
      description: usp,
      icon: ['feature', 'quality', 'service'][index] || 'feature',
    })),
    stats: [
      { number: '100+', label: 'Satisfied Clients' },
      { number: '5⭐', label: 'Rating' },
      { number: '24/7', label: 'Support' },
      { number: '99%', label: 'Success Rate' },
    ],
  };

  // Project Detail Section
  campaignData.projectDetail = {
    title: 'Project Overview',
    subtitle: 'Discover the exceptional features and amenities of ' + projectName,
    overview: {
      title: 'Modern Luxury Living',
      description:
        projectName +
        ' represents the pinnacle of modern residential design, combining luxury with sustainability.',
      features: [
        'Award-winning architectural design',
        'Premium fittings and finishes',
        'Smart home technology integration',
        'Comprehensive security systems',
      ],
    },
    specifications: [
      {
        category: 'Building Details',
        items: [
          { label: 'Total Units', value: '200' },
          { label: 'Building Height', value: '25 Floors' },
          { label: 'Completion Date', value: '2025 Q4' },
          { label: 'Developer', value: 'Premium Developers' },
        ],
      },
    ],
    amenities: [
      {
        category: 'Recreation',
        items: ['Swimming Pool', 'Gymnasium', 'Tennis Court', "Children's Playground"],
      },
    ],
  };

  // Gallery Section
  campaignData.gallery = {
    title: 'Project Gallery',
    subtitle: 'Explore the beauty and elegance of ' + projectName,
    categories: ['Exterior', 'Interior', 'Amenities', 'Location'],
    images: [
      { src: '/images/gallery/exterior-1.jpg', alt: 'Building Facade', category: 'Exterior' },
      { src: '/images/gallery/interior-1.jpg', alt: 'Living Room', category: 'Interior' },
      { src: '/images/gallery/amenities-1.jpg', alt: 'Swimming Pool', category: 'Amenities' },
      { src: '/images/gallery/location-1.jpg', alt: 'Nearby Mall', category: 'Location' },
    ],
  };

  // Floor Plans Section
  campaignData.floorPlans = {
    title: 'Floor Plans',
    subtitle: 'Choose from our thoughtfully designed apartment layouts',
    plans: [
      {
        name: 'One Bedroom Suite',
        type: '1 Bedroom',
        size: '700 sqft',
        bedrooms: 1,
        bathrooms: 1,
        price: 'From $1.2M',
        image: '/images/floorplans/1br.jpg',
        features: ['Spacious Bedroom', 'Living Area', 'Modern Kitchen', 'Balcony'],
      },
      {
        name: 'Two Bedroom Premium',
        type: '2 Bedrooms',
        size: '1000 sqft',
        bedrooms: 2,
        bathrooms: 2,
        price: 'From $1.8M',
        image: '/images/floorplans/2br.jpg',
        features: ['Master Suite', 'Second Bedroom', 'Open Living', 'Large Balcony'],
      },
    ],
  };

  // Location Section
  campaignData.location = {
    title: 'Prime Location',
    subtitle: 'Perfectly positioned for modern urban living',
    address: '123 Springleaf Road, Singapore 786543',
    transportation: [
      'MRT Station - 5 min walk',
      'Bus Interchange - 3 min walk',
      'Major Expressways - 2 min drive',
    ],
    nearbyAmenities: [
      'Shopping Mall',
      'International Schools',
      'Medical Centers',
      'Parks & Recreation',
      'Fine Dining',
      'Entertainment Hub',
    ],
  };

  // Call to Action Section
  campaignData.cta = {
    title: 'Register Your Interest Today',
    subtitle: 'Be among the first to secure your dream home at ' + projectName,
    ctaText: primaryBanner?.banner_data?.call_to_action || 'Register Now',
    ctaLink: getNavigationHref('/register-interest'),
    backgroundImage: '/images/cta-bg.jpg',
    trustBadges: ['No Obligation', 'Priority Access', 'Exclusive Previews'],
  };

  // Register Interest Section
  campaignData.registerInterest = {
    title: 'Register Your Interest',
    subtitle:
      "Leave your details and we'll get back to you with personalized information about this exclusive property opportunity.",
    businessName: projectName,
    contactInfo: {
      email: 'info@' + (projectName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'business') + '.com',
      phone: businessDetails?.mobile || '+65 1234 5678',
    },
  };

  return campaignData;
}

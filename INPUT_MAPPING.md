# Campaign Data Input Mapping

This document details how input JSON fields are dynamically mapped to generate the single-page website template. The system transforms campaign data into a comprehensive real estate/business website with multiple sections.

## 📋 Table of Contents

- [Input Structure Overview](#input-structure-overview)
- [Core Business Information](#core-business-information)
- [Content & Marketing Data](#content--marketing-data)
- [Section-by-Section Mapping](#section-by-section-mapping)
- [Template Sections Generated](#template-sections-generated)
- [Example Usage](#example-usage)

## 🏗️ Input Structure Overview

The system accepts JSON input with the following top-level structure:

```json
{
  "campaign": {
    "id": "string",
    "name": "string", 
    "platform": "string",
    "details": {
      "business_details": { /* Business info */ },
      "ad_copies": [ /* Marketing copy */ ],
      "ad_banners": [ /* Images & CTAs */ ],
      "ai_assisted_product_usps": [ /* Key benefits */ ]
    }
  }
}
```

## 🏢 Core Business Information

### Business Details (`campaign.details.business_details`)

| Input Field | Template Usage | Example |
|-------------|----------------|---------|
| `business_name` | Project name throughout site, header logo text, footer | `"Springleaf Residences"` |
| `business_category` | Fallback for project name if business_name empty | `"Real Estate"` |
| `product_or_service_description` | Footer description, value proposition subtitle | `"Luxury apartment complex..."` |
| `website` | Social links, external references | `"https://example.com"` |
| `mobile` | Footer contact info, register interest form | `"+65 1234 5678"` |
| `business_logo.square.url` | Header logo image | `"https://via.placeholder.com/200x200"` |
| `ideal_customers` | Targeting context (not directly displayed) | `"Young professionals..."` |

### Derived Fields

- **Email**: Auto-generated from business name: `info@[businessname].com`
- **Address**: Default placeholder: `"123 Business Avenue, Singapore 123456"`

## 📢 Content & Marketing Data

### Ad Copies (`campaign.details.ad_copies[]`)

Uses **first ad copy** as primary content:

| Input Field | Template Usage | Section |
|-------------|----------------|---------|
| `ad_copies[0].headline` | Hero main title | Hero Section |
| `ad_copies[0].primary_text` | Hero subtitle | Hero Section |
| `ad_copies[0].description` | Additional hero content | Hero Section |

### Ad Banners (`campaign.details.ad_banners[]`)

Uses **first banner** as primary visual:

| Input Field | Template Usage | Section |
|-------------|----------------|---------|
| `ad_banners[0].banner_data.creative_image_url` | Hero background image | Hero Section |
| `ad_banners[0].banner_data.call_to_action` | CTA button text | CTA Section |
| `ad_banners[0].banner_data.creative_title` | Additional content context | Various |

### Product USPs (`campaign.details.ai_assisted_product_usps[]`)

| Input Field | Template Usage | Section |
|-------------|----------------|---------|
| `ai_assisted_product_usps[0]` | First USP in value proposition | Value Proposition |
| `ai_assisted_product_usps[1]` | Second USP in value proposition | Value Proposition |
| `ai_assisted_product_usps[2]` | Third USP in value proposition | Value Proposition |

## 🎯 Section-by-Section Mapping

### 1. Header Navigation
- **Business Name** → Navigation brand/logo text
- **Logo URL** → Header logo image
- **Fixed Navigation**: Home, About, Project Details, Gallery, Floor Plans, Location, Register Interest

### 2. Hero Section
```
📍 Data Sources:
- Title: ad_copies[0].headline
- Subtitle: ad_copies[0].primary_text  
- Background: ad_banners[0].banner_data.creative_image_url
- CTA Buttons: Fixed ("Register Interest", "View Gallery")
- Trust Indicators: Fixed defaults
```

### 3. Value Proposition (About)
```
📍 Data Sources:
- Title: "Why Choose [business_name]?"
- Subtitle: business_details.product_or_service_description
- USPs: First 3 items from ai_assisted_product_usps[]
- Stats: Fixed defaults (100+ Clients, 5⭐ Rating, etc.)
```

### 4. Project Details
```
📍 Data Sources:
- Title: Fixed "Project Overview"
- Description: Generated from business_name
- Features: Fixed premium features list
- Specifications: Fixed building details
- Amenities: Fixed amenities list
```

### 5. Gallery
```
📍 Data Sources:
- Title: Fixed "Project Gallery"
- Subtitle: Generated with business_name
- Images: Fixed placeholder gallery images
- Categories: Fixed (Exterior, Interior, Amenities, Location)
```

### 6. Floor Plans
```
📍 Data Sources:
- Title: Fixed "Floor Plans"
- Plans: Fixed apartment layouts (1BR, 2BR)
- All details: Fixed (sizes, prices, features)
```

### 7. Location
```
📍 Data Sources:
- Title: Fixed "Prime Location"
- Address: Fixed placeholder address
- Transportation: Fixed transport options
- Amenities: Fixed nearby amenities list
```

### 8. Call-to-Action (CTA)
```
📍 Data Sources:
- Title: Fixed "Register Your Interest Today"
- Subtitle: Generated with business_name
- CTA Text: ad_banners[0].banner_data.call_to_action
- Trust Badges: Fixed ("No Obligation", "Priority Access", etc.)
```

### 9. Register Interest Form
```
📍 Data Sources:
- Title: Fixed "Register Your Interest"
- Business Name: business_details.business_name
- Contact Email: Generated from business_name
- Contact Phone: business_details.mobile
```

### 10. Footer
```
📍 Data Sources:
- Project Name: business_details.business_name
- Description: business_details.product_or_service_description
- Phone: business_details.mobile
- Email: Generated from business_name
- Address: Fixed placeholder
- Navigation: Fixed site navigation links
```

## 🎨 Template Sections Generated

The system generates a **single-page application** with these sections:

1. **Fixed Header** - Navigation with hamburger menu (mobile)
2. **Hero Section** - Main banner with CTA buttons
3. **Value Proposition** - About section with USPs
4. **Project Details** - Specifications and amenities
5. **Gallery** - Image showcase with categories  
6. **Floor Plans** - Apartment layouts and pricing
7. **Location** - Address and nearby amenities
8. **Call-to-Action** - Register interest CTA
9. **Register Interest** - Lead capture form
10. **Footer** - Contact info and navigation

## 🔄 Data Flow Process

1. **Input Validation** - JSON validated against Zod schema
2. **Data Extraction** - Key fields extracted from campaign object
3. **Props Generation** - Input data transformed to React component props
4. **Template Rendering** - Props used to generate HTML sections
5. **Navigation Setup** - Anchor links configured for single-page navigation
6. **Output Generation** - Single HTML file with embedded JavaScript

## 📝 Example Usage

### Minimal Required Input
```json
{
  "campaign": {
    "details": {
      "business_details": {
        "business_name": "My Business",
        "mobile": "+1234567890"
      },
      "ad_copies": [{
        "headline": "Welcome to My Business", 
        "primary_text": "We provide excellent services"
      }],
      "ad_banners": [{
        "banner_data": {
          "call_to_action": "Contact Us",
          "creative_image_url": "https://example.com/image.jpg"
        }
      }]
    }
  }
}
```

### Full Example with All Fields
```json
{
  "campaign": {
    "name": "Premium Property Campaign",
    "details": {
      "business_details": {
        "business_name": "Luxury Residences",
        "business_category": "Real Estate", 
        "product_or_service_description": "Premium apartments with modern amenities",
        "mobile": "+65 9123 4567",
        "website": "https://luxury-residences.com",
        "business_logo": {
          "square": {
            "url": "https://example.com/logo.png"
          }
        }
      },
      "ai_assisted_product_usps": [
        "Prime city location",
        "Modern amenities", 
        "24/7 security"
      ],
      "ad_copies": [{
        "headline": "Your Dream Home Awaits",
        "primary_text": "Experience luxury living in the heart of the city",
        "description": "Modern comfort meets urban convenience"
      }],
      "ad_banners": [{
        "banner_data": {
          "call_to_action": "Schedule Viewing",
          "creative_image_url": "https://example.com/hero.jpg"
        }
      }]
    }
  }
}
```

## 🚀 Key Features

- **Dynamic Content**: Business name, contact info, and marketing copy personalized
- **Responsive Design**: Mobile-first with hamburger navigation
- **Anchor Navigation**: Smooth scrolling between sections
- **SEO Optimized**: Proper meta tags and structured HTML
- **Lead Generation**: Built-in contact forms and CTAs
- **Professional Templates**: Real estate/business focused design

## 🎯 Output

- **Single-page application** with anchor navigation
- **Static HTML** generation for downloads
- **Embedded JavaScript** for interactivity
- **Responsive design** works on all devices
- **Complete website** ready for deployment

---

*This mapping enables transformation of simple campaign data into professional, conversion-optimized business websites.*
# Campaign Data Input Mapping & Internal Schema System

This document details how input JSON campaign data is transformed into an internal schema and then mapped to generate professional single-page business websites. The system now includes AI-powered transformation, editable schema workflow, and data consistency validation.

## 📋 Table of Contents

- [System Architecture Overview](#system-architecture-overview)
- [Input Campaign Structure](#input-campaign-structure)
- [Internal Schema Format](#internal-schema-format)
- [AI Transformation Process](#ai-transformation-process)
- [Editable Schema Workflow](#editable-schema-workflow)
- [Data Consistency Validation](#data-consistency-validation)
- [Template Mapping](#template-mapping)
- [Missing Fields Detection](#missing-fields-detection)
- [Example Workflows](#example-workflows)

## 🏗️ System Architecture Overview

The system now uses a **dual-phase transformation approach**:

```
Raw Campaign JSON → AI Transformation → Internal Schema → Template Generation → Website
                   ↑                  ↓
              Gemini API         Editable by User
```

### Key Components:
1. **Campaign Input Schema** - Accepts various campaign JSON formats
2. **AI Transformer (Gemini)** - Intelligently converts to standardized internal schema  
3. **Internal Schema** - Normalized, consistent data structure for templates
4. **Schema Editor** - Allows manual editing of transformed schema
5. **Consistency Validator** - Detects missing fields and data inconsistencies
6. **Template Generator** - Converts internal schema to website components

## 📥 Input Campaign Structure

The system accepts campaign JSON in various formats. Here are the key supported structures:

### Standard Campaign Format
```json
{
  "campaign": {
    "id": "string (optional)",
    "name": "string (optional)",
    "platform": "string (optional)",
    "details": {
      "business_details": {
        "business_name": "string",
        "business_category": "string (optional)",
        "product_or_service_description": "string (optional)",
        "website": "string (optional)",
        "mobile": "string (optional)",
        "business_logo": {
          "square": { "url": "string (optional)" }
        }
      },
      "ad_copies": [
        {
          "headline": "string",
          "primary_text": "string",
          "description": "string (optional)",
          "call_to_action_type": "string (optional)"
        }
      ],
      "ad_banners": [
        {
          "banner_data": {
            "creative_title": "string",
            "call_out": "string",
            "call_to_action": "string",
            "creative_image_url": "string (URL)"
          }
        }
      ],
      "ai_assisted_product_usps": ["string", "string", "..."]
    }
  }
}
```

### Extended Campaign Format
The system also supports extended formats with additional fields like:
- `targeting` information
- `leadgen_form` configuration  
- `budget_and_scheduling` details
- `legal_documents` with privacy/terms URLs
- `tiktok_ads_data` and platform-specific data

## 🔄 Internal Schema Format

After AI transformation, campaign data is converted to this standardized internal schema:

```json
{
  "business": {
    "name": "string (required)",
    "description": "string (optional)",
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
    "title": "string (required - max 4-6 words)",
    "subtitle": "string (optional)",
    "description": "string (optional)", 
    "backgroundImage": "string (optional - URL)",
    "ctaButtons": [
      {
        "text": "string",
        "href": "string (anchor link)",
        "variant": "primary|secondary"
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
  "gallery": {
    "title": "string (optional)",
    "subtitle": "string (optional)",
    "images": [
      {
        "src": "string (URL)",
        "alt": "string",
        "category": "string (optional)"
      }
    ],
    "categories": ["string array (optional)"]
  },
  "location": {
    "title": "string (optional)",
    "subtitle": "string (optional)",
    "address": "string (optional)",
    "transportation": ["string array (optional)"],
    "nearbyAmenities": ["string array (optional)"]
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
      "href": "string (anchor link)",
      "external": "boolean (optional)"
    }
  ]
}
```

## 🤖 AI Transformation Process

The system uses **Gemini 2.0 Flash** to intelligently transform raw campaign data into the internal schema:

### Transformation Guidelines:
- **Smart Field Mapping**: Automatically maps `business_details.business_name` → `business.name`
- **Content Generation**: Creates compelling copy from raw campaign data
- **Hero Title Optimization**: Generates short, impactful headlines (max 4-6 words)
- **No Fake Data**: Never generates fake contact info, emails, or legal links
- **Real Data Only**: Only uses actual contact details provided in input
- **Anchor Links**: All navigation uses anchor links (#home, #about, etc.)
- **Reasonable Defaults**: Provides sensible defaults for missing optional fields

### AI Prompt Features:
- **Structured Output**: Always returns valid JSON matching internal schema
- **Business Intelligence**: Infers business category and generates appropriate content
- **Marketing Optimization**: Creates conversion-focused copy and CTAs
- **Data Validation**: Ensures all generated data follows schema requirements

## ✏️ Editable Schema Workflow

The system now supports a **two-phase workflow**:

### Phase 1: Raw JSON Input
- User provides campaign JSON in any supported format
- Initial transformation happens automatically on first "Preview"

### Phase 2: Editable Internal Schema  
- User can switch to "Internal Schema" tab
- Edit the transformed JSON directly
- Manual adjustments reflected immediately in previews
- Full control over final website content

### Benefits:
- **AI + Human Intelligence**: Combines AI speed with human precision
- **Iterative Refinement**: Test, edit, preview cycle
- **Complete Control**: Override any AI decisions
- **Professional Results**: Fine-tune content for specific needs

## 🔍 Data Consistency Validation

The system includes advanced validation to ensure data consistency across schema sections:

### Missing Fields Detection
Identifies optional fields that could enhance the website:
- **Contact Information**: Email, phone, address
- **Visual Assets**: Business logo, hero background, gallery images  
- **Legal Documents**: Privacy policy, terms of service URLs

### Consistency Checking
Detects inconsistencies between related fields:
- **Email Mismatch**: `contact.email` ≠ `registerInterest.contactInfo.email`
- **Phone Mismatch**: `contact.phone` ≠ `registerInterest.contactInfo.phone` 
- **Address Mismatch**: `contact.address` ≠ `location.address`

### Visual Indicators:
- **📝 Missing Fields**: Yellow warning style for optional additions
- **⚠️ Inconsistent Fields**: Red warning style for data conflicts
- **Smart Descriptions**: Shows exact mismatched values with suggestions

## 🎯 Template Mapping

The internal schema maps to website sections as follows:

### Header & Navigation
```
📍 Data Sources:
- Logo: business.logo
- Brand Name: business.name  
- Navigation: navigation[] array with anchor links
```

### Hero Section
```
📍 Data Sources:
- Title: hero.title (short, impactful)
- Subtitle: hero.subtitle
- Background: hero.backgroundImage
- CTA Buttons: hero.ctaButtons[]
- Trust Indicators: hero.trustIndicators[]
```

### Value Proposition
```
📍 Data Sources:
- Title: valueProps.title
- Subtitle: valueProps.subtitle
- USPs: valueProps.usps[] (with icons)
- Stats: valueProps.stats[] (numbers & labels)
```

### Contact & Forms
```
📍 Data Sources:
- Register Form: registerInterest.contactInfo{}
- Footer Contact: contact{} (phone, email, address)
- Consistency: Automatically validated between sections
```

### Legal & Compliance
```
📍 Data Sources:
- Privacy Policy: legal.privacyPolicy (only if provided)
- Terms of Service: legal.termsOfService (only if provided)
- Footer Legal: footer.legalLinks[] (conditional rendering)
```

## 📋 Missing Fields Detection

The system proactively identifies enhancement opportunities:

### Critical Business Fields:
| Field | Purpose | Impact |
|-------|---------|--------|
| `contact.email` | Customer communication | High - enables inquiries |
| `contact.phone` | Direct contact | High - enables calls |
| `contact.address` | Physical location | Medium - builds trust |
| `business.logo` | Brand recognition | Medium - professional appearance |

### Visual & Content Fields:
| Field | Purpose | Impact |
|-------|---------|--------|
| `hero.backgroundImage` | Visual impact | High - first impression |
| `gallery.images[]` | Product showcase | High - demonstrates offerings |
| `legal.privacyPolicy` | Legal compliance | Low - optional but professional |
| `legal.termsOfService` | Legal protection | Low - optional but recommended |

### Inconsistency Detection:
- **Automatic Comparison**: Checks contact fields across all schema sections
- **User-Friendly Messages**: Shows specific mismatched values
- **Actionable Guidance**: Directs users to edit Internal Schema tab

## 🎨 Example Workflows

### Workflow 1: Basic Campaign with AI Enhancement

**Input (Minimal Campaign):**
```json
{
  "campaign": {
    "details": {
      "business_details": {
        "business_name": "Green Valley Homes",
        "mobile": "+1-555-123-4567"
      },
      "ad_copies": [
        {
          "headline": "Dream Home Awaits",
          "primary_text": "Modern living in nature"
        }
      ],
      "ai_assisted_product_usps": [
        "Prime location",
        "Modern amenities", 
        "Eco-friendly design"
      ]
    }
  }
}
```

**AI Transformation Result:**
- Hero title optimized to "Dream Home Awaits" (already perfect length)
- Contact info used where provided, no fake data generated
- Value propositions converted to structured USP objects
- Navigation and legal links generated appropriately
- Missing fields notification shows: email, address, logo, hero background

### Workflow 2: Complete Campaign with Legal Documents

**Input (Full Campaign):**
```json
{
  "campaign": {
    "details": {
      "business_details": {
        "business_name": "Luxury Properties Inc",
        "business_email": "info@luxuryprops.com",
        "mobile": "+1-555-999-8888",
        "business_logo": {
          "square": { "url": "https://luxuryprops.com/logo.png" }
        }
      },
      "legal_documents": {
        "privacy_policy_url": "https://luxuryprops.com/privacy",
        "terms_of_service_url": "https://luxuryprops.com/terms"
      },
      "ad_copies": [
        {
          "headline": "Exclusive Luxury Residences Now Available",
          "primary_text": "Experience unparalleled comfort and style"
        }
      ],
      "ad_banners": [
        {
          "banner_data": {
            "creative_image_url": "https://luxuryprops.com/hero.jpg",
            "call_to_action": "Schedule Private Tour"
          }
        }
      ]
    }
  }
}
```

**Result:**
- Hero title optimized to "Exclusive Luxury Residences" (AI shortens from original)
- Legal links appear in footer (privacy, terms)
- Contact info consistent across all sections
- Professional logo displayed in header
- Hero background image used
- No missing fields or inconsistencies detected

### Workflow 3: Schema Editing & Consistency Fixing

**Scenario:** User notices phone number inconsistency after transformation

**Original Transformed Schema:**
```json
{
  "contact": {
    "phone": "+1-555-123-4567",
    "email": "info@business.com"
  },
  "registerInterest": {
    "contactInfo": {
      "phone": "+1-999-888-7777",
      "email": "info@business.com"
    }
  }
}
```

**Inconsistency Detection:**
- ⚠️ Phone Mismatch: `+1-555-123-4567` vs `+1-999-888-7777`
- User switches to Internal Schema tab
- Edits `registerInterest.contactInfo.phone` to match main contact
- Inconsistency warning disappears

### Workflow 4: Social Media Integration

**Input with Social Links:**
```json
{
  "campaign": {
    "details": {
      "social_media": {
        "facebook": "https://facebook.com/mybusiness",
        "instagram": "https://instagram.com/mybusiness"
      }
    }
  }
}
```

**AI Transformation:**
- Social links mapped to `footer.socialLinks[]`
- Platform-specific icons displayed (Facebook, Instagram)
- No duplicate social links generated

## 🚀 Key System Features

### ✅ AI-Powered Intelligence
- **Smart Content Generation**: Creates professional copy from raw data
- **Hero Title Optimization**: Generates punchy, memorable headlines
- **Business Category Inference**: Automatically categorizes businesses
- **No Fake Data Policy**: Never generates placeholder contact info

### ✅ User Control & Flexibility  
- **Editable Schema Workflow**: Full control over final content
- **Real-time Preview Updates**: See changes immediately
- **Iterative Refinement**: Edit, preview, repeat cycle
- **Professional Templates**: Conversion-optimized designs

### ✅ Data Quality Assurance
- **Missing Fields Detection**: Identifies enhancement opportunities
- **Consistency Validation**: Prevents data conflicts across sections
- **Visual Indicators**: Clear warnings for issues and improvements
- **Actionable Guidance**: Specific instructions for fixes

### ✅ Professional Output
- **Single-Page Applications**: Smooth anchor navigation
- **Responsive Design**: Mobile-first approach
- **SEO Optimized**: Proper meta tags and structure
- **Lead Generation**: Built-in contact forms and CTAs

## 🎯 Output Specifications

### Generated Website Includes:
1. **Fixed Header** - Logo, navigation, mobile hamburger menu
2. **Hero Section** - Background image, title, CTAs, trust indicators  
3. **Value Proposition** - USPs with icons, statistics
4. **Project Details** - Specifications, features, amenities
5. **Gallery** - Image showcase with category filtering
6. **Floor Plans** - Layout options with pricing
7. **Location** - Address, transportation, nearby amenities
8. **Call-to-Action** - Register interest section
9. **Contact Form** - Lead capture with validation
10. **Footer** - Contact info, navigation, social links, legal links (conditional)

### Technical Features:
- **Responsive Design** - Works on all devices
- **Smooth Scrolling** - Anchor link navigation
- **Mobile Menu** - Hamburger navigation for mobile
- **Form Handling** - Contact form functionality
- **SEO Ready** - Meta tags, structured HTML
- **Fast Loading** - Optimized assets and code

### File Output:
- **Single HTML File** - Complete website in one file
- **Embedded CSS** - Tailwind CSS included
- **JavaScript Functionality** - Interactive elements
- **Ready for Deployment** - No external dependencies

---

_This comprehensive system transforms simple campaign data into professional, conversion-optimized business websites with AI intelligence, user control, and data quality assurance._

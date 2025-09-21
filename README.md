# Easy Web POC - Campaign to Website Generator

A Next.js application that transforms campaign data into complete, responsive websites using
nature-inspired templates.

## 🚀 Features

- **Campaign Data Input**: JSON-based campaign data input with real-time validation
- **Live Preview**: Instant HTML preview of generated pages
- **Multi-page Generation**: Generate complete websites with multiple pages
- **Template System**: Modular template system with reusable components
- **ZIP Download**: Package and download complete websites as ZIP files
- **Responsive Design**: Mobile-first, nature-inspired design system
- **TypeScript**: Full type safety throughout the application
- **API Endpoints**: RESTful API for preview and generation

## 🛠 Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: CSS-in-JS with nature-inspired design system
- **Validation**: Zod for schema validation
- **File Processing**: JSZip for website packaging
- **Development**: ESLint, Prettier, and TypeScript for code quality

## 📁 Project Structure

```
easy_web/
├── src/
│   ├── pages/
│   │   ├── index.tsx          # POC UI
│   │   └── api/
│   │       ├── preview.ts     # Preview generation API
│   │       └── generate.ts    # Website generation API
│   ├── templates/
│   │   └── springleaf/        # Template system
│   │       ├── components/    # Reusable components
│   │       ├── template.ts    # Main orchestrator
│   │       └── style.css      # Template styles
│   ├── schema/
│   │   └── campaignSchema.ts  # Zod validation schemas
│   └── utils/                 # Utility functions
├── public/
│   └── sample-campaign.json   # Sample data (accessible via HTTP)
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up environment variables**:

   ```bash
   cp .env.example .env.local
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser**: Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run type-check   # TypeScript type checking
npm run clean        # Clean build artifacts
```

## 🎯 Usage

### POC Interface

1. **Load Sample Data**: Sample campaign data loads automatically
2. **Select Route**: Choose which page to preview (Homepage, Location, Gallery, etc.)
3. **Preview**: Click "Preview Page" to see generated HTML in the iframe
4. **Generate**: Click "Generate Website" to download complete website as ZIP

### API Endpoints

#### POST `/api/preview`

Generate HTML preview for a specific route.

**Request Body**:

```json
{
  "campaignData": {
    /* Campaign data object */
  },
  "route": "/" // Optional, defaults to "/"
}
```

**Response**: HTML content

#### POST `/api/generate`

Generate complete website bundle.

**Request Body**:

```json
{
  "campaignData": {
    /* Campaign data object */
  },
  "format": "json" // Optional
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "businessName": "property-name",
    "timestamp": "2025-09-19",
    "files": {
      /* All website files */
    },
    "metadata": {
      /* Generation info */
    }
  }
}
```

## 📊 Campaign Data Schema

See **[INPUT_MAPPING.md](./INPUT_MAPPING.md)** for detailed documentation on how input JSON fields are dynamically mapped to the website template.

### Quick Overview

The application expects campaign data in the following format:

```json
{
  "campaign": {
    "name": "Campaign Name",
    "details": {
      "business_details": {
        "business_name": "Property Name",
        "website": "https://example.com",
        "mobile": "+65 1234 5678"
      },
      "ai_assisted_product_usps": ["Unique selling point 1", "Unique selling point 2"],
      "ad_copies": [
        {
          "headline": "Main headline",
          "primary_text": "Primary marketing text",
          "description": "Detailed description"
        }
      ],
      "ad_banners": [
        {
          "banner_data": {
            "creative_title": "Image title",
            "call_out": "Call out text",
            "call_to_action": "CTA button text",
            "creative_image_url": "https://images.unsplash.com/..."
          }
        }
      ]
    }
  }
}
```

## 🎨 Template System

The Springleaf template includes:

- **Homepage**: Hero section, value proposition, CTA
- **Location**: Interactive map, nearby amenities
- **Gallery**: Image grid with lightbox functionality
- **Floor Plans**: Coming soon page with strong CTA
- **Project Detail**: Features, amenities, investment info
- **Register Interest**: Contact information and legal disclaimers

### Design Features

- Nature-inspired green color palette
- Responsive CSS Grid and Flexbox layouts
- Hover effects and smooth transitions
- Mobile-first responsive design
- Accessibility considerations

## 🔧 Development

### Code Quality

- **ESLint**: Configured with Next.js, TypeScript, and Prettier rules
- **Prettier**: Consistent code formatting
- **TypeScript**: Full type safety with strict configuration
- **Zod**: Runtime type validation for API inputs

### File Structure

- **Components**: Reusable template components in `/src/templates/springleaf/components/`
- **API Routes**: Clean separation between preview and generation logic
- **Utils**: Helper functions for data processing and validation
- **Schema**: Centralized validation schemas using Zod

## 📦 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Manual Deployment

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is private and confidential.

## 🆘 Support

For questions or support, contact: yasin.saleem@example.com

---

**Built with ❤️ for transforming campaign data into beautiful websites**

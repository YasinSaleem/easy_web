import { NextApiRequest, NextApiResponse } from 'next';
import { transformCampaign } from '../../services/geminiClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { campaignData } = req.body;

    if (!campaignData) {
      return res.status(400).json({ error: 'Campaign data is required' });
    }

    // Transform campaign JSON to internal schema using Gemini
    console.log('🔄 Transforming campaign data with Gemini...');
    const internalSchema = await transformCampaign(campaignData);

    console.log('✅ Successfully transformed campaign to internal schema');

    return res.status(200).json({
      success: true,
      data: internalSchema,
      metadata: {
        transformedAt: new Date().toISOString(),
        template: internalSchema.metadata?.template || 'springleaf',
        campaignName: internalSchema.metadata?.campaignName || internalSchema.business.name,
      },
    });
  } catch (error: any) {
    console.error('❌ Transform API error:', error);

    // Handle specific error types
    if (error.message?.includes('GEMINI_API_KEY')) {
      return res.status(500).json({
        error: 'Gemini API key not configured',
        details: 'Please check environment variables',
      });
    }

    if (error.message?.includes('Gemini API error')) {
      return res.status(502).json({
        error: 'External API error',
        details: error.message,
      });
    }

    if (error.name === 'ZodError') {
      return res.status(422).json({
        error: 'Schema validation failed',
        details: error.message,
        issues: error.issues || [],
      });
    }

    return res.status(500).json({
      error: 'Internal server error during transformation',
      details: error.message || 'Unknown error',
    });
  }
}

export const config = {
  api: {
    // Increase timeout for Gemini API calls
    responseLimit: '10mb',
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
};

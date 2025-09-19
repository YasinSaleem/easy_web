import React, { useState, useEffect, ChangeEvent, useCallback, useMemo } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';

// Import optimized utilities
import { AVAILABLE_ROUTES, API_ENDPOINTS, ERROR_MESSAGES } from '../constants';
import { ApiError, GenerateResponse, PreviewNavigationMessage } from '../types';
import { useCampaignData, useErrorState, useApiOperations } from '../hooks';
import { createAndDownloadZip } from '../utils/fileUtils';

const POCPage: NextPage = () => {
  // Use custom hooks for better organization
  const { jsonInput, setJsonInput, validateAndParseJson } = useCampaignData();
  const { 
    error, 
    validationErrors, 
    successMessage, 
    setSuccessMessage,
    clearMessages, 
    handleApiError 
  } = useErrorState();
  const { makeApiRequest } = useApiOperations();

  // Local state
  const [selectedRoute, setSelectedRoute] = useState('/');
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const availableRoutes = [
    { path: '/', label: 'Homepage' },
    { path: '/location', label: 'Location' },
    { path: '/project-detail', label: 'Project Details' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/floor-plans', label: 'Floor Plans' },
    { path: '/register-interest', label: 'Register Interest' },
  ];

  // Load sample data on component mount
  useEffect(() => {
    const loadSampleData = async () => {
      try {
        // Fetch from public directory
        const response = await fetch('/sample-campaign.json');
        if (response.ok) {
          const sampleData = await response.json();
          setJsonInput(JSON.stringify(sampleData, null, 2));
        } else {
          throw new Error('Failed to load sample data');
        }
      } catch (err) {
        // If sample data fails to load, provide a minimal example
        const fallbackData = {
          campaign: {
            name: "Sample Property Campaign",
            details: {
              business_details: {
                business_name: "Springleaf Residence",
                website: "https://example.com",
                mobile: "+65 1234 5678"
              },
              ai_assisted_product_usps: [
                "Prime location with excellent connectivity",
                "Modern amenities and facilities"
              ],
              ad_copies: [{
                headline: "Your Dream Home Awaits",
                primary_text: "Experience luxury living",
                description: "Modern comfort meets natural beauty"
              }],
              ad_banners: [{
                banner_data: {
                  creative_title: "Exterior View",
                  call_out: "Register Now!",
                  call_to_action: "Register Your Interest",
                  creative_image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop"
                }
              }]
            }
          }
        };
        setJsonInput(JSON.stringify(fallbackData, null, 2));
      }
    };
    
    loadSampleData();
  }, []);

  // Listen for navigation messages from preview iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Verify origin for security (optional in development)
      if (event.data?.type === 'PREVIEW_NAVIGATE') {
        const newRoute = event.data.route;
        
        console.log('Navigation message received:', newRoute);
        
        // Update selected route
        setSelectedRoute(newRoute);
        
        // Automatically trigger new preview
        if (jsonInput.trim()) {
          setTimeout(() => {
            // Inline preview generation for navigation
            const generatePreviewForRoute = async () => {
              try {
                const campaignData = JSON.parse(jsonInput);
                
                setIsPreviewLoading(true);
                
                const response = await fetch('/api/preview', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    campaignData,
                    route: newRoute
                  }),
                });

                if (response.ok) {
                  const html = await response.text();
                  setPreviewHtml(html);
                }
              } catch (err) {
                console.warn('Preview navigation failed:', err);
              } finally {
                setIsPreviewLoading(false);
              }
            };
            
            generatePreviewForRoute();
          }, 100);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [jsonInput]); // Include jsonInput as dependency since we use it in the handler

  const handlePreview = useCallback(async () => {
    clearMessages();
    
    try {
      const campaignData = validateAndParseJson(jsonInput);
      setIsPreviewLoading(true);

      const html = await makeApiRequest<string>(API_ENDPOINTS.PREVIEW, {
        campaignData,
        route: selectedRoute
      });

      setPreviewHtml(html);
    } catch (err: any) {
      if (err.statusCode) {
        handleApiError(err, ERROR_MESSAGES.PREVIEW_FAILED);
      } else {
        handleApiError({ error: 'validation', message: err.message }, ERROR_MESSAGES.PREVIEW_FAILED);
      }
    } finally {
      setIsPreviewLoading(false);
    }
  }, [jsonInput, selectedRoute, validateAndParseJson, makeApiRequest, clearMessages, handleApiError]);

  const handleGenerate = useCallback(async () => {
    clearMessages();
    
    try {
      const campaignData = validateAndParseJson(jsonInput);
      setIsGenerating(true);

      const result = await makeApiRequest<GenerateResponse>(API_ENDPOINTS.GENERATE, {
        campaignData,
        format: 'json'
      });

      // Create and download ZIP file
      await createAndDownloadZip(result.data);
      
      setSuccessMessage(`Successfully generated ${result.data.metadata.pagesGenerated} pages for "${result.data.metadata.campaignName}"`);
      
    } catch (err: any) {
      if (err.statusCode) {
        handleApiError(err, ERROR_MESSAGES.GENERATION_FAILED);
      } else {
        handleApiError({ error: 'validation', message: err.message }, ERROR_MESSAGES.GENERATION_FAILED);
      }
    } finally {
      setIsGenerating(false);
    }
  }, [jsonInput, validateAndParseJson, makeApiRequest, clearMessages, handleApiError, setSuccessMessage]);

  return (
    <>
      <Head children={
        <>
          <title>Easy Web POC - Campaign to Website Generator</title>
          <meta name="description" content="Transform campaign data into complete websites" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </>
      } />

      <div className="poc-page">
        {/* Header */}
        <header className="poc-header">
          <div className="poc-header-container">
            <div className="poc-brand">
              <h1>Easy Web POC</h1>
              <p>Transform campaign data into complete websites</p>
            </div>
            <div className="poc-template-info">
              Springleaf Template • Nature-inspired Design
            </div>
          </div>
        </header>

        <main className="poc-main">
          <div className="poc-grid">
            
            {/* Left Column - Input */}
            <div className="poc-column">
              <div className="poc-card">
                <h2 className="poc-card-title">Campaign Data (JSON)</h2>
                
                <textarea
                  className="poc-textarea"
                  placeholder="Paste your campaign JSON data here..."
                  value={jsonInput}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setJsonInput(e.target.value)}
                  aria-label="Campaign JSON data input"
                />
                
                {/* Route Selection */}
                <div className="poc-form-group">
                  <label className="poc-label" htmlFor="route-select">
                    Preview Route
                  </label>
                  <select
                    id="route-select"
                    className="poc-select"
                    value={selectedRoute}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedRoute(e.target.value)}
                    aria-label="Select page route to preview"
                  >
                    {availableRoutes.map((route) => (
                      <option key={route.path} value={route.path}>
                        {route.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="poc-button-group">
                  <button
                    onClick={handlePreview}
                    disabled={isPreviewLoading}
                    className={`poc-btn poc-btn-primary ${isPreviewLoading ? 'poc-btn-loading' : ''}`}
                    aria-label={isPreviewLoading ? 'Generating preview...' : 'Generate page preview'}
                  >
                    {isPreviewLoading ? 'Generating...' : 'Preview Page'}
                  </button>
                  
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className={`poc-btn poc-btn-success ${isGenerating ? 'poc-btn-loading' : ''}`}
                    aria-label={isGenerating ? 'Generating website...' : 'Generate complete website'}
                  >
                    {isGenerating ? 'Generating...' : 'Generate Website'}
                  </button>
                </div>

                {/* Messages */}
                {error && (
                  <div className="poc-message poc-message-error" role="alert">
                    <p className="poc-message-title">Error:</p>
                    <p className="poc-message-content">{error}</p>
                  </div>
                )}

                {validationErrors && validationErrors.length > 0 && (
                  <div className="poc-message poc-message-error" role="alert">
                    <p className="poc-message-title">Validation Errors:</p>
                    <div className="poc-validation-errors">
                      <ul className="poc-validation-list">
                        {validationErrors.map((err, idx) => (
                          <li key={idx} className="poc-validation-item">
                            <span className="poc-validation-path">{err.path}:</span> {err.message}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {successMessage && (
                  <div className="poc-message poc-message-success" role="alert">
                    <p className="poc-message-content">{successMessage}</p>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="poc-info-card poc-instructions">
                <h3 className="poc-info-title">How to Use:</h3>
                <ol className="poc-info-list">
                  <li>The sample campaign data is already loaded</li>
                  <li>Select a route and click "Preview Page" to see the generated HTML</li>
                  <li>Click "Generate Website" to download the complete website as a ZIP</li>
                  <li>Modify the JSON to see different results</li>
                </ol>
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className="poc-column">
              <div className="poc-card">
                <div className="poc-preview-header">
                  <h2 className="poc-card-title">Live Preview</h2>
                  <span className="poc-preview-route">
                    Route: {availableRoutes.find(r => r.path === selectedRoute)?.label}
                  </span>
                </div>
                
                {previewHtml ? (
                  <div className="poc-preview-container">
                    <iframe
                      srcDoc={previewHtml}
                      className="poc-preview-iframe"
                      sandbox="allow-scripts allow-same-origin"
                      title="Website Preview"
                      aria-label={`Preview of ${availableRoutes.find(r => r.path === selectedRoute)?.label} page`}
                    />
                  </div>
                ) : (
                  <div className="poc-preview-placeholder">
                    <div className="poc-placeholder-content">
                      <div className="poc-placeholder-icon" aria-hidden="true">👀</div>
                      <p className="poc-placeholder-text">Click "Preview Page" to see the generated website</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Feature Info */}
              <div className="poc-info-card poc-features">
                <h3 className="poc-info-title">Template Features:</h3>
                <ul className="poc-info-list">
                  <li>Nature-inspired design with green color palette</li>
                  <li>Responsive layout for all devices</li>
                  <li>6 pages: Homepage, Location, Gallery, Floor Plans, Project Detail, Register Interest</li>
                  <li>Interactive components with hover effects</li>
                  <li>SEO-optimized HTML structure</li>
                  <li>Accessibility features and semantic markup</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default POCPage;
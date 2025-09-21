import React, { useState, useEffect, ChangeEvent, useCallback } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';

// Import optimized utilities
import { API_ENDPOINTS, ERROR_MESSAGES } from '../constants';
import { GenerateResponse } from '../types';
import { useCampaignData, useErrorState, useApiOperations } from '../hooks';
import { createAndDownloadZip } from '../utils/fileUtils';
import MissingFieldsNotification from '../components/MissingFieldsNotification';
import { InternalSchemaType } from '../schema/internalSchema';

const POCPage: NextPage = () => {
  // Use custom hooks for better organization
  const { jsonInput, setJsonInput, validateAndParseJson } = useCampaignData();
  const {
    error,
    validationErrors,
    successMessage,
    setSuccessMessage,
    clearMessages,
    handleApiError,
  } = useErrorState();
  const { makeApiRequest } = useApiOperations();

  // State for new workflow
  const [transformedSchema, setTransformedSchema] = useState<InternalSchemaType | null>(null);
  const [editableSchemaText, setEditableSchemaText] = useState<string>('');
  const [isTransforming, setIsTransforming] = useState(false);
  const [showRawJson, setShowRawJson] = useState(true);

  // Local state
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

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
            name: 'Sample Property Campaign',
            details: {
              business_details: {
                business_name: 'Springleaf Residence',
                website: 'https://example.com',
                mobile: '+65 1234 5678',
              },
              ai_assisted_product_usps: [
                'Prime location with excellent connectivity',
                'Modern amenities and facilities',
              ],
              ad_copies: [
                {
                  headline: 'Your Dream Home Awaits',
                  primary_text: 'Experience luxury living',
                  description: 'Modern comfort meets natural beauty',
                },
              ],
              ad_banners: [
                {
                  banner_data: {
                    creative_title: 'Exterior View',
                    call_out: 'Register Now!',
                    call_to_action: 'Register Your Interest',
                    creative_image_url:
                      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
                  },
                },
              ],
            },
          },
        };
        setJsonInput(JSON.stringify(fallbackData, null, 2));
      }
    };

    loadSampleData();
  }, [setJsonInput]);

  // Listen for navigation messages from preview iframe
  useEffect(() => {
    let scrollLocked = false;
    let lockedScrollPosition = { x: 0, y: 0 };

    const handleMessage = (event: MessageEvent) => {
      // Verify origin for security (optional in development)
      if (event.data?.type === 'PREVIEW_NAVIGATE') {
        const newRoute = event.data.route;

        console.log('Navigation message received:', newRoute);

        // For single-page layout, we don't need to change routes
        // The navigation happens within the same page via anchor links
      } else if (event.data?.type === 'PREVENT_PARENT_SCROLL') {
        // Prevent the parent page from scrolling when iframe anchor links are clicked
        event.preventDefault();
        event.stopPropagation();

        // Ensure parent page stays in place
        const currentScrollY = window.scrollY;
        const currentScrollX = window.scrollX;

        // If the page scrolled, restore the position
        setTimeout(() => {
          if (window.scrollY !== currentScrollY || window.scrollX !== currentScrollX) {
            window.scrollTo(currentScrollX, currentScrollY);
          }
        }, 0);
      }
    };

    // Lock parent scroll when iframe is interacted with
    const lockParentScroll = () => {
      scrollLocked = true;
      lockedScrollPosition = { x: window.scrollX, y: window.scrollY };
    };

    const unlockParentScroll = () => {
      scrollLocked = false;
    };

    // Monitor scroll and restore position if locked
    const handleScroll = () => {
      if (scrollLocked) {
        window.scrollTo(lockedScrollPosition.x, lockedScrollPosition.y);
      }
    };

    // Add event listeners
    window.addEventListener('message', handleMessage);
    window.addEventListener('scroll', handleScroll, { passive: false });

    // Add iframe interaction detection
    const iframe = document.querySelector('.poc-preview-iframe');
    if (iframe) {
      iframe.addEventListener('mouseenter', lockParentScroll);
      iframe.addEventListener('mouseleave', unlockParentScroll);
      iframe.addEventListener('focus', lockParentScroll);
      iframe.addEventListener('blur', unlockParentScroll);
    }

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('scroll', handleScroll);
      if (iframe) {
        iframe.removeEventListener('mouseenter', lockParentScroll);
        iframe.removeEventListener('mouseleave', unlockParentScroll);
        iframe.removeEventListener('focus', lockParentScroll);
        iframe.removeEventListener('blur', unlockParentScroll);
      }
    };

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [jsonInput]); // Include jsonInput as dependency since we use it in the handler

  const handlePreview = useCallback(async () => {
    clearMessages();

    try {
      setIsPreviewLoading(true);

      // Use edited schema if available, otherwise transform from raw JSON
      let schemaData = null;

      if (!showRawJson && editableSchemaText.trim()) {
        // User has edited the schema, try to parse and use it
        try {
          schemaData = JSON.parse(editableSchemaText);
          setTransformedSchema(schemaData as InternalSchemaType);
        } catch (parseError) {
          throw new Error('Invalid JSON in schema editor. Please check the syntax.');
        }
      } else if (transformedSchema) {
        // Use existing transformed schema
        schemaData = transformedSchema;
      } else {
        // Transform from raw JSON
        const campaignData = validateAndParseJson(jsonInput);
        setIsTransforming(true);
        setShowRawJson(false); // Switch to schema tab when transforming

        const transformResponse = await makeApiRequest<any>('/api/transform', {
          campaignData,
        });

        schemaData = transformResponse.data;
        setTransformedSchema(schemaData as InternalSchemaType);
        setEditableSchemaText(JSON.stringify(schemaData, null, 2));
        setIsTransforming(false);
        setSuccessMessage('Campaign data transformed successfully!');
      }

      // Generate preview using the schema
      const html = await makeApiRequest<string>(API_ENDPOINTS.PREVIEW, {
        internalSchemaData: schemaData,
        route: '/',
      });

      setPreviewHtml(html);
    } catch (err: any) {
      setIsTransforming(false);
      if (err.statusCode) {
        handleApiError(err, ERROR_MESSAGES.PREVIEW_FAILED);
      } else {
        handleApiError(
          { error: 'validation', message: err.message },
          ERROR_MESSAGES.PREVIEW_FAILED
        );
      }
    } finally {
      setIsPreviewLoading(false);
    }
  }, [
    jsonInput,
    transformedSchema,
    editableSchemaText,
    showRawJson,
    validateAndParseJson,
    makeApiRequest,
    clearMessages,
    handleApiError,
    setSuccessMessage,
  ]);

  const handleGenerate = useCallback(async () => {
    clearMessages();

    try {
      setIsGenerating(true);

      // Use edited schema if available, otherwise transform from raw JSON
      let schemaData = null;

      if (!showRawJson && editableSchemaText.trim()) {
        // User has edited the schema, try to parse and use it
        try {
          schemaData = JSON.parse(editableSchemaText);
          setTransformedSchema(schemaData as InternalSchemaType);
        } catch (parseError) {
          throw new Error('Invalid JSON in schema editor. Please check the syntax.');
        }
      } else if (transformedSchema) {
        // Use existing transformed schema
        schemaData = transformedSchema;
      } else {
        // Transform from raw JSON
        const campaignData = validateAndParseJson(jsonInput);
        setIsTransforming(true);
        setShowRawJson(false); // Switch to schema tab when transforming

        const transformResponse = await makeApiRequest<any>('/api/transform', {
          campaignData,
        });

        schemaData = transformResponse.data;
        setTransformedSchema(schemaData as InternalSchemaType);
        setEditableSchemaText(JSON.stringify(schemaData, null, 2));
        setIsTransforming(false);
      }

      // Generate website using the schema
      const result = await makeApiRequest<GenerateResponse>(API_ENDPOINTS.GENERATE, {
        internalSchemaData: schemaData,
        format: 'json',
      });

      // Create and download ZIP file
      await createAndDownloadZip(result.data);

      setSuccessMessage(
        `Successfully generated website for "${result.data.metadata.campaignName}"`
      );
    } catch (err: any) {
      setIsTransforming(false);
      if (err.statusCode) {
        handleApiError(err, ERROR_MESSAGES.GENERATION_FAILED);
      } else {
        handleApiError(
          { error: 'validation', message: err.message },
          ERROR_MESSAGES.GENERATION_FAILED
        );
      }
    } finally {
      setIsGenerating(false);
    }
  }, [
    jsonInput,
    transformedSchema,
    editableSchemaText,
    showRawJson,
    validateAndParseJson,
    makeApiRequest,
    clearMessages,
    handleApiError,
    setSuccessMessage,
  ]);

  return (
    <>
      <Head
        children={
          <>
            <title>Easy Web POC - Campaign to Website Generator</title>
            <meta name='description' content='Transform campaign data into complete websites' />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <link rel='icon' href='/favicon.ico' />
          </>
        }
      />

      <div className='poc-page'>
        {/* Header */}
        <header className='poc-header'>
          <div className='poc-header-container'>
            <div className='poc-brand'>
              <h1>Easy Web POC</h1>
              <p>Transform campaign data into complete websites</p>
            </div>
            <div className='poc-template-info'>Springleaf Template • Nature-inspired Design</div>
          </div>
        </header>

        <main className='poc-main'>
          <div className='poc-grid'>
            {/* Left Column - Input */}
            <div className='poc-column'>
              <div className='poc-card'>
                {/* Tab Headers */}
                <div className='poc-tab-header'>
                  <button
                    onClick={() => setShowRawJson(true)}
                    className={`poc-tab ${showRawJson ? 'poc-tab-active' : ''}`}
                  >
                    Raw JSON
                  </button>
                  <button
                    onClick={() => setShowRawJson(false)}
                    className={`poc-tab ${!showRawJson ? 'poc-tab-active' : ''}`}
                  >
                    Internal Schema
                    {transformedSchema && <span className='poc-indicator'>•</span>}
                  </button>
                </div>

                {/* Tab Content */}
                {showRawJson ? (
                  <div className='poc-tab-content'>
                    <h2 className='poc-card-title'>Campaign Data (JSON)</h2>
                    <textarea
                      className='poc-textarea'
                      placeholder='Paste your campaign JSON data here...'
                      value={jsonInput}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setJsonInput(e.target.value)
                      }
                      aria-label='Campaign JSON data input'
                    />
                  </div>
                ) : (
                  <div className='poc-tab-content'>
                    <h2 className='poc-card-title'>
                      Internal Schema (Editable)
                      {isTransforming && <span className='poc-transforming'>Transforming...</span>}
                    </h2>
                    <textarea
                      className='poc-textarea poc-schema-textarea'
                      placeholder={
                        transformedSchema
                          ? 'Edit the internal schema...'
                          : 'Internal schema will appear here after transformation'
                      }
                      value={editableSchemaText}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setEditableSchemaText(e.target.value)
                      }
                      aria-label='Internal schema editor'
                      disabled={!transformedSchema}
                    />
                    {!transformedSchema && (
                      <p className='poc-helper-text'>
                        Click "Preview" to automatically transform your raw JSON into an editable
                        internal schema.
                      </p>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className='poc-button-group'>
                  <button
                    onClick={handlePreview}
                    disabled={isPreviewLoading || isTransforming}
                    className={`poc-btn poc-btn-primary ${isPreviewLoading || isTransforming ? 'poc-btn-loading' : ''}`}
                    aria-label={
                      isTransforming
                        ? 'Transforming schema...'
                        : isPreviewLoading
                          ? 'Generating preview...'
                          : 'Generate page preview'
                    }
                  >
                    {isTransforming
                      ? 'Transforming...'
                      : isPreviewLoading
                        ? 'Generating...'
                        : 'Preview Page'}
                  </button>

                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating || isTransforming}
                    className={`poc-btn poc-btn-success ${isGenerating || isTransforming ? 'poc-btn-loading' : ''}`}
                    aria-label={
                      isTransforming
                        ? 'Transforming schema...'
                        : isGenerating
                          ? 'Generating website...'
                          : 'Generate complete website'
                    }
                  >
                    {isTransforming
                      ? 'Transforming...'
                      : isGenerating
                        ? 'Generating...'
                        : 'Generate Website'}
                  </button>
                </div>

                {/* Messages */}
                {error && (
                  <div className='poc-message poc-message-error' role='alert'>
                    <p className='poc-message-title'>Error:</p>
                    <p className='poc-message-content'>{error}</p>
                  </div>
                )}

                {validationErrors && validationErrors.length > 0 && (
                  <div className='poc-message poc-message-error' role='alert'>
                    <p className='poc-message-title'>Validation Errors:</p>
                    <div className='poc-validation-errors'>
                      <ul className='poc-validation-list'>
                        {validationErrors.map((err, idx) => (
                          <li key={idx} className='poc-validation-item'>
                            <span className='poc-validation-path'>{err.path}:</span> {err.message}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {successMessage && (
                  <div className='poc-message poc-message-success' role='alert'>
                    <p className='poc-message-content'>{successMessage}</p>
                  </div>
                )}
              </div>

              {/* Missing Fields Notification */}
              <MissingFieldsNotification schema={transformedSchema} />

              {/* Instructions */}
              <div className='poc-info-card poc-instructions'>
                <h3 className='poc-info-title'>How to Use:</h3>
                <ol className='poc-info-list'>
                  <li>The sample campaign data is already loaded</li>
                  <li>Select a route and click "Preview Page" to see the generated HTML</li>
                  <li>Click "Generate Website" to download the complete website as a ZIP</li>
                  <li>Modify the JSON to see different results</li>
                </ol>
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className='poc-column'>
              <div className='poc-card'>
                <div className='poc-preview-header'>
                  <h2 className='poc-card-title'>Live Preview</h2>
                  <span className='poc-preview-route'>Single-Page Application</span>
                </div>

                {previewHtml ? (
                  <div
                    className='poc-preview-container'
                    onScroll={(e) => {
                      // Prevent any scroll events from this container from affecting parent
                      e.stopPropagation();
                    }}
                  >
                    <iframe
                      srcDoc={previewHtml}
                      className='poc-preview-iframe'
                      sandbox='allow-scripts'
                      title='Website Preview'
                      aria-label='Preview of single-page website'
                      onLoad={(e) => {
                        // Add additional isolation after iframe loads
                        const iframe = e.target as HTMLIFrameElement;
                        try {
                          // Prevent any scroll events from the iframe from bubbling
                          iframe.addEventListener(
                            'scroll',
                            (event) => {
                              event.stopPropagation();
                            },
                            true
                          );
                        } catch (err) {
                          // Cross-origin restrictions might prevent this
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div className='poc-preview-placeholder'>
                    <div className='poc-placeholder-content'>
                      <div className='poc-placeholder-icon' aria-hidden='true'>
                        👀
                      </div>
                      <p className='poc-placeholder-text'>
                        Click "Preview Page" to see the generated website
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Feature Info */}
              <div className='poc-info-card poc-features'>
                <h3 className='poc-info-title'>Template Features:</h3>
                <ul className='poc-info-list'>
                  <li>Nature-inspired design with green color palette</li>
                  <li>Responsive layout for all devices</li>
                  <li>
                    6 pages: Homepage, Location, Gallery, Floor Plans, Project Detail, Register
                    Interest
                  </li>
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

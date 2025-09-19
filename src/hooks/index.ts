import { useState, useEffect, useCallback } from 'react';
import { ApiError } from '../types';
import { API_ENDPOINTS, FALLBACK_CAMPAIGN_DATA, ERROR_MESSAGES } from '../constants';

/**
 * Custom hook for managing campaign data loading
 */
export const useCampaignData = () => {
  const [jsonInput, setJsonInput] = useState('');

  const loadSampleData = useCallback(async () => {
    try {
      const response = await fetch(API_ENDPOINTS.SAMPLE_CAMPAIGN);
      if (response.ok) {
        const sampleData = await response.json();
        setJsonInput(JSON.stringify(sampleData, null, 2));
      } else {
        throw new Error(ERROR_MESSAGES.SAMPLE_DATA_FAILED);
      }
    } catch (err) {
      // If sample data fails to load, provide fallback
      setJsonInput(JSON.stringify(FALLBACK_CAMPAIGN_DATA, null, 2));
    }
  }, []);

  useEffect(() => {
    loadSampleData();
  }, [loadSampleData]);

  const validateAndParseJson = useCallback((jsonString: string) => {
    if (!jsonString.trim()) {
      throw new Error(ERROR_MESSAGES.MISSING_JSON);
    }

    try {
      return JSON.parse(jsonString);
    } catch (e) {
      throw new Error(ERROR_MESSAGES.INVALID_JSON);
    }
  }, []);

  return {
    jsonInput,
    setJsonInput,
    validateAndParseJson
  };
};

/**
 * Custom hook for managing error states
 */
export const useErrorState = () => {
  const [error, setError] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<ApiError['validationErrors']>([]);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const clearMessages = useCallback(() => {
    setError('');
    setValidationErrors([]);
    setSuccessMessage('');
  }, []);

  const handleApiError = useCallback((errorData: ApiError, fallbackMessage: string) => {
    setError(errorData.message || fallbackMessage);
    if (errorData.validationErrors) {
      setValidationErrors(errorData.validationErrors);
    }
  }, []);

  return {
    error,
    setError,
    validationErrors,
    setValidationErrors,
    successMessage,
    setSuccessMessage,
    clearMessages,
    handleApiError
  };
};

/**
 * Custom hook for API operations
 */
export const useApiOperations = () => {
  const makeApiRequest = useCallback(async <T = any>(
    endpoint: string,
    payload: any
  ): Promise<T> => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw { ...errorData, statusCode: response.status };
    }

    // Handle both JSON and text responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.text() as any;
    }
  }, []);

  return { makeApiRequest };
};
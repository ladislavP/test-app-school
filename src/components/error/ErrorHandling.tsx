'use client';

import React from 'react';
import { useError } from '@/components/error/ErrorProvider';

interface ApiError {
  code?: string;
  message?: string;
}

// Higher-order component to catch errors in API calls
export function withErrorHandling<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return function WithErrorHandling(props: P) {
    const { showErrorToast, setGlobalError } = useError();

    // Function to handle API errors
    const handleApiError = (error: ApiError | Error | unknown) => {
      const apiError = error as ApiError;
      // Check if it's a network error
      if (apiError.code === 'NETWORK_ERROR') {
        showErrorToast(apiError.message || 'Network error occurred');
      } else {
        // For other errors, set global error
        setGlobalError(apiError.message || 'An unexpected error occurred');
      }
    };

    return <Component {...props} handleApiError={handleApiError} />;
  };
}

// Custom hook for API error handling
export function useApiErrorHandler() {
  const { showErrorToast, setGlobalError } = useError();

  const handleApiError = (error: ApiError | Error | unknown) => {
    const apiError = error as ApiError;
    // Check if it's a network error
    if (apiError.code === 'NETWORK_ERROR') {
      showErrorToast(apiError.message || 'Network error occurred');
    } else {
      // For other errors, set global error
      setGlobalError(apiError.message || 'An unexpected error occurred');
    }
  };

  return { handleApiError };
}

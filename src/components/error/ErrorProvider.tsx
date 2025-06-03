'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the types for our context
interface ErrorContextType {
  globalError: string | null;
  setGlobalError: (error: string | null) => void;
  showErrorToast: (message: string, duration?: number) => void;
}

// Create the context with default values
const ErrorContext = createContext<ErrorContextType>({
  globalError: null,
  setGlobalError: () => {},
  showErrorToast: () => {},
});

// Custom hook to use the error context
export const useError = () => useContext(ErrorContext);

// Toast component
interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto w-full max-w-sm px-4 z-50">
      <div className="bg-red-500 text-white p-3 rounded-md shadow-lg flex justify-between items-center">
        <p>{message}</p>
        <button 
          onClick={onClose}
          className="ml-2 text-white hover:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Provider component
interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; id: number } | null>(null);

  const showErrorToast = (message: string, duration = 3000) => {
    const id = Date.now();
    setToast({ message, id });
    
    // Auto-dismiss after duration
    setTimeout(() => {
      setToast(current => current && current.id === id ? null : current);
    }, duration);
  };

  return (
    <ErrorContext.Provider value={{ globalError, setGlobalError, showErrorToast }}>
      {children}
      
      {/* Global error banner */}
      {globalError && (
        <div className="fixed top-14 left-0 right-0 bg-red-500 text-white p-3 z-50">
          <div className="max-w-md mx-auto flex justify-between items-center">
            <p>{globalError}</p>
            <button 
              onClick={() => setGlobalError(null)}
              className="ml-2 text-white hover:text-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Toast notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          onClose={() => setToast(null)} 
        />
      )}
    </ErrorContext.Provider>
  );
};

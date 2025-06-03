import sk from './sk';

// Translation utility function
export function t(key: string, params?: Record<string, string | number>): string {
  const keys = key.split('.');
  let value: unknown = sk;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      console.warn(`Translation key not found: ${key}`);
      return key; // Return the key if translation not found
    }
  }
  
  if (typeof value !== 'string') {
    console.warn(`Translation value is not a string: ${key}`);
    return key;
  }
  
  // Replace parameters in the translation
  if (params) {
    return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
      return params[paramKey]?.toString() || match;
    });
  }
  
  return value;
}

// Hook for using translations in React components
export function useTranslation() {
  return { t };
}

// Export the translation object for direct access
export { sk };
export default t;


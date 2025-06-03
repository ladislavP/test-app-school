"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { API, ApiError } from '@/lib/api';
import { t } from '@/lib/translations';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error state
    setError(null);
    
    // Validate form
    if (!username || !password) {
      setError('Prosím zadajte používateľské meno aj heslo');
      return;
    }
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Call API
      await API.authorize(username, password);
      
      // Redirect to main screen on success
      router.push('/schools');
    } catch (err) {
      // Handle error
      const apiError = err as ApiError;
      setError(apiError.message || t('errors.unknownError'));
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary relative overflow-hidden">
      {/* Background decorations - Enhanced for desktop */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 lg:w-96 lg:h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 lg:w-96 lg:h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 lg:w-[32rem] lg:h-[32rem] bg-white/5 rounded-full blur-3xl"></div>
        
        {/* Additional desktop decorations */}
        <div className="hidden lg:block absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="hidden lg:block absolute bottom-20 right-20 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      {/* Desktop layout with sidebar */}
      <div className="flex min-h-screen">
        {/* Left side - Info panel (desktop only) */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative z-10 flex-col justify-center px-12 xl:px-20">
          <div className="max-w-lg">
            <div className="mb-8">
              <div className="w-16 h-16 mb-6 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h1 className="text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                Správca<br />škôl
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Moderný systém pre efektívnu správu vzdelávacích inštitúcií a zariadení
              </p>
            </div>
            
            {/* Features list */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-white/90">
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                <span>Správa škôl a zariadení</span>
              </div>
              <div className="flex items-center space-x-3 text-white/90">
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                <span>QR kód skenovanie</span>
              </div>
              <div className="flex items-center space-x-3 text-white/90">
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                <span>Monitorovanie stavu zariadení</span>
              </div>
              <div className="flex items-center space-x-3 text-white/90">
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                <span>Moderné používateľské rozhranie</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-4 lg:p-8 relative z-10">
          <div className="w-full max-w-md lg:max-w-lg">
            {/* Mobile logo (hidden on desktop) */}
            <div className="lg:hidden text-center mb-8 animate-fade-in">
              <div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Správca škôl</h1>
              <p className="text-white/80 text-sm">Spravujte svoje vzdelávacie inštitúcie s ľahkosťou</p>
            </div>

            {/* Login card - Enhanced for desktop */}
            <Card variant="glass" className="animate-slide-up backdrop-blur-xl border-white/20 lg:p-2">
              <CardHeader className="text-center space-y-2 lg:space-y-4">
                <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                  {t('auth.welcomeBack')}
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
                  {t('auth.loginSubtitle')}
                </p>
              </CardHeader>
              
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-6 lg:space-y-8">
                  {error && (
                    <div className="error-state animate-scale-in">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm">{error}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-4 lg:space-y-6">
                    <Input
                      label={t('auth.username')}
                      type="text"
                      placeholder="Zadajte svoje používateľské meno"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={isLoading}
                      variant="filled"
                      icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      }
                    />
                    
                    <Input
                      label={t('auth.password')}
                      type="password"
                      placeholder="Zadajte svoje heslo"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      variant="filled"
                      icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      }
                    />
                  </div>

                  {/* Additional options */}
                  <div className="flex items-center justify-between text-sm lg:text-base">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <span className="text-gray-600 dark:text-gray-400">{t('auth.rememberMe')}</span>
                    </label>
                    <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                      {t('auth.forgotPassword')}
                    </a>
                  </div>
                </CardContent>
                
                <CardFooter className="space-y-4 lg:space-y-6">
                  <Button 
                    type="submit" 
                    className="w-full"
                    size="lg"
                    isLoading={isLoading}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Prihlasuje sa...' : t('auth.loginButton')}
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">
                      {t('auth.noAccount')}{' '}
                      <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
                        {t('auth.contactAdmin')}
                      </a>
                    </p>
                  </div>
                </CardFooter>
              </form>
            </Card>

            {/* Footer */}
            <div className="text-center mt-8 animate-fade-in">
              <p className="text-white/60 text-xs lg:text-sm">
                © 2024 Správca škôl. Všetky práva vyhradené.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


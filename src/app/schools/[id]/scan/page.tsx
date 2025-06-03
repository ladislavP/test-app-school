'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdvancedQRScanner from '@/components/ui/AdvancedQRScanner';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { API, ApiError } from '@/lib/api';
import { t } from '@/lib/translations';

interface QRScanPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function QRScanPage({ params }: QRScanPageProps) {
  const router = useRouter();
  const [schoolId, setSchoolId] = useState<string>('');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get school ID from params
  useEffect(() => {
    params.then(({ id }) => {
      setSchoolId(id);
    });
  }, [params]);

  // Handle successful QR scan
  const handleScan = async (qrCode: string) => {
    if (!schoolId) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      // Check if authenticated
      if (!API.isAuthenticated()) {
        router.push('/');
        return;
      }
      
      // Process the QR code with the API
      const response = await API.scanQRCode(qrCode);
      
      if (!response.success) {
        setError(response.message || t('qr.invalidCode'));
        return;
      }
      
      // Set success result
      setResult(qrCode);
      
      // Show success for a moment, then redirect
      setTimeout(() => {
        router.push(`/schools/${schoolId}`);
      }, 2000);
      
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || t('qr.error'));
      
      // If authentication error, redirect to login
      if (apiError.code === 'AUTH_REQUIRED') {
        router.push('/');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle scanner error
  const handleScanError = (error: unknown) => {
    console.error('Scanner error:', error);
    setError(t('qr.cameraError'));
  };

  // Handle back button
  const handleBack = () => {
    if (schoolId) {
      router.push(`/schools/${schoolId}`);
    } else {
      router.push('/schools');
    }
  };

  // Handle retry
  const handleRetry = () => {
    setError(null);
    setResult(null);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Enhanced Header for Desktop */}
      <header className="relative z-10 p-4 lg:p-6">
        <div className="px-4 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 lg:space-x-6">
              <Button variant="ghost" onClick={handleBack} className="text-white hover:bg-white/10 lg:px-4 lg:py-2">
                <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">{t('common.back')}</span>
              </Button>
              
              <div className="flex items-center space-x-3 lg:space-x-4">
                <div className="w-8 h-8 lg:w-12 lg:h-12 bg-white/20 rounded-lg lg:rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-5 h-5 lg:w-7 lg:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-white font-bold text-lg lg:text-2xl">{t('qr.title')}</h1>
                  <p className="hidden lg:block text-white/80 text-sm">
                    Skenovanie QR kódov pre registráciu zariadení
                  </p>
                </div>
              </div>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="ghost" onClick={handleLogout} className="text-white/80 hover:text-white hover:bg-white/10">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {t('common.logout')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Main Content for Desktop */}
      <main className="relative z-10 px-4 lg:px-6 pb-8 lg:pb-12">
        <div className="px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Scanner Section - Takes 2 columns on desktop */}
            <div className="lg:col-span-2">
              {/* Success state */}
              {result && !error && (
                <div className="mb-6 lg:mb-8 animate-scale-in">
                  <Card variant="glass" className="border-emerald-500/30 bg-emerald-500/10">
                    <CardContent className="p-6 lg:p-10 text-center">
                      <div className="w-16 h-16 lg:w-24 lg:h-24 mx-auto mb-4 lg:mb-6 bg-emerald-500 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 lg:w-12 lg:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-lg lg:text-2xl font-bold text-white mb-2 lg:mb-4">{t('qr.success')}</h3>
                      <p className="text-white/80 text-sm lg:text-base mb-4 lg:mb-6">
                        {t('qr.successMessage')}
                      </p>
                      <div className="bg-white/20 rounded-lg lg:rounded-xl p-3 lg:p-4">
                        <p className="text-white text-sm lg:text-base font-mono break-all">
                          {result}
                        </p>
                      </div>
                      <p className="text-white/60 text-xs lg:text-sm mt-3 lg:mt-4">
                        {t('qr.redirecting')}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Error state */}
              {error && (
                <div className="mb-6 lg:mb-8 animate-scale-in">
                  <Card variant="glass" className="border-red-500/30 bg-red-500/10">
                    <CardContent className="p-6 lg:p-8">
                      <div className="flex items-start space-x-3 lg:space-x-4">
                        <svg className="w-5 h-5 lg:w-6 lg:h-6 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-1 lg:text-lg">{t('qr.error')}</h4>
                          <p className="text-white/80 text-sm lg:text-base mb-3 lg:mb-4">{error}</p>
                          <Button size="sm" variant="outline" onClick={handleRetry} className="text-white border-white/30 hover:bg-white/10 lg:px-6">
                            {t('common.retry')}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Processing state */}
              {isProcessing && (
                <div className="mb-6 lg:mb-8 animate-scale-in">
                  <Card variant="glass" className="border-indigo-500/30 bg-indigo-500/10">
                    <CardContent className="p-6 lg:p-10 text-center">
                      <div className="w-16 h-16 lg:w-24 lg:h-24 mx-auto mb-4 lg:mb-6 bg-indigo-500 rounded-full flex items-center justify-center">
                        <div className="spinner w-8 h-8 lg:w-12 lg:h-12 border-white"></div>
                      </div>
                      <h3 className="text-lg lg:text-2xl font-bold text-white mb-2 lg:mb-4">{t('qr.processing')}</h3>
                      <p className="text-white/80 text-sm lg:text-base">
                        {t('qr.processingMessage')}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Scanner */}
              {!result && !isProcessing && (
                <div className="animate-fade-in">
                  <AdvancedQRScanner
                    onScan={handleScan}
                    onError={handleScanError}
                    title={t('qr.scanTitle')}
                    subtitle={t('qr.scanSubtitle')}
                    allowManualInput={true}
                    placeholder={t('qr.codeInputPlaceholder')}
                  />
                </div>
              )}
            </div>

            {/* Instructions Sidebar - Takes 1 column on desktop */}
            <div className="lg:col-span-1">
              {!result && !isProcessing && (
                <div className="space-y-6 lg:space-y-8 animate-fade-in">
                  {/* Instructions */}
                  <Card variant="glass" className="border-white/20">
                    <CardContent className="p-6 lg:p-8">
                      <h3 className="text-gray font-semibold mb-4 lg:mb-6 flex items-center text-lg lg:text-xl">
                        <svg className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {t('qr.instructions')}
                      </h3>
                      <ul className="text-gray/80 text-sm lg:text-base space-y-3 lg:space-y-4">
                        <li className="flex items-start space-x-3">
                          <span className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{t('qr.instruction1')}</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{t('qr.instruction2')}</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{t('qr.instruction3')}</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{t('qr.instruction4')}</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Tips for Desktop Users */}
                  <Card variant="glass" className="border-white/20 hidden lg:block">
                    <CardContent className="p-8">
                      <h3 className="text-gray font-semibold mb-6 flex items-center text-xl">
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Tipy pre skenovanie
                      </h3>
                      <ul className="text-gray/80 text-base space-y-4">
                        <li className="flex items-start space-x-3">
                          <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                          <span>Uistite sa, že máte dostatočné osvetlenie</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                          <span>Držte QR kód stabilne v rámci kamery</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                          <span>Ak skenovanie nefunguje, použite manuálny vstup</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                          <span>Skontrolujte, či je QR kód čitateľný a nepoškodený</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Quick Actions for Desktop */}
                  <Card variant="glass" className="border-white/20 hidden lg:block">
                    <CardContent className="p-8">
                      <h3 className="text-gray font-semibold mb-6 flex items-center text-xl">
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Rýchle akcie
                      </h3>
                      <div className="space-y-3">
                        <Button 
                          variant="outline" 
                          onClick={handleBack}
                          className="w-full text-white border-white/30 hover:bg-white/10 justify-start"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          Späť na detaily školy
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => router.push('/schools')}
                          className="w-full text-white border-white/30 hover:bg-white/10 justify-start"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          Zoznam škôl
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Background decorations for Desktop */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 lg:w-96 lg:h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 lg:w-96 lg:h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 lg:w-[32rem] lg:h-[32rem] bg-white/5 rounded-full blur-3xl"></div>
        <div className="hidden lg:block absolute top-1/4 right-1/4 w-64 h-64 bg-white/8 rounded-full blur-2xl"></div>
        <div className="hidden lg:block absolute bottom-1/4 left-1/4 w-64 h-64 bg-white/8 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
}


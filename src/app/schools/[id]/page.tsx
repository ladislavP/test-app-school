'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, StatsCard } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Spinner } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';
import { API, Device, School, ApiError } from '@/lib/api';
import { t } from '@/lib/translations';

interface SchoolDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function SchoolDetailsPage({ params }: SchoolDetailsPageProps) {
  const router = useRouter();
  const [schoolId, setSchoolId] = useState<string>('');
  
  const [school, setSchool] = useState<School | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get school ID from params
  useEffect(() => {
    params.then(({ id }) => {
      setSchoolId(id);
    });
  }, [params]);

  // Function to load school details and devices
  const loadSchoolDetails = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check if authenticated
      if (!API.isAuthenticated()) {
        router.push('/');
        return;
      }
      
      // Load school details
      const schoolData = await API.loadSchool(schoolId);
      setSchool(schoolData);
      
      // Load devices for this school
      const devicesData = await API.loadSchoolDevices(schoolId);
      setDevices(devicesData);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || t('schools.loadingSchoolDetails'));
      
      // If authentication error, redirect to login
      if (apiError.code === 'AUTH_REQUIRED') {
        router.push('/');
      }
    } finally {
      setIsLoading(false);
    }
  }, [schoolId, router]);

  // Load school details and devices
  useEffect(() => {
    if (schoolId) {
      loadSchoolDetails();
    }
  }, [schoolId, loadSchoolDetails]);

  // Handle back button click
  const handleBackClick = () => {
    router.push('/schools');
  };

  // Handle QR scan button click
  const handleScanQRClick = () => {
    router.push(`/schools/${schoolId}/scan`);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/');
  };

  // Calculate device statistics
  const deviceStats = {
    total: devices.length,
    green: devices.filter(d => d.status === 'green').length,
    yellow: devices.filter(d => d.status === 'yellow').length,
    red: devices.filter(d => d.status === 'red').length,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'green':
        return (
          <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'yellow':
        return (
          <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'red':
        return (
          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="text-gray-500 mt-4 lg:text-lg">Načítavajú sa detaily školy...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Enhanced Header for Desktop */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center space-x-4 lg:space-x-6">
              <Button variant="ghost" size="sm" onClick={handleBackClick} className="lg:px-4 lg:py-2">
                <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">{t('common.back')}</span>
              </Button>
              
              <div className="flex items-center space-x-3 lg:space-x-4">
                <div className="w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg lg:rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 lg:w-7 lg:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                    {school?.name || t('schools.schoolDetails')}
                  </h1>
                  <p className="hidden lg:block text-sm text-gray-500 dark:text-gray-400">
                    Správa zariadení a monitorovanie stavu
                  </p>
                </div>
              </div>
            </div>
            
            {/* Desktop Actions */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              <Button 
                onClick={handleScanQRClick} 
                className="hidden sm:flex lg:px-6 lg:py-3"
                size="sm"
              >
                <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
                </svg>
                {t('schools.scanQR')}
              </Button>
              
              <div className="hidden lg:block w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
              
              <Button variant="ghost" size="sm" onClick={handleLogout} className="hidden lg:flex text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {t('common.logout')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content with full-width desktop layout */}
      <main className="px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {error ? (
          <div className="error-state mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
              <Button size="sm" variant="outline" onClick={loadSchoolDetails}>
                {t('common.retry')}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8 lg:space-y-12">
            {/* Enhanced School Info Card for Desktop */}
            {school && (
              <Card variant="elevated" className="animate-fade-in">
                <CardContent className="p-6 lg:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* School Identity */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start space-x-4 lg:space-x-6 mb-6 lg:mb-8">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl lg:rounded-3xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-8 h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 lg:mb-3">
                            {school.name}
                          </h2>
                          <div className="flex items-center space-x-2 mb-4 lg:mb-6">
                            <div className="w-2 h-2 lg:w-3 lg:h-3 bg-emerald-400 rounded-full"></div>
                            <span className="text-sm lg:text-base text-emerald-600 dark:text-emerald-400 font-medium">
                              {t('status.active')} • Systém funguje normálne
                            </span>
                          </div>
                          
                          {/* Contact Information */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                            <div className="flex items-start space-x-3">
                              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <div>
                                <p className="text-sm lg:text-base font-medium text-gray-500 dark:text-gray-400">Adresa</p>
                                <p className="text-gray-900 dark:text-white lg:text-lg">{school.address}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              <div>
                                <p className="text-sm lg:text-base font-medium text-gray-500 dark:text-gray-400">Telefón</p>
                                <p className="text-gray-900 dark:text-white lg:text-lg">{school.phoneNumber}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Quick Stats Sidebar */}
                    <div className="lg:col-span-1">
                      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl lg:rounded-2xl p-6 lg:p-8">
                        <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">
                          Prehľad zariadení
                        </h3>
                        <div className="space-y-4 lg:space-y-6">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Celkovo</span>
                            <span className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{deviceStats.total}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-emerald-600 dark:text-emerald-400">Zdravé</span>
                            <span className="text-xl lg:text-2xl font-bold text-emerald-600 dark:text-emerald-400">{deviceStats.green}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-amber-600 dark:text-amber-400">Upozornenia</span>
                            <span className="text-xl lg:text-2xl font-bold text-amber-600 dark:text-amber-400">{deviceStats.yellow}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-red-600 dark:text-red-400">Kritické</span>
                            <span className="text-xl lg:text-2xl font-bold text-red-600 dark:text-red-400">{deviceStats.red}</span>
                          </div>
                          
                          <div className="pt-4 lg:pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center space-x-2 text-sm lg:text-base text-gray-500 dark:text-gray-400">
                              <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>Aktualizované: {new Date().toLocaleDateString('sk-SK')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Enhanced Device Statistics for Desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              <StatsCard
                value={deviceStats.total.toString()}
                label={t('devices.totalDevices')}
                trend="neutral"
                trendValue="Všetky zariadenia"
              />
              <StatsCard
                value={deviceStats.green.toString()}
                label={t('devices.healthyDevices')}
                trend="up"
                trendValue="Fungujú správne"
              />
              <StatsCard
                value={deviceStats.yellow.toString()}
                label={t('devices.warningDevices')}
                trend="neutral"
                trendValue="Vyžadujú pozornosť"
              />
              <StatsCard
                value={deviceStats.red.toString()}
                label={t('devices.criticalDevices')}
                trend="down"
                trendValue="Vyžadujú okamžitú akciu"
              />
            </div>

            {/* Enhanced Devices Section for Desktop */}
            <div>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 lg:mb-8">
                <div className="mb-4 lg:mb-0">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                    Stav zariadení
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1 lg:text-lg">
                    Monitorovanie a správa všetkých registrovaných zariadení
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" onClick={loadSchoolDetails} size="sm" className="lg:px-6">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {t('common.refresh')}
                  </Button>
                  <Button onClick={handleScanQRClick} size="sm" className="lg:px-6">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
                    </svg>
                    Pridať zariadenie
                  </Button>
                </div>
              </div>

              {devices.length === 0 ? (
                <Card>
                  <CardContent className="p-8 lg:p-12 text-center">
                    <div className="w-16 h-16 lg:w-24 lg:h-24 mx-auto mb-4 lg:mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 lg:w-12 lg:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h4 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2 lg:mb-3">
                      Žiadne zariadenia nenájdené
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 lg:mb-8 lg:text-lg max-w-md mx-auto">
                      Pre túto školu zatiaľ nie sú registrované žiadne zariadenia. Začnite pridaním prvého zariadenia pomocou QR kódu.
                    </p>
                    <Button onClick={handleScanQRClick} size="lg" className="lg:px-8 lg:py-4">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
                      </svg>
                      Pridať prvé zariadenie
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                  {devices.map((device) => (
                    <Card key={device.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <CardContent className="p-6 lg:p-8">
                        <div className="flex items-start justify-between mb-4 lg:mb-6">
                          <div className="flex items-center space-x-3 lg:space-x-4">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-100 dark:bg-gray-800 rounded-lg lg:rounded-xl flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/20 transition-colors">
                              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white lg:text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {device.name}
                              </h4>
                              <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400">
                                ID: {device.id}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 lg:space-x-2">
                            {getStatusIcon(device.status)}
                            <StatusBadge status={device.status} />
                          </div>
                        </div>
                        
                        <div className="space-y-3 lg:space-y-4 text-sm lg:text-base">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Posledná aktualizácia:</span>
                            <span className="text-gray-900 dark:text-white font-medium">
                              {new Date(device.lastUpdated).toLocaleString('sk-SK')}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Stav:</span>
                            <span className={`font-semibold ${
                              device.status === 'green' ? 'text-emerald-600 dark:text-emerald-400' :
                              device.status === 'yellow' ? 'text-amber-600 dark:text-amber-400' :
                              'text-red-600 dark:text-red-400'
                            }`}>
                              {device.status === 'green' ? t('status.healthy') :
                               device.status === 'yellow' ? t('status.warning') :
                               t('status.critical')}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Enhanced Floating Action Button for Mobile */}
      <button
        onClick={handleScanQRClick}
        className="fab sm:hidden"
        aria-label={t('schools.scanQR')}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
        </svg>
      </button>
    </div>
  );
}


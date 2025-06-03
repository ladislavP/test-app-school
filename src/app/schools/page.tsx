'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, StatsCard } from '@/components/ui/Card';
import { InfiniteScroll } from '@/components/ui/InfiniteScroll';
import { Spinner } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';
import { API, School, ApiError } from '@/lib/api';
import { t } from '@/lib/translations';

export default function SchoolsPage() {
  const router = useRouter();
  const [schools, setSchools] = useState<School[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Function to load schools
  const loadSchools = useCallback(async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Check if authenticated
      if (!API.isAuthenticated()) {
        router.push('/');
        return;
      }
      
      // Load schools from API
      const response = await API.loadSchools(page);
      
      // Update state
      setSchools(prev => [...prev, ...response.data]);
      setHasMore(response.hasMore);
      setPage(prev => prev + 1);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || t('schools.loadingSchools'));
      
      // If authentication error, redirect to login
      if (apiError.code === 'AUTH_REQUIRED') {
        router.push('/');
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, page, router]);

  // Load initial schools
  useEffect(() => {
    loadSchools();
  }, [loadSchools]);

  // Handle school click
  const handleSchoolClick = (schoolId: string) => {
    router.push(`/schools/${schoolId}`);
  };

  // Handle logout
  const handleLogout = () => {
    // Clear authentication and redirect
    localStorage.removeItem('auth_token');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Enhanced Header for Desktop */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">Správca škôl</h1>
                <p className="hidden lg:block text-sm text-gray-500 dark:text-gray-400">Systém pre správu vzdelávacích inštitúcií</p>
              </div>
            </div>
            
            {/* Desktop Navigation - Simplified */}
            <div className="hidden lg:flex items-center space-x-6">
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {t('common.logout')}
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content with full-width desktop layout */}
      <main className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Enhanced page header for desktop */}
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 lg:mb-8">
            <div className="mb-4 lg:mb-0">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">{t('nav.schools')}</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1 lg:text-lg">
                {t('schools.subtitle')}
              </p>
            </div>
            
            {/* Desktop controls - View toggle only */}
            <div className="flex items-center">
              {/* View toggle */}
              <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-gray-700 text-indigo-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                  title="Mriežkové zobrazenie"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-gray-700 text-indigo-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                  title="Zoznamové zobrazenie"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced stats cards for desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 lg:mb-12">
          <StatsCard
            value={schools.length.toString()}
            label={t('schools.totalSchools')}
            trend="up"
            trendValue="+12%"
          />
          <StatsCard
            value="24"
            label={t('schools.totalDevices')}
            trend="up"
            trendValue="+8%"
          />
          <StatsCard
            value="98.5%"
            label="Dostupnosť systému"
            trend="neutral"
            trendValue="Posledných 30 dní"
          />
          <StatsCard
            value="156"
            label="Aktívne skenovania"
            trend="up"
            trendValue="+24%"
          />
        </div>

        {/* Error display */}
        {error && (
          <div className="mb-6">
            <div className="error-state">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setError(null);
                    loadSchools();
                  }}
                >
                  {t('common.retry')}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Schools list with improved desktop layout */}
        {schools.length === 0 && isLoading ? (
          <div className="flex justify-center py-12 lg:py-20">
            <div className="text-center">
              <Spinner size="lg" />
              <p className="text-gray-500 mt-4 lg:text-lg">{t('schools.loadingSchools')}</p>
            </div>
          </div>
        ) : schools.length === 0 ? (
          <div className="text-center py-12 lg:py-20">
            <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 lg:w-10 lg:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('schools.noSchools')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 lg:text-lg max-w-md mx-auto">
              V súčasnosti nie sú k dispozícii žiadne školy na zobrazenie.
            </p>
          </div>
        ) : (
          <InfiniteScroll
            onLoadMore={loadSchools}
            hasMore={hasMore}
            isLoading={isLoading}
          >
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1 max-w-4xl mx-auto'
            }`}>
              {schools.map((school) => (
                <Card
                  key={school.id}
                  className="cursor-pointer group hover:shadow-lg transition-all duration-300"
                  onClick={() => handleSchoolClick(school.id)}
                >
                  <CardContent className={`${viewMode === 'list' ? 'p-6 lg:p-8' : 'p-6'}`}>
                    <div className={`${viewMode === 'list' ? 'flex items-center space-x-6' : ''}`}>
                      <div className={`${viewMode === 'list' ? 'flex-shrink-0' : 'flex items-start justify-between mb-4'}`}>
                        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6 lg:w-7 lg:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        {viewMode === 'grid' && (
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{t('status.active')}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <div className={`${viewMode === 'list' ? 'flex items-center justify-between' : ''}`}>
                          <div>
                            <h3 className={`font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors ${
                              viewMode === 'list' ? 'text-xl lg:text-2xl mb-2' : 'text-lg mb-2'
                            }`}>
                              {school.name}
                            </h3>
                            
                            <div className={`space-y-2 text-sm lg:text-base text-gray-600 dark:text-gray-400 ${
                              viewMode === 'list' ? 'flex items-center space-x-6 space-y-0' : ''
                            }`}>
                              <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{school.address}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>{school.phoneNumber}</span>
                              </div>
                            </div>
                          </div>
                          
                          {viewMode === 'list' && (
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{t('status.active')}</span>
                              </div>
                              <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {viewMode === 'grid' && (
                          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                              <span className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">
                                Kliknite pre zobrazenie detailov
                              </span>
                              <svg className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </InfiniteScroll>
        )}
      </main>
    </div>
  );
}


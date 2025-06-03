'use client';
import './globals.css';
import React from 'react';
import { ErrorProvider } from '@/components/error/ErrorProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Správca škôl - Moderný systém pre správu škôl a zariadení" />
        <title>Správca škôl</title>
      </head>
      <body className="h-full bg-gray-50 dark:bg-gray-900 antialiased">
        <ErrorProvider>
          <div className="min-h-full">
            {children}
          </div>
        </ErrorProvider>
      </body>
    </html>
  );
}


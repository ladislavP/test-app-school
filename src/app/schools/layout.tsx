import React from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { PageContainer, ContentContainer } from '@/components/layout/Containers';

export default function SchoolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar title="Schools" />
      <PageContainer>
        <ContentContainer>
          {children}
        </ContentContainer>
      </PageContainer>
    </>
  );
}

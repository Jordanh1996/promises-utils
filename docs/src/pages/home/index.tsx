import React from 'react';
import { PageContainer } from '../page-container';
import { InstallationUsage } from './installation-usage';
import { IntroHeader } from './intro-header';

export function Home() {
  return (
    <PageContainer>
      <IntroHeader />
      <InstallationUsage />
      <br />
      <br />
      <br />
      <br />
    </PageContainer>
  );
}

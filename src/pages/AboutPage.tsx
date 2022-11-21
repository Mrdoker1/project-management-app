import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <main className="main">
      <div className="container">
        <h1>{t('About page title')}</h1>
      </div>
    </main>
  );
};

export default AboutPage;

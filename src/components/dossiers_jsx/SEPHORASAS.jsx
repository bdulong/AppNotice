
import React from 'react';
import { useTranslation } from 'react-i18next';
import './dossiers_jsx-style.css';
import '../../App.css';
import Header from '../Header/header.jsx';
import CTALanguage from '../CTALanguage/CTALanguage.jsx';

const SEPHORASASPage = () => {
  const { t } = useTranslation();

  return (
    <main>
      <Header />
      <div className='content'>
        <h1>SEPHORA SAS</h1>
        <div className='CTA-container'>
          
    <a 
      href={'/LFRuGXpnnlShCOzyFXOh'}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        window.open('/LFRuGXpnnlShCOzyFXOh', '_blank', 'noopener,noreferrer');
      }}
      className="dossier-link"
    >
      <div className="CTA-notice">
        <h2>{t('dossiers')} 24-14800</h2>
      </div>
    </a>
  

    <a 
      href={'/OYcCKfhKUjJyRQuxsnTH'}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        window.open('/OYcCKfhKUjJyRQuxsnTH', '_blank', 'noopener,noreferrer');
      }}
      className="dossier-link"
    >
      <div className="CTA-notice">
        <h2>{t('dossiers')} 24-99800</h2>
      </div>
    </a>
  
        </div>
        <CTALanguage />
      </div>
    </main>
  );
};

export default SEPHORASASPage;
  
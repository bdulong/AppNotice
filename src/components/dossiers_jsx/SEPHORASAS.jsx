
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
      href={'/ZJHAmNjqZGCZVKXXFwpd'}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        window.open('/ZJHAmNjqZGCZVKXXFwpd', '_blank', 'noopener,noreferrer');
      }}
      className="dossier-link"
    >
      <div className="CTA-notice">
        <h2>{t('dossiers')} 24-17111</h2>
      </div>
    </a>
  

    <a 
      href={'/FAgCgTmKRCACTygESMnO'}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        window.open('/FAgCgTmKRCACTygESMnO', '_blank', 'noopener,noreferrer');
      }}
      className="dossier-link"
    >
      <div className="CTA-notice">
        <h2>{t('dossiers')} 24-20610</h2>
      </div>
    </a>
  
        </div>
        <CTALanguage />
      </div>
    </main>
  );
};

export default SEPHORASASPage;
  
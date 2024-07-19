
import React from 'react';
import { useTranslation } from 'react-i18next';
import './dossiers_jsx-style.css';
import '../../App.css';
import Header from '../Header/header.jsx';
import CTALanguage from '../CTALanguage/CTALanguage.jsx';

const CHANELPARFUMSBEAUTESASPage = () => {
  const { t } = useTranslation();

  return (
    <main>
      <Header />
      <div className='content'>
        <h1>CHANEL PARFUMS BEAUTE SAS</h1>
        <div className='CTA-container'>
          
    <a 
      href={'/WxjHhzfbMqsJoxQULLFx'}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        window.open('/WxjHhzfbMqsJoxQULLFx', '_blank', 'noopener,noreferrer');
      }}
      className="dossier-link"
    >
      <div className="CTA-notice">
        <h2>{t('dossiers')} 24-20705</h2>
      </div>
    </a>
  

    <a 
      href={'/FDvukSjnCyhIQrXQPsZn'}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        window.open('/FDvukSjnCyhIQrXQPsZn', '_blank', 'noopener,noreferrer');
      }}
      className="dossier-link"
    >
      <div className="CTA-notice">
        <h2>{t('dossiers')} 24-44155</h2>
      </div>
    </a>
  

    <a 
      href={'/OafjYJYtuiBpZEAWGbih'}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        window.open('/OafjYJYtuiBpZEAWGbih', '_blank', 'noopener,noreferrer');
      }}
      className="dossier-link"
    >
      <div className="CTA-notice">
        <h2>{t('dossiers')} 24-54588</h2>
      </div>
    </a>
  
        </div>
        <CTALanguage />
      </div>
    </main>
  );
};

export default CHANELPARFUMSBEAUTESASPage;
  
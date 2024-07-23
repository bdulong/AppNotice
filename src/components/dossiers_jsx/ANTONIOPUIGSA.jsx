
import React from 'react';
import { useTranslation } from 'react-i18next';
import './dossiers_jsx-style.css';
import '../../App.css';
import Header from '../Header/header.jsx';
import CTALanguage from '../CTALanguage/CTALanguage.jsx';

const ANTONIOPUIGSAPage = () => {
  const { t } = useTranslation();

  return (
    <main>
      <Header />
      <div className='content'>
        <h1>ANTONIO PUIG S A</h1>
        <div className='CTA-container'>
          
    <a 
      href={'/YRSmdDeeZOEXRpqdbaKL'}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        window.open('/YRSmdDeeZOEXRpqdbaKL', '_blank', 'noopener,noreferrer');
      }}
      className="dossier-link"
    >
      <div className="CTA-notice">
        <h2>{t('dossiers')} 24-20661</h2>
      </div>
    </a>
  

    <a 
      href={'/NJbPDpDYHOAagsgZmWnT'}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        window.open('/NJbPDpDYHOAagsgZmWnT', '_blank', 'noopener,noreferrer');
      }}
      className="dossier-link"
    >
      <div className="CTA-notice">
        <h2>{t('dossiers')} 24-21161</h2>
      </div>
    </a>
  
        </div>
        <CTALanguage />
      </div>
    </main>
  );
};

export default ANTONIOPUIGSAPage;
  
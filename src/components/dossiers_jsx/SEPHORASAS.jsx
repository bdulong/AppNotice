
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './dossiers_jsx-style.css';
import '../../App.css';
import Header from '../Header/header.jsx';

const SEPHORASASPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <main>
      <Header />
      <div className='content'>
        <h1>SEPHORA SAS</h1>
        <div className='CTA-container'>
          
    <div className="CTA-notice">
      <a 
        href={'/LFRuGXpnnlShCOzyFXOh'}
        onClick={(e) => {
          e.preventDefault();
          navigate('/LFRuGXpnnlShCOzyFXOh');
        }}
        className="dossier-link"
      >
        <h2>{t('dossiers.24-14800')}</h2>
      </a>
    </div>
  

    <div className="CTA-notice">
      <a 
        href={'/ZJHAmNjqZGCZVKXXFwpd'}
        onClick={(e) => {
          e.preventDefault();
          navigate('/ZJHAmNjqZGCZVKXXFwpd');
        }}
        className="dossier-link"
      >
        <h2>{t('dossiers.24-17111')}</h2>
      </a>
    </div>
  

    <div className="CTA-notice">
      <a 
        href={'/FAgCgTmKRCACTygESMnO'}
        onClick={(e) => {
          e.preventDefault();
          navigate('/FAgCgTmKRCACTygESMnO');
        }}
        className="dossier-link"
      >
        <h2>{t('dossiers.24-20610')}</h2>
      </a>
    </div>
  
        </div>
      </div>
    </main>
  );
};

export default SEPHORASASPage;
  
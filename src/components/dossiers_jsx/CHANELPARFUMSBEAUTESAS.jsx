
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './dossiers_jsx-style.css';
import '../../App.css';
import Header from '../Header/header.jsx';

const CHANELPARFUMSBEAUTESASPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <main>
      <Header />
      <div className='content'>
        <h1>CHANEL PARFUMS BEAUTE SAS</h1>
        <div className='CTA-container'>
          
    <div className="CTA-notice">
      <a 
        href={'/WxjHhzfbMqsJoxQULLFx'}
        onClick={(e) => {
          e.preventDefault();
          navigate('/WxjHhzfbMqsJoxQULLFx');
        }}
        className="dossier-link"
      >
        <h2>{t('dossiers.24-20705')}</h2>
      </a>
    </div>
  

    <div className="CTA-notice">
      <a 
        href={'/FDvukSjnCyhIQrXQPsZn'}
        onClick={(e) => {
          e.preventDefault();
          navigate('/FDvukSjnCyhIQrXQPsZn');
        }}
        className="dossier-link"
      >
        <h2>{t('dossiers.24-44155')}</h2>
      </a>
    </div>
  

    <div className="CTA-notice">
      <a 
        href={'/OafjYJYtuiBpZEAWGbih'}
        onClick={(e) => {
          e.preventDefault();
          navigate('/OafjYJYtuiBpZEAWGbih');
        }}
        className="dossier-link"
      >
        <h2>{t('dossiers.24-54588')}</h2>
      </a>
    </div>
  
        </div>
      </div>
    </main>
  );
};

export default CHANELPARFUMSBEAUTESASPage;
  
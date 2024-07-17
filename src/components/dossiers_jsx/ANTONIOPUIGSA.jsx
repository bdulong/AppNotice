
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './dossiers_jsx-style.css';
import '../../App.css';
import Header from '../Header/header.jsx';

const ANTONIOPUIGSAPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <main>
      <Header />
      <div className='content'>
        <h1>ANTONIO PUIG S A</h1>
        <div className='CTA-container'>
          
    <div className="CTA-notice">
      <a 
        href={'/YRSmdDeeZOEXRpqdbaKL'}
        onClick={(e) => {
          e.preventDefault();
          navigate('/YRSmdDeeZOEXRpqdbaKL');
        }}
        className="dossier-link"
      >
        <h2>{t('dossiers.24-20661')}</h2>
      </a>
    </div>
  

    <div className="CTA-notice">
      <a 
        href={'/EawcjaZakNOexgkzgfRV'}
        onClick={(e) => {
          e.preventDefault();
          navigate('/EawcjaZakNOexgkzgfRV');
        }}
        className="dossier-link"
      >
        <h2>{t('dossiers.24-62114')}</h2>
      </a>
    </div>
  
        </div>
      </div>
    </main>
  );
};

export default ANTONIOPUIGSAPage;
  
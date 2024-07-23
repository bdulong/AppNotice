import React from 'react'
import { useTranslation } from 'react-i18next';
import './dossiers_jsx-style.css';
import '../../App.css';
import Header from '../Header/header.jsx';
import CTALanguage from '../CTALanguage/CTALanguage.jsx';

const Page = () => {
  const { t } = useTranslation();

  React.useEffect(() => {
      window.openPDF = (filePath) => {
          window.open(filePath, '_blank');
      };
  }, []);

  return (
      <main>
          <Header />
          <div className='content'>
              <h1>SEPHORA</h1>
              <div className='CTA-container'>
                  
        <div className='CTA-notice'>
            <button 
                onClick={() => window.openPDF('/dossiers/24-14800_SEPHORA_SAS/16 - Notice 24-14800/24-14800_NOTICE_INS_V01.pdf')}
                className='PDF-link'
            >
                <img src={'/icons/INS.svg'} alt={'INS icon'} className="folder-icon" onError={(e) => {e.target.style.display = 'none'}} />
                <h2>{t('sousDossiers.INS')}</h2>
            </button>
        </div>

        <div className='CTA-notice'>
            <button 
                onClick={() => window.openPDF('/dossiers/24-14800_SEPHORA_SAS/16 - Notice 24-14800/24-14800_NOTICE_TPT_V01.pdf')}
                className='PDF-link'
            >
                <img src={'/icons/TPT.svg'} alt={'TPT icon'} className="folder-icon" onError={(e) => {e.target.style.display = 'none'}} />
                <h2>{t('sousDossiers.TPT')}</h2>
            </button>
        </div>

        <div className='CTA-notice'>
            <button 
                onClick={() => window.openPDF('/dossiers/24-14800_SEPHORA_SAS/16 - Notice 24-14800/24-14800_NOTICE_EMB_V01.pdf')}
                className='PDF-link'
            >
                <img src={'/icons/EMB.svg'} alt={'EMB icon'} className="folder-icon" onError={(e) => {e.target.style.display = 'none'}} />
                <h2>{t('sousDossiers.EMB')}</h2>
            </button>
        </div>
              </div>
              <CTALanguage />
          </div>
      </main>
  );
};

export default Page;

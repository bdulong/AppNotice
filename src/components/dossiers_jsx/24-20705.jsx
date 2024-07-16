import React from 'react'
import { useTranslation } from 'react-i18next';
import './dossiers_jsx-style.css';
import '../../App.css';
import Header from '../Header/header.jsx';
import CTALanguage from '../CTALanguage/CTALanguage.jsx';

const Page = () => {
    const { t } = useTranslation();

    return (
        <main>
            <Header />
            <div className='content'>
                <h1>CHANEL PARFUMS BEAUTE SAS</h1>
                <div className='CTA-container'>
                    
					      <a 
					        href={'/dossiers/CHANEL PARFUMS BEAUTE SAS/16 - Notice CHANEL P/Demantelement'}
					        target="_blank"
					        rel="noopener noreferrer"
					        className='CTA-notice'
					      >
					        <img src={'/icons/Demantelement.svg'} alt={'Demantelement icon'} className="button-icon" onError={(e) => {e.target.style.display = 'none'}} />
					        {t('sousDossiers.Demantelement')}
					      </a>
					
					      <a 
					        href={'/dossiers/CHANEL PARFUMS BEAUTE SAS/16 - Notice CHANEL P/Electricite'}
					        target="_blank"
					        rel="noopener noreferrer"
					        className='CTA-notice'
					      >
					        <img src={'/icons/Electricite.svg'} alt={'Electricite icon'} className="button-icon" onError={(e) => {e.target.style.display = 'none'}} />
					        {t('sousDossiers.Electricite')}
					      </a>
					
					      <a 
					        href={'/dossiers/CHANEL PARFUMS BEAUTE SAS/16 - Notice CHANEL P/Emballage'}
					        target="_blank"
					        rel="noopener noreferrer"
					        className='CTA-notice'
					      >
					        <img src={'/icons/Emballage.svg'} alt={'Emballage icon'} className="button-icon" onError={(e) => {e.target.style.display = 'none'}} />
					        {t('sousDossiers.Emballage')}
					      </a>
					
					      <a 
					        href={'/dossiers/CHANEL PARFUMS BEAUTE SAS/16 - Notice CHANEL P/Installation'}
					        target="_blank"
					        rel="noopener noreferrer"
					        className='CTA-notice'
					      >
					        <img src={'/icons/Installation.svg'} alt={'Installation icon'} className="button-icon" onError={(e) => {e.target.style.display = 'none'}} />
					        {t('sousDossiers.Installation')}
					      </a>
					
					      <a 
					        href={'/dossiers/CHANEL PARFUMS BEAUTE SAS/16 - Notice CHANEL P/Transport'}
					        target="_blank"
					        rel="noopener noreferrer"
					        className='CTA-notice'
					      >
					        <img src={'/icons/Transport.svg'} alt={'Transport icon'} className="button-icon" onError={(e) => {e.target.style.display = 'none'}} />
					        {t('sousDossiers.Transport')}
					      </a>
                </div>
                <CTALanguage />
            </div>
        </main>
    );
};

export default Page;

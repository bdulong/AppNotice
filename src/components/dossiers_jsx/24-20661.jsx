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
                <h1>ANTONIO PUIG S.A</h1>
                <div className='CTA-container'>
                    
					        <div className='CTA-notice'>
					          <a 
					            href={'/dossiers/24-20661_ANTONIO_PUIG_S.A/16 - Notice 24-20661/Demantelement/NOTICE - 80100943 TG 23 BAR ON COUNTER - nouveauygf001.pdf'}
					            target="_blank"
					            rel="noopener noreferrer"
					            className='PDF-link'
					          >
					            <img src={'/icons/Demantelement.svg'} alt={'Demantelement icon'} className="folder-icon" onError={(e) => {e.target.style.display = 'none'}} />
					            <h2>{t('sousDossiers.Demantelement')}</h2>
					          </a>
					        </div>
					
					        <div className='CTA-notice'>
					          <a 
					            href={'/dossiers/24-20661_ANTONIO_PUIG_S.A/16 - Notice 24-20661/Demantelement/NOTICE - 80100944 TG 23 BAR ON COUNTER  - NON LUMINEUX 001.pdf'}
					            target="_blank"
					            rel="noopener noreferrer"
					            className='PDF-link'
					          >
					            <img src={'/icons/Demantelement.svg'} alt={'Demantelement icon'} className="folder-icon" onError={(e) => {e.target.style.display = 'none'}} />
					            <h2>{t('sousDossiers.Demantelement')}</h2>
					          </a>
					        </div>
					
					        <div className='CTA-notice'>
					          <a 
					            href={'/dossiers/24-20661_ANTONIO_PUIG_S.A/16 - Notice 24-20661/Electricite/CLARINS - KIT ALIM - NOTICE.pdf'}
					            target="_blank"
					            rel="noopener noreferrer"
					            className='PDF-link'
					          >
					            <img src={'/icons/Electricite.svg'} alt={'Electricite icon'} className="folder-icon" onError={(e) => {e.target.style.display = 'none'}} />
					            <h2>{t('sousDossiers.Electricite')}</h2>
					          </a>
					        </div>
					
					        <div className='CTA-notice'>
					          <a 
					            href={'/dossiers/24-20661_ANTONIO_PUIG_S.A/16 - Notice 24-20661/Emballage/NOTICE-DEBALLAGE.pdf'}
					            target="_blank"
					            rel="noopener noreferrer"
					            className='PDF-link'
					          >
					            <img src={'/icons/Emballage.svg'} alt={'Emballage icon'} className="folder-icon" onError={(e) => {e.target.style.display = 'none'}} />
					            <h2>{t('sousDossiers.Emballage')}</h2>
					          </a>
					        </div>
					
					        <div className='CTA-notice'>
					          <a 
					            href={'/dossiers/24-20661_ANTONIO_PUIG_S.A/16 - Notice 24-20661/Installation/CLARINS - TIROIS SANS CAISSON - NOTICE.pdf'}
					            target="_blank"
					            rel="noopener noreferrer"
					            className='PDF-link'
					          >
					            <img src={'/icons/Installation.svg'} alt={'Installation icon'} className="folder-icon" onError={(e) => {e.target.style.display = 'none'}} />
					            <h2>{t('sousDossiers.Installation')}</h2>
					          </a>
					        </div>
					
					        <div className='CTA-notice'>
					          <a 
					            href={'/dossiers/24-20661_ANTONIO_PUIG_S.A/16 - Notice 24-20661/Transport/CLARINS - GONDOLE C1 - NOTICE (ok 240320-modifié-210112).pdf'}
					            target="_blank"
					            rel="noopener noreferrer"
					            className='PDF-link'
					          >
					            <img src={'/icons/Transport.svg'} alt={'Transport icon'} className="folder-icon" onError={(e) => {e.target.style.display = 'none'}} />
					            <h2>{t('sousDossiers.Transport')}</h2>
					          </a>
					        </div>
                </div>
                <CTALanguage />
            </div>
        </main>
    );
};

export default Page;

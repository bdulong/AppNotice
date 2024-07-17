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
                <h1>SEPHORA SAS</h1>
                <div className='CTA-container'>
                    
					      <div className='sous-dossier'>
					        <h2>{t('sousDossiers.Demantelement')}</h2>
					        <img src={'/icons/Demantelement.svg'} alt={'Demantelement icon'} className="folder-icon" onError={(e) => {e.target.style.display = 'none'}} />
					        
					        <a 
					          href={'/dossiers/24-20610_SEPHORA_SAS/16 - Notice 24-20610/Demantelement/NOTICE - 80100942 TG 23 SMALL FLOOR - NON LUMINEUX.pdf'}
					          target="_blank"
					          rel="noopener noreferrer"
					          className='PDF-link'
					        >
					          {t('pdfFiles.NOTICE - 80100942 TG 23 SMALL FLOOR - NON LUMINEUX')}
					        </a>
					      </div>
					
					      <div className='sous-dossier'>
					        <h2>{t('sousDossiers.Electricite')}</h2>
					        <img src={'/icons/Electricite.svg'} alt={'Electricite icon'} className="folder-icon" onError={(e) => {e.target.style.display = 'none'}} />
					        
					        <a 
					          href={'/dossiers/24-20610_SEPHORA_SAS/16 - Notice 24-20610/Electricite/CLARINS - KIT ALIM - NOTICE.pdf'}
					          target="_blank"
					          rel="noopener noreferrer"
					          className='PDF-link'
					        >
					          {t('pdfFiles.CLARINS - KIT ALIM - NOTICE')}
					        </a>
					      </div>
					
					      <div className='sous-dossier'>
					        <h2>{t('sousDossiers.Emballage')}</h2>
					        <img src={'/icons/Emballage.svg'} alt={'Emballage icon'} className="folder-icon" onError={(e) => {e.target.style.display = 'none'}} />
					        
					        <a 
					          href={'/dossiers/24-20610_SEPHORA_SAS/16 - Notice 24-20610/Emballage/NOTICE-DEBALLAGE.pdf'}
					          target="_blank"
					          rel="noopener noreferrer"
					          className='PDF-link'
					        >
					          {t('pdfFiles.NOTICE-DEBALLAGE')}
					        </a>
					      </div>
					
					      <div className='sous-dossier'>
					        <h2>{t('sousDossiers.Installation')}</h2>
					        <img src={'/icons/Installation.svg'} alt={'Installation icon'} className="folder-icon" onError={(e) => {e.target.style.display = 'none'}} />
					        
					        <a 
					          href={'/dossiers/24-20610_SEPHORA_SAS/16 - Notice 24-20610/Installation/CLARINS - TIROIS SANS CAISSON - NOTICE.pdf'}
					          target="_blank"
					          rel="noopener noreferrer"
					          className='PDF-link'
					        >
					          {t('pdfFiles.CLARINS - TIROIS SANS CAISSON - NOTICE')}
					        </a>
					      </div>
					
					      <div className='sous-dossier'>
					        <h2>{t('sousDossiers.Transport')}</h2>
					        <img src={'/icons/Transport.svg'} alt={'Transport icon'} className="folder-icon" onError={(e) => {e.target.style.display = 'none'}} />
					        
					        <a 
					          href={'/dossiers/24-20610_SEPHORA_SAS/16 - Notice 24-20610/Transport/CLARINS - GONDOLE C1 - NOTICE (ok 240320-modifié-210112).pdf'}
					          target="_blank"
					          rel="noopener noreferrer"
					          className='PDF-link'
					        >
					          {t('pdfFiles.CLARINS - GONDOLE C1 - NOTICE (ok 240320-modifié-210112)')}
					        </a>
					      </div>
                </div>
                <CTALanguage />
            </div>
        </main>
    );
};

export default Page;

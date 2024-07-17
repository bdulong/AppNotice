import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import './dossiers_jsx-style.css';
import '../../App.css';
import Header from '../Header/header.jsx';
import CTALanguage from '../CTALanguage/CTALanguage.jsx';

const Page = () => {
    const { t } = useTranslation();

    useEffect(() => {
      window.openPDF = (filePath) => {
        window.open('/dossiers/' + filePath, '_blank');
      };
    }, []);

    return (
        <main>
            <Header />
            <div className='content'>
                <h1>CHANEL PARFUMS BEAUTE SAS</h1>
                <div className='CTA-container'>
                    
					        <div className='CTA-notice'>
					          <a 
					            href={'#file=' + btoa('24-20705_CHANEL_PARFUMS_BEAUTE_SAS/16 - Notice 24-20705/Demantelement/NOTICE - 80100942 TG 23 SMALL FLOOR - NON LUMINEUX.pdf')}
					            onClick={(e) => {
					              e.preventDefault();
					              window.openPDF('24-20705_CHANEL_PARFUMS_BEAUTE_SAS/16 - Notice 24-20705/Demantelement/NOTICE - 80100942 TG 23 SMALL FLOOR - NON LUMINEUX.pdf');
					            }}
					            className='PDF-link'
					          >
					            <img src={'/icons/Demantelement.svg'} alt={'Demantelement icon'} className="folder-icon" onError={(e) => {e.target.style.display = 'none'}} />
					            <h2>{t('sousDossiers.Demantelement')}</h2>
					          </a>
					        </div>
					
					        <div className='CTA-notice'>
					          <a 
					            href={'#file=' + btoa('24-20705_CHANEL_PARFUMS_BEAUTE_SAS/16 - Notice 24-20705/Electricite/CLARINS - KIT ALIM - NOTICE.pdf')}
					            onClick={(e) => {
					              e.preventDefault();
					              window.openPDF('24-20705_CHANEL_PARFUMS_BEAUTE_SAS/16 - Notice 24-20705/Electricite/CLARINS - KIT ALIM - NOTICE.pdf');
					            }}
					            className='PDF-link'
					          >
					            <img src={'/icons/Electricite.svg'} alt={'Electricite icon'} className="folder-icon" onError={(e) => {e.target.style.display = 'none'}} />
					            <h2>{t('sousDossiers.Electricite')}</h2>
					          </a>
					        </div>
					
					        <div className='CTA-notice'>
					          <a 
					            href={'#file=' + btoa('24-20705_CHANEL_PARFUMS_BEAUTE_SAS/16 - Notice 24-20705/Emballage/NOTICE-DEBALLAGE.pdf')}
					            onClick={(e) => {
					              e.preventDefault();
					              window.openPDF('24-20705_CHANEL_PARFUMS_BEAUTE_SAS/16 - Notice 24-20705/Emballage/NOTICE-DEBALLAGE.pdf');
					            }}
					            className='PDF-link'
					          >
					            <img src={'/icons/Emballage.svg'} alt={'Emballage icon'} className="folder-icon" onError={(e) => {e.target.style.display = 'none'}} />
					            <h2>{t('sousDossiers.Emballage')}</h2>
					          </a>
					        </div>
					
					        <div className='CTA-notice'>
					          <a 
					            href={'#file=' + btoa('24-20705_CHANEL_PARFUMS_BEAUTE_SAS/16 - Notice 24-20705/Installation/CLARINS - TIROIS SANS CAISSON - NOTICE.pdf')}
					            onClick={(e) => {
					              e.preventDefault();
					              window.openPDF('24-20705_CHANEL_PARFUMS_BEAUTE_SAS/16 - Notice 24-20705/Installation/CLARINS - TIROIS SANS CAISSON - NOTICE.pdf');
					            }}
					            className='PDF-link'
					          >
					            <img src={'/icons/Installation.svg'} alt={'Installation icon'} className="folder-icon" onError={(e) => {e.target.style.display = 'none'}} />
					            <h2>{t('sousDossiers.Installation')}</h2>
					          </a>
					        </div>
					
					        <div className='CTA-notice'>
					          <a 
					            href={'#file=' + btoa('24-20705_CHANEL_PARFUMS_BEAUTE_SAS/16 - Notice 24-20705/Transport/CLARINS - GONDOLE C1 - NOTICE (ok 240320-modifié-210112).pdf')}
					            onClick={(e) => {
					              e.preventDefault();
					              window.openPDF('24-20705_CHANEL_PARFUMS_BEAUTE_SAS/16 - Notice 24-20705/Transport/CLARINS - GONDOLE C1 - NOTICE (ok 240320-modifié-210112).pdf');
					            }}
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

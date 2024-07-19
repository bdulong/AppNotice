import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import './App.css';

import Landing from './components/Landing/landing.jsx';
import PageErreur from './components/PageErreur/PageErreur.jsx';
// Import des pages générées par LinksConverter.cjs :
import LFRuGXpnnlShCOzyFXOh from './components/dossiers_jsx/24-14800.jsx';
import ZJHAmNjqZGCZVKXXFwpd from './components/dossiers_jsx/24-17111.jsx';
import FAgCgTmKRCACTygESMnO from './components/dossiers_jsx/24-20610.jsx';
import YRSmdDeeZOEXRpqdbaKL from './components/dossiers_jsx/24-20661.jsx';
import WxjHhzfbMqsJoxQULLFx from './components/dossiers_jsx/24-20705.jsx';
import FDvukSjnCyhIQrXQPsZn from './components/dossiers_jsx/24-44155.jsx';
import OafjYJYtuiBpZEAWGbih from './components/dossiers_jsx/24-54588.jsx';
import EawcjaZakNOexgkzgfRV from './components/dossiers_jsx/24-62114.jsx';
import PogjWXgvYqyZAwgzfFDv from './components/dossiers_jsx/ANTONIOPUIGSA.jsx';
import ESufVBQlfEUlyewOAeur from './components/dossiers_jsx/CHANELPARFUMSBEAUTESAS.jsx';
import AEyUsyuJPdglBPvCZgIV from './components/dossiers_jsx/SEPHORASAS.jsx';
import KKVZOTRvIpQZUrriHylm from './components/dossiers_jsx/TESTOK.jsx';
import WemIrfGdBWXlkcXqhaTg from './components/dossiers_jsx/24-47755.jsx';
import CgeDjAGvGpogTALbALAw from './components/dossiers_jsx/24-51188.jsx';
// Fin des imports des pages générées par LinksConverter.cjs

const Loading = () => <div>Chargement...</div>;

export default function App() {
    return (
        <I18nextProvider i18n={i18n}>
            <Suspense fallback={<Loading />}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        {/* Routes des pages générées par LinksConverter.cjs */}
						<Route path="/LFRuGXpnnlShCOzyFXOh" element={<LFRuGXpnnlShCOzyFXOh />} />
						<Route path="/ZJHAmNjqZGCZVKXXFwpd" element={<ZJHAmNjqZGCZVKXXFwpd />} />
						<Route path="/FAgCgTmKRCACTygESMnO" element={<FAgCgTmKRCACTygESMnO />} />
						<Route path="/YRSmdDeeZOEXRpqdbaKL" element={<YRSmdDeeZOEXRpqdbaKL />} />
						<Route path="/WxjHhzfbMqsJoxQULLFx" element={<WxjHhzfbMqsJoxQULLFx />} />
						<Route path="/FDvukSjnCyhIQrXQPsZn" element={<FDvukSjnCyhIQrXQPsZn />} />
						<Route path="/OafjYJYtuiBpZEAWGbih" element={<OafjYJYtuiBpZEAWGbih />} />
						<Route path="/EawcjaZakNOexgkzgfRV" element={<EawcjaZakNOexgkzgfRV />} />
						<Route path="/PogjWXgvYqyZAwgzfFDv" element={<PogjWXgvYqyZAwgzfFDv />} />
						<Route path="/ESufVBQlfEUlyewOAeur" element={<ESufVBQlfEUlyewOAeur />} />
						<Route path="/WemIrfGdBWXlkcXqhaTg" element={<WemIrfGdBWXlkcXqhaTg />} />
						<Route path="/CgeDjAGvGpogTALbALAw" element={<CgeDjAGvGpogTALbALAw />} />
						<Route path="/KKVZOTRvIpQZUrriHylm" element={<KKVZOTRvIpQZUrriHylm />} />
						<Route path="/AEyUsyuJPdglBPvCZgIV" element={<AEyUsyuJPdglBPvCZgIV />} />
                        {/* Fin des routes des pages générées par LinksConverter.cjs */}
                        <Route path="*" element={<PageErreur />} />
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </I18nextProvider>
    );
}
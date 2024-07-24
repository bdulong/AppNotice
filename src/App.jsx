import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import './App.css';

import Landing from './components/Landing/landing.jsx';
import PageErreur from './components/PageErreur/PageErreur.jsx';
// Import des pages générées par LinksConverter.cjs :
import PogjWXgvYqyZAwgzfFDv from './components/dossiers_jsx/ANTONIOPUIGSA.jsx';
import LFRuGXpnnlShCOzyFXOh from './components/dossiers_jsx/24-14800.jsx';
import YRSmdDeeZOEXRpqdbaKL from './components/dossiers_jsx/24-20661.jsx';
import NJbPDpDYHOAagsgZmWnT from './components/dossiers_jsx/24-21161.jsx';
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
						<Route path="/PogjWXgvYqyZAwgzfFDv" element={<PogjWXgvYqyZAwgzfFDv />} />
						<Route path="/LFRuGXpnnlShCOzyFXOh" element={<LFRuGXpnnlShCOzyFXOh />} />
						<Route path="/NJbPDpDYHOAagsgZmWnT" element={<NJbPDpDYHOAagsgZmWnT />} />
						<Route path="/YRSmdDeeZOEXRpqdbaKL" element={<YRSmdDeeZOEXRpqdbaKL />} />
                        {/* Fin des routes des pages générées par LinksConverter.cjs */}
                        <Route path="*" element={<PageErreur />} />
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </I18nextProvider>
    );
}
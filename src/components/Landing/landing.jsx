import '../../App.css'
import Header from '../Header/header.jsx'
import './landing.css'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Landing() {
  const { t } = useTranslation();
  return (
    <main>
      <Header />
      <h1>{t('Bienvenue')}</h1>
      <Link to="/AEyUsyuJPdglBPvCZgIV">SEPHORA</Link>
      <Link to="/PogjWXgvYqyZAwgzfFDv">ANTONIO</Link>
      <Link to="/ESufVBQlfEUlyewOAeur">CHANEL</Link>
    </main>
  )
}
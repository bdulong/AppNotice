import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import "../../App.css";
import "./CTALanguage.css";

export default function CTALanguage() {
  const { i18n } = useTranslation();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    console.log(`La langue est : ${currentLanguage}`);
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage, i18n]);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
    setIsDropdownVisible(false);
  };
  
  const languageData = {
    fr: {
      text: "Français",
      flag: (
        <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
          <rect width="8" height="16" fill="#0E20C2" />
          <rect x="8" width="8" height="16" fill="white" />
          <rect x="16" width="8" height="16" fill="#FF0000" />
        </svg>
      ),
    },
    en: {
      text: "English",
      flag: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 30" width="24" height="16">
          <clipPath id="t">
            <path d="M25,15h25v15zv15h-25zh-25v-15zv-15h25z" />
          </clipPath>
          <path d="M0,0v30h50v-30z" fill="#012169" />
          <path d="M0,0 50,30M50,0 0,30" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 50,30M50,0 0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
          <path d="M-1 11h22v-12h8v12h22v8h-22v12h-8v-12h-22z" fill="#C8102E" stroke="#FFF" strokeWidth="2" />
        </svg>
      ),
    },
  };

  return (
    <div className="CTA-language__container">
      <button className="CTA-language__menu" onClick={toggleDropdown}>
        <div className="language__text-flag">
        {languageData[currentLanguage]?.flag}
        {languageData[currentLanguage]?.text}
        </div>
        <svg
          className={`chevron ${isDropdownVisible ? "chevron-rotate" : ""}`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path d="M3.115 4L10 11.4232L16.885 4L19 6.2965L10 16L1 6.2965L3.115 4Z" fill="black" />
        </svg>
      </button>
      {isDropdownVisible && (
        <div className="dropdown-menu">
          <button
            className="CTA-language"
            onClick={() => changeLanguage(currentLanguage === "fr" ? "en" : "fr")}
          >
            <div className="language__text-flag">
              {languageData[currentLanguage === "fr" ? "en" : "fr"].flag}
              {languageData[currentLanguage === "fr" ? "en" : "fr"].text}
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
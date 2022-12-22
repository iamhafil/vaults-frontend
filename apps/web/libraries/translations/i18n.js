import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { TRANSLATIONS_ARAB } from "./arab/translations";
import { TRANSLATIONS_EN } from "./en/translations";
import { getCookie } from "../cookie";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: TRANSLATIONS_EN },
      ar: { translation: TRANSLATIONS_ARAB }
    }
  });
if (typeof window !== 'undefined') {
  // Perform localStorage action
  i18n.changeLanguage(getCookie("userLang") ? getCookie("userLang") : "en");
}

export const getByLang = (obj) => {
  if (typeof window !== 'undefined') {
    let locale = getCookie("userLang") ? getCookie("userLang") : "en"
    return obj?(obj[locale] ? obj[locale] : obj["en"] ? obj["en"] : ""):""
  }
  return obj?(obj["en"] ? obj["en"] : ""):""

}
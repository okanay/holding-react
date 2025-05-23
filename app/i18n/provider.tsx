import { useNavigate } from "@tanstack/react-router";
import Cookies from "js-cookie";
import React, { createContext, useCallback, useEffect, useState } from "react"; // prettier-ignore
import { I18nextProvider } from "react-i18next";
import { DEFAULT_LANGUAGE, I18N_COOKIE_NAME, I18N_COOKIE_OPTIONS, I18N_STORAGE_KEY, SUPPORTED_LANGUAGES } from "./config"; // prettier-ignore
import i18nConfig from "./index";

interface LanguageContextType {
  language: Language;
  isReady: boolean;
  changeLanguage: (lng: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

interface Props {
  children: React.ReactNode;
  serverLanguage?: Language;
}

export const LanguageProvider: React.FC<Props> = ({
  children,
  serverLanguage = DEFAULT_LANGUAGE,
}) => {
  const [isReady, setIsReady] = useState(false);
  const [language, setLanguage] = useState<Language>(serverLanguage);
  const navigate = useNavigate();

  const i18n = i18nConfig(serverLanguage);

  const changeLanguage = useCallback(
    (lng: Language) => {
      if (lng === language || !SUPPORTED_LANGUAGES.includes(lng)) return;

      // Cookie'ye dil tercihini kaydet
      Cookies.set(I18N_COOKIE_NAME, lng, I18N_COOKIE_OPTIONS);

      // LocalStorage'a dil tercihini kaydet
      if (typeof window !== "undefined") {
        localStorage.setItem(I18N_STORAGE_KEY, lng);

        // HTML lang attributeünü güncelle
        if (document && document.documentElement) {
          document.documentElement.lang = lng;
        }
      }

      // i18next dilini değiştir
      i18n.changeLanguage(lng).then(() => {
        setLanguage(lng);
      });
    },
    [language, i18n, navigate],
  );

  useEffect(() => {
    const handleReady = () => setIsReady(true);

    if (i18n.isInitialized) {
      setTimeout(handleReady, 0);
    } else {
      i18n.on("initialized", handleReady);
      i18n.on("loaded", handleReady);

      return () => {
        i18n.off("initialized", handleReady);
        i18n.off("loaded", handleReady);
      };
    }
  }, [i18n]);

  if (!isReady) return <>{null}</>;

  return (
    <LanguageContext.Provider
      value={{
        language,
        isReady,
        changeLanguage,
      }}
    >
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;

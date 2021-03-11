import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { en, es } from './languages';
import { authActions } from '../state/ducks/auth';

const configurei18n = (store) => {
    i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            fallbackLng: () => {
                const language = localStorage.getItem('i18nextLng')
                return language ? language.split('-')[0] : 'en'
            },
            ns: ['translations'],
            defaultNS: 'translations',
            debug: true,
            interpolation: {
                escapeValue: false,
            },
            resources: {
                es,
                en,
            },
        });
};

export default configurei18n;
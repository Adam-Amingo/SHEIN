
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import twi from '../locales/twi.json';
import ga from '../locales/ga.json';
import ewe from '../locales/ewe.json';

const resources = {
    en: { translation: en },
    twi: { translation: twi },
    ga: { translation: ga },
    ewe: { translation: ewe },
};

i18n
    .use(initReactI18next)
    .init({
        lng: 'ga', // manually set to test Twi
        fallbackLng: 'twi',
        resources,
        compatibilityJSON: 'v3',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;

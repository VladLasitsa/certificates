import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";

i18n
    .use(XHR)
    .use(LanguageDetector)
    .init({
        debug: true,
        lng: "en",
        fallbackLng: "en", // use en if detected lng is not available

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        },

        resources: {
            en: {
                translation: {
                    "login": "Looooogin"
                }
            },
            ru: {
                translation: {
                    "login": "Логин"
                }
            }
        },
        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations"
    });

export default i18n;
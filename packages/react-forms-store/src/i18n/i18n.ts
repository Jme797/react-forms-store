import i18n from 'i18next';

import {TranslationStrings} from './translation';

export const initI18n = (
    externalTranslations: Record<string, TranslationStrings> = {}
) => {
    return i18n.init({
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        resources: {
            ...externalTranslations,
        },
    });
};

// Default initialization
void initI18n();

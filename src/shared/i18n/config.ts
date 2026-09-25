import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import ar from './locales/ar.json'
import en from './locales/en.json'

export const SUPPORTED_LANGUAGES = ['ar', 'en'] as const
export type Language = (typeof SUPPORTED_LANGUAGES)[number]
export const DEFAULT_LANGUAGE: Language = 'ar'

const RTL_LANGUAGES: readonly Language[] = ['ar']

export const getDirection = (lng: string): 'rtl' | 'ltr' =>
  RTL_LANGUAGES.includes(lng as Language) ? 'rtl' : 'ltr'

/** Keep <html lang/dir> in sync with the active language. */
function syncDocument(lng: string) {
  document.documentElement.lang = lng
  document.documentElement.dir = getDirection(lng)
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { ar: { translation: ar }, en: { translation: en } },
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    nonExplicitSupportedLngs: true,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'lang',
    },
  })

i18n.on('languageChanged', syncDocument)
syncDocument(i18n.resolvedLanguage ?? DEFAULT_LANGUAGE)

export default i18n

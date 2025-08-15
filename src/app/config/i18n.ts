import en from '../../shared/locales/en'
import ru from '../../shared/locales/ru'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const resources = { en: { translation: en }, ru: { translation: ru } } as const

export function initI18n(initialLng: 'en'|'ru' = (localStorage.getItem('lng') as any) || 'ru') {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: initialLng,
      fallbackLng: 'en',
      interpolation: { escapeValue: false }
    })
  return i18n
}

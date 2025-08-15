import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { initI18n } from '../../config/i18n'

type Props = { children: React.ReactNode }
const i18n = initI18n()

export function I18nProvider({ children }: Props) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

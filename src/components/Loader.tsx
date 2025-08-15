import React from 'react'
import { useAppTranslation } from '../app/providers/i18n/useAppTranslation'
export default function Loader() {
  const { t } = useAppTranslation()
  return <div className="badge">{t("actions.loading")}</div>
}

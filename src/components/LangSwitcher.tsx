import React from 'react'
import { useTranslation } from 'react-i18next'

export default function LangSwitcher() {
  const { i18n } = useTranslation()
  const init = (typeof localStorage !== 'undefined' && localStorage.getItem('lng')) || i18n.language || 'en'
  const [lng, setLng] = React.useState(init)
  const change = (v: string) => { i18n.changeLanguage(v); setLng(v); try{localStorage.setItem('lng', v)}catch{}}
  return (
    <select value={lng} onChange={e => change(e.target.value)}>
      <option value="en">EN</option>
      <option value="ru">RU</option>
    </select>
  )
}

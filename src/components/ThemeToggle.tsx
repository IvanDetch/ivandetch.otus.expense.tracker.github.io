import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ThemeToggle() {
  const { t } = useTranslation()
  const [theme, setTheme] = React.useState<string>(() => localStorage.getItem('theme') || 'dark')
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])
  return (
    <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? `🌙 ${t('actions.dark')}` : `☀️ ${t('actions.light')}`}
    </button>
  )
}

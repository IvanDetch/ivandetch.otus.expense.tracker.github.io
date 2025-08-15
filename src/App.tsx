import React from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ProfilePage from './pages/profile/ProfilePage'
import OperationsPage from './pages/operations/OperationsPage'
import CategoriesPage from './pages/categories/CategoriesPage'
import { useAppSelector } from './store/hooks'
import ThemeToggle from './components/ThemeToggle'
import { useTranslation } from 'react-i18next'
import LangSwitcher from './components/LangSwitcher'
import './app.scss'

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = useAppSelector(s => s.auth.token)
  return token ? children : <Navigate to="/login" replace />
}

export default function App() {
  const { t } = useTranslation()
  return (
    <div className="app">
      <header className="app__header">
        <nav>
          <Link to="/operations">{t('nav.operations')}</Link>
          <Link to="/categories">{t('nav.categories')}</Link>
          <Link to="/profile">{t('nav.profile')}</Link>
        </nav>
        <div className="spacer" />
        <div className="wrapper-lang-theme">
          <LangSwitcher />
          <ThemeToggle />
        </div>
      </header>
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Navigate to="/operations" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/operations" element={<ProtectedRoute><OperationsPage/></ProtectedRoute>} />
          <Route path="/categories" element={<ProtectedRoute><CategoriesPage/></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>} />
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </main>
    </div>
  )
}

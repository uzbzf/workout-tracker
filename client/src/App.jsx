import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'

import Header from './components/Header/Header'
import Dashboard from './pages/Dashboard/Dashboard'
import History from './pages/History/History'
import Analytics from './pages/Analytics/Analytics'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

import './styles/global.css'
import styles from './App.module.css'

/* Компонент для защиты маршрутов */
const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth()
  
  if (isLoading) {
    return <div className={styles.loading}>Загрузка...</div>
  }
  
  return user ? children : <Navigate to="/login" replace />
}

/* Компонент Layout для авторизованных страниц */
const AppLayout = ({ children }) => {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Публичные маршруты (Авторизация) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Защищённые маршруты */}
            <Route path="/" element={
              <ProtectedRoute>
                <AppLayout><Dashboard /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/history" element={
              <ProtectedRoute>
                <AppLayout><History /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <AppLayout><Analytics /></AppLayout>
              </ProtectedRoute>
            } />

            {/* Перенаправление на главную для неизвестных маршрутов */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

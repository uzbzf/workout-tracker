import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import styles from './Header.module.css'

function Header() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  /* Проверяем активный маршрут для подсветки */
  const isActive = (path) => location.pathname === path ? styles.active : ''

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">🏋️ Workout Tracker</Link>
      </div>

      {user && (
        <nav className={styles.nav}>
          <Link to="/" className={isActive('/')}>Главная</Link>
          <Link to="/history" className={isActive('/history')}>История</Link>
          <Link to="/analytics" className={isActive('/analytics')}>Прогресс</Link>
        </nav>
      )}

      <div className={styles.actions}>
        {user && (
          <button onClick={toggleTheme} className={styles.iconButton} title="Сменить тему">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        )}
        {user && (
          <button onClick={handleLogout} className={styles.logoutButton}>
            Выйти ({user.name})
          </button>
        )}
      </div>
    </header>
  )
}

export default Header

import { createContext, useState, useEffect, useContext } from 'react'
import { post, get } from '../services/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  /* При загрузке приложения проверяем, есть ли сохранённый пользователь */
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      const savedUser = localStorage.getItem('user')

      if (token && savedUser) {
        try {
          /* Проверяем валидность токена на сервере */
          const userData = await get('/auth/me')
          setUser(userData)
          localStorage.setItem('user', JSON.stringify(userData))
        } catch (error) {
          /* Если токен невалиден, очищаем данные */
          localStorage.removeItem('token')
          localStorage.removeItem('user')
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email, password) => {
    const response = await post('/auth/login', { email, password })
    localStorage.setItem('token', response.token)
    localStorage.setItem('user', JSON.stringify(response.user))
    setUser(response.user)
    return response.user
  }

  const register = async (name, email, password) => {
    const response = await post('/auth/register', { name, email, password })
    localStorage.setItem('token', response.token)
    localStorage.setItem('user', JSON.stringify(response.user))
    setUser(response.user)
    return response.user
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

/* Хук для удобного использования контекста */
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider')
  }
  return context
}

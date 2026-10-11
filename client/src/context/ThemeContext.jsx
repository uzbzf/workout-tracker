import { createContext, useState, useEffect, useContext } from 'react'

const ThemeContext = createContext(null)

export const ThemeProvider = ({ children }) => {
  /* Получаем тему из localStorage или используем 'light' по умолчанию */
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  /* При изменении темы обновляем атрибут data-theme и localStorage */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  /* Функция переключения темы */
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

/* Хук для удобного использования */
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme должен использоваться внутри ThemeProvider')
  return context
}

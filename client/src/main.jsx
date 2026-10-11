import React from 'react'
import ReactDOM from 'react-dom/client'

/* Подключаем глобальные стили: сброс и CSS-переменные */
import './styles/global.css'

/* Корневой компонент приложения (пока стандартный от Vite) */
import App from './App'

/* Точка монтирования React-приложения в DOM */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

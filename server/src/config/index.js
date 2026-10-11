const path = require('path');

/* Конфигурация сервера */
const config = {
  /* Порт, на котором будет запущен сервер (по умолчанию 3001) */
  port: process.env.PORT || 3001,
  
  /* Настройки CORS для разрешения запросов с фронтенда (Vite по умолчанию на 5173) */
  corsOptions: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },

  /* Путь к файлу базы данных SQLite */
  dbPath: path.join(__dirname, '../../data/workout-tracker.db'),
  
  /* Путь к SQL-скрипту инициализации схемы базы данных */
  schemaPath: path.join(__dirname, '../db/schema.sql'),

  /* ===== Настройки авторизации ===== */
  
  /* Секретный ключ для подписи JWT-токенов.
     В production обязательно задавать через переменную окружения! */
  jwtSecret: process.env.JWT_SECRET || 'workout-tracker-dev-secret-key-change-in-production',
  
  /* Время жизни JWT-токена (по умолчанию 7 дней) */
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
};

module.exports = config;

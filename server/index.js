const app = require('./src/app');
const config = require('./src/config');
const { initDb } = require('./src/db/connection');

/* Асинхронная функция для запуска сервера */
const startServer = async () => {
  try {
    /* Сначала инициализируем базу данных */
    await initDb();
    console.log('[DB] База данных успешно инициализирована.');

    /* Запускаем Express-сервер */
    app.listen(config.port, () => {
      console.log(`[SERVER] Сервер запущен и слушает порт ${config.port}`);
      console.log(`[SERVER] API доступно по адресу: http://localhost:${config.port}/api/v1`);
      console.log(`[SERVER] Проверка здоровья: http://localhost:${config.port}/health`);
    });
  } catch (error) {
    console.error('[SERVER] Критическая ошибка при запуске сервера:', error);
    /* Завершаем процесс с кодом ошибки, если БД не подключилась */
    process.exit(1); 
  }
};

/* Запускаем сервер */
startServer();

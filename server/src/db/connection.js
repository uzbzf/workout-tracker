const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');
const config = require('../config');

/* Убеждаемся, что папка для базы данных существует */
const dbDir = path.dirname(config.dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

let db;

/* Инициализация базы данных */
const initDb = async () => {
  try {
    const SQL = await initSqlJs();
    
    /* Проверяем, существует ли файл БД. Если да — читаем его, иначе создаём новый */
    if (fs.existsSync(config.dbPath)) {
      const fileBuffer = fs.readFileSync(config.dbPath);
      db = new SQL.Database(fileBuffer);
    } else {
      db = new SQL.Database();
    }

    /* Читаем SQL-скрипт схемы и выполняем его */
    const schemaSql = fs.readFileSync(config.schemaPath, 'utf-8');
    db.run(schemaSql);

    /* Сохраняем изменения на диск */
    saveDb();

    console.log('[DB] База данных успешно подключена: ' + config.dbPath);
  } catch (error) {
    console.error('[DB] Ошибка инициализации базы данных:', error);
    process.exit(1);
  }
};

/* Функция для сохранения состояния БД в файл */
const saveDb = () => {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(config.dbPath, buffer);
  }
};

/* Экспортируем промис, который разрешается объектом БД, и функцию сохранения */
module.exports = {
  getDb: async () => {
    if (!db) {
      await initDb();
    }
    return db;
  },
  saveDb,
  initDb
};

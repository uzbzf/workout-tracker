const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { getDb, saveDb } = require('../db/connection');
const config = require('../config');

/* ===== Вспомогательные функции для sql.js ===== */

/**
 * Выполняет INSERT/UPDATE/DELETE-запрос с параметрами
 */
const runQuery = (db, sql, params = []) => {
  const stmt = db.prepare(sql);
  if (params.length > 0) stmt.bind(params);
  stmt.step();
  stmt.free();
};

/**
 * Возвращает одну строку результата SELECT-запроса или null
 */
const getRow = (db, sql, params = []) => {
  const stmt = db.prepare(sql);
  if (params.length > 0) stmt.bind(params);
  
  let result = null;
  if (stmt.step()) {
    result = stmt.getAsObject();
  }
  stmt.free();
  return result;
};

/* ===== Публичные методы сервиса ===== */

/**
 * Регистрирует нового пользователя
 * @param {Object} data - { email, password, name }
 * @returns {Object} - { user, token }
 */
const register = async (data) => {
  const db = await getDb();
  
  /* Проверяем, не занят ли email */
  const existing = getRow(db, 'SELECT id FROM users WHERE email = ?', [data.email]);
  if (existing) {
    const error = new Error('Пользователь с таким email уже существует');
    error.statusCode = 409; // Conflict
    throw error;
  }

  /* Хэшируем пароль (10 раундов — оптимальный баланс безопасности и скорости) */
  const passwordHash = await bcrypt.hash(data.password, 10);
  
  const id = uuidv4();
  const now = new Date().toISOString();

  /* Вставляем нового пользователя */
  runQuery(
    db,
    'INSERT INTO users (id, email, password_hash, name, created_at) VALUES (?, ?, ?, ?, ?)',
    [id, data.email, passwordHash, data.name, now]
  );
  saveDb();

  /* Получаем созданного пользователя (без хэша пароля) */
  const user = getRow(db, 'SELECT id, email, name, created_at FROM users WHERE id = ?', [id]);

  /* Генерируем JWT-токен */
  const token = generateToken(user);

  return { user, token };
};

/**
 * Авторизует пользователя по email и паролю
 * @param {Object} data - { email, password }
 * @returns {Object} - { user, token }
 */
const login = async (data) => {
  const db = await getDb();
  
  /* Ищем пользователя по email */
  const user = getRow(db, 'SELECT * FROM users WHERE email = ?', [data.email]);
  
  if (!user) {
    const error = new Error('Неверный email или пароль');
    error.statusCode = 401;
    throw error;
  }

  /* Сравниваем введённый пароль с хэшем в БД */
  const isPasswordValid = await bcrypt.compare(data.password, user.password_hash);
  if (!isPasswordValid) {
    const error = new Error('Неверный email или пароль');
    error.statusCode = 401;
    throw error;
  }

  /* Возвращаем пользователя без хэша пароля */
  const userWithoutPassword = {
    id: user.id,
    email: user.email,
    name: user.name,
    created_at: user.created_at,
  };

  /* Генерируем JWT-токен */
  const token = generateToken(userWithoutPassword);

  return { user: userWithoutPassword, token };
};

/**
 * Получает пользователя по ID (для эндпоинта /me)
 * @param {string} userId - ID пользователя
 * @returns {Object|null}
 */
const getUserById = async (userId) => {
  const db = await getDb();
  return getRow(db, 'SELECT id, email, name, created_at FROM users WHERE id = ?', [userId]);
};

/* ===== Приватные функции ===== */

/**
 * Генерирует JWT-токен для пользователя
 * @param {Object} user - объект пользователя (id, email, name)
 * @returns {string} - подписанный токен
 */
const generateToken = (user) => {
  const payload = {
    userId: user.id,
    email: user.email,
  };
  
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

module.exports = {
  register,
  login,
  getUserById,
};

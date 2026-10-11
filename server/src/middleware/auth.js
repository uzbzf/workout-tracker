const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Middleware для проверки JWT-токена.
 * Извлекает токен из заголовка Authorization (формат: "Bearer <token>"),
 * проверяет его валидность и пробрасывает userId и userEmail в req.
 */
const auth = (req, res, next) => {
  try {
    /* Получаем токен из заголовка Authorization */
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const error = new Error('Токен авторизации не предоставлен');
      error.statusCode = 401;
      return next(error);
    }

    /* Извлекаем сам токен (убираем префикс "Bearer ") */
    const token = authHeader.split(' ')[1];

    /* Проверяем и декодируем токен */
    const decoded = jwt.verify(token, config.jwtSecret);

    /* Пробрасываем данные пользователя в запрос */
    req.userId = decoded.userId;
    req.userEmail = decoded.email;

    next();
  } catch (error) {
    /* Если токен истёк или невалиден */
    if (error.name === 'TokenExpiredError') {
      const err = new Error('Срок действия токена истёк');
      err.statusCode = 401;
      return next(err);
    }
    
    if (error.name === 'JsonWebTokenError') {
      const err = new Error('Невалидный токен авторизации');
      err.statusCode = 401;
      return next(err);
    }

    /* Любые другие ошибки */
    const err = new Error('Ошибка авторизации');
    err.statusCode = 401;
    next(err);
  }
};

module.exports = auth;

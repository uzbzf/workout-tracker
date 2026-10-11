/* Централизованный обработчик ошибок для Express */
const errorHandler = (err, req, res, next) => {
  /* Логируем ошибку в консоль сервера для отладки */
  console.error('[ERROR]', err.message || err);

  /* Определяем HTTP-статус: используем свойство statusCode из ошибки или 500 по умолчанию */
  const statusCode = err.statusCode || 500;
  
  /* Сообщение об ошибке */
  const message = err.message || 'Внутренняя ошибка сервера';

  /* Отправляем клиенту структурированный ответ */
  res.status(statusCode).json({
    error: {
      code: statusCode,
      message: message,
    },
  });
};

module.exports = errorHandler;

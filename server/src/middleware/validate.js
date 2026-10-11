/**
 * Универсальный middleware для проверки обязательных полей в теле запроса.
 * @param {string[]} requiredFields - Массив названий обязательных полей
 * @returns {Function} Express middleware
 */
const validate = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = [];

    requiredFields.forEach((field) => {
      const value = req.body[field];
      
      /* Проверяем, что поле существует и не является пустой строкой.
         Значение 0 (ноль) при этом считается валидным. */
      if (value === undefined || value === null || value === '') {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      const error = new Error(`Не заполнены обязательные поля: ${missingFields.join(', ')}`);
      error.statusCode = 400; // Bad Request
      return next(error); // Передаём ошибку в errorHandler
    }

    next();
  };
};

module.exports = validate;

const authService = require('../services/authService');

/**
 * Регистрация нового пользователя
 * POST /api/v1/auth/register
 */
const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    
    const result = await authService.register({ email, password, name });
    
    res.status(201).json({
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Авторизация пользователя
 * POST /api/v1/auth/login
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const result = await authService.login({ email, password });
    
    res.status(200).json({
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Получение данных текущего пользователя
 * GET /api/v1/auth/me
 */
const getMe = async (req, res, next) => {
  try {
    const user = await authService.getUserById(req.userId);
    
    if (!user) {
      const error = new Error('Пользователь не найден');
      error.statusCode = 404;
      return next(error);
    }
    
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
};

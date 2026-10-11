const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');

/* Регистрация: проверяем email, пароль и имя */
router.post('/register', validate(['email', 'password', 'name']), authController.register);

/* Вход: проверяем email и пароль */
router.post('/login', validate(['email', 'password']), authController.login);

/* Получение текущего пользователя (только для авторизованных) */
router.get('/me', auth, authController.getMe);

module.exports = router;

const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');
const validate = require('../middleware/validate');

/**
 * Получить список всех упражнений
 */
router.get('/', exerciseController.getAll);

/**
 * Получить одно упражнение по ID
 */
router.get('/:id', exerciseController.getById);

/**
 * Создать новое упражнение в справочнике
 * Проверяем наличие обязательного поля name
 */
router.post('/', validate(['name']), exerciseController.create);

/**
 * Обновить существующее упражнение
 * Также проверяем обязательное поле name
 */
router.put('/:id', validate(['name']), exerciseController.update);

/**
 * Удалить упражнение по ID
 */
router.delete('/:id', exerciseController.remove);

module.exports = router;

const exerciseService = require('../services/exerciseService');

/**
 * Получить список всех упражнений
 * GET /api/v1/exercises
 */
const getAll = async (req, res, next) => {
  try {
    const exercises = await exerciseService.getAllExercises();
    res.status(200).json(exercises);
  } catch (error) {
    next(error);
  }
};

/**
 * Получить одно упражнение по ID
 * GET /api/v1/exercises/:id
 */
const getById = async (req, res, next) => {
  try {
    const exercise = await exerciseService.getExerciseById(req.params.id);
    
    if (!exercise) {
      const error = new Error('Упражнение не найдено');
      error.statusCode = 404;
      return next(error);
    }
    
    res.status(200).json(exercise);
  } catch (error) {
    next(error);
  }
};

/**
 * Создать новое упражнение в справочнике
 * POST /api/v1/exercises
 */
const create = async (req, res, next) => {
  try {
    const newExercise = await exerciseService.createExercise(req.body);
    res.status(201).json(newExercise);
  } catch (error) {
    next(error);
  }
};

/**
 * Обновить существующее упражнение
 * PUT /api/v1/exercises/:id
 */
const update = async (req, res, next) => {
  try {
    const updatedExercise = await exerciseService.updateExercise(req.params.id, req.body);
    
    if (!updatedExercise) {
      const error = new Error('Упражнение не найдено');
      error.statusCode = 404;
      return next(error);
    }
    
    res.status(200).json(updatedExercise);
  } catch (error) {
    next(error);
  }
};

/**
 * Удалить упражнение
 * DELETE /api/v1/exercises/:id
 */
const remove = async (req, res, next) => {
  try {
    const isDeleted = await exerciseService.deleteExercise(req.params.id);
    
    if (!isDeleted) {
      const error = new Error('Упражнение не найдено');
      error.statusCode = 404;
      return next(error);
    }
    
    res.status(200).json({ message: 'Упражнение успешно удалено' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

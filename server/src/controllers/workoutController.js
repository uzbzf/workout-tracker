const workoutService = require('../services/workoutService');

const getAll = async (req, res, next) => {
  try {
    const workouts = await workoutService.getAllWorkouts(req.userId, req.query);
    res.status(200).json(workouts);
  } catch (error) { next(error); }
};

const getById = async (req, res, next) => {
  try {
    const workout = await workoutService.getWorkoutById(req.userId, req.params.id);
    if (!workout) { const error = new Error('Тренировка не найдена'); error.statusCode = 404; return next(error); }
    res.status(200).json(workout);
  } catch (error) { next(error); }
};

const create = async (req, res, next) => {
  try {
    const newWorkout = await workoutService.createWorkout(req.userId, req.body);
    res.status(201).json(newWorkout);
  } catch (error) { next(error); }
};

const update = async (req, res, next) => {
  try {
    const updatedWorkout = await workoutService.updateWorkout(req.userId, req.params.id, req.body);
    if (!updatedWorkout) { const error = new Error('Тренировка не найдена'); error.statusCode = 404; return next(error); }
    res.status(200).json(updatedWorkout);
  } catch (error) { next(error); }
};

const remove = async (req, res, next) => {
  try {
    const isDeleted = await workoutService.deleteWorkout(req.userId, req.params.id);
    if (!isDeleted) { const error = new Error('Тренировка не найдена'); error.statusCode = 404; return next(error); }
    res.status(200).json({ message: 'Тренировка успешно удалена' });
  } catch (error) { next(error); }
};

module.exports = { getAll, getById, create, update, remove };

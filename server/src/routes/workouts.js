const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');

/* Применяем auth middleware ко всем роутам в этом файле */
router.use(auth);

router.get('/', workoutController.getAll);
router.get('/:id', workoutController.getById);
router.post('/', validate(['workout_type', 'exercise', 'date']), workoutController.create);
router.put('/:id', validate(['workout_type', 'exercise', 'date']), workoutController.update);
router.delete('/:id', workoutController.remove);

module.exports = router;

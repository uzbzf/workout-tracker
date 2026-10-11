/* ===== Типы тренировок ===== */
const WORKOUT_TYPES = [
  { id: 'strength', label: 'Силовая' },
  { id: 'cardio', label: 'Кардио' },
  { id: 'flexibility', label: 'Растяжка' },
  { id: 'mixed', label: 'Смешанная' },
];

/* ===== Группы мышц ===== */
const MUSCLE_GROUPS = [
  { id: 'chest', label: 'Грудь' },
  { id: 'back', label: 'Спина' },
  { id: 'legs', label: 'Ноги' },
  { id: 'arms', label: 'Руки' },
  { id: 'shoulders', label: 'Плечи' },
  { id: 'core', label: 'Пресс' },
  { id: 'full_body', label: 'Всё тело' },
  { id: 'cardio', label: 'Кардио' },
];

/* ===== Вспомогательные функции ===== */

/**
 * Проверяет, является ли переданное значение допустимым типом тренировки
 * @param {string} type - значение для проверки
 * @returns {boolean} - true, если тип допустим
 */
const isValidWorkoutType = (type) => {
  return WORKOUT_TYPES.some((t) => t.id === type);
};

/**
 * Проверяет, является ли переданное значение допустимой группой мышц
 * @param {string} group - значение для проверки
 * @returns {boolean} - true, если группа допустима
 */
const isValidMuscleGroup = (group) => {
  return MUSCLE_GROUPS.some((g) => g.id === group);
};

/**
 * Возвращает объект типа тренировки по его id
 * @param {string} typeId - идентификатор типа
 * @returns {Object|undefined} - объект типа или undefined
 */
const getWorkoutTypeById = (typeId) => {
  return WORKOUT_TYPES.find((t) => t.id === typeId);
};

module.exports = {
  WORKOUT_TYPES,
  MUSCLE_GROUPS,
  isValidWorkoutType,
  isValidMuscleGroup,
  getWorkoutTypeById,
};

import { get } from './api'

/* ===== Общая статистика ===== */

/**
 * Возвращает общую статистику по всем тренировкам пользователя
 * @returns {Object} - объект с полями: totalWorkouts, totalTime, totalWeight, avgDuration
 */
export const getSummaryStats = async () => {
  const data = await get('/summary')
  return data || {
    totalWorkouts: 0,
    totalTime: 0,
    totalWeight: 0,
    avgDuration: 0,
  }
}

/* ===== Данные для графика прогресса ===== */

/**
 * Возвращает данные для линейного графика прогресса веса по датам
 * @param {string} [exercise] - название упражнения (опционально, для фильтрации)
 * @returns {Array} - массив объектов { date, weight, reps } для графика
 */
export const getProgressData = async (exercise = null) => {
  const params = {}
  if (exercise) {
    params.exercise = exercise
  }
  
  const data = await get('/summary/progress', params)
  return Array.isArray(data) ? data : []
}

/* ===== Данные для графика активности ===== */

/**
 * Возвращает данные для столбчатого графика активности по неделям или месяцам
 * @param {string} [period] - 'week' или 'month' (по умолчанию 'week')
 * @param {number} [count] - количество периодов (по умолчанию 8)
 * @returns {Array} - массив объектов { period, count } для графика
 */
export const getActivityData = async (period = 'week', count = 8) => {
  const params = {
    period,
    count,
  }
  
  const data = await get('/summary/activity', params)
  return Array.isArray(data) ? data : []
}

/* ===== Статистика по типам тренировок ===== */

/**
 * Возвращает количество тренировок по типам
 * @returns {Object} - объект с количеством тренировок каждого типа
 */
export const getWorkoutsByType = async () => {
  // Этот эндпоинт можно добавить на бэкенде позже, пока возвращаем заглушку
  // const data = await get('/summary/by-type')
  return {
    strength: 0,
    cardio: 0,
    flexibility: 0,
    mixed: 0,
    other: 0,
  }
}

/* ===== Топ упражнений ===== */

/**
 * Возвращает топ-N самых частых упражнений
 * @param {number} [limit] - количество упражнений (по умолчанию 5)
 * @returns {Array} - массив объектов { exercise, count }
 */
export const getTopExercises = async (limit = 5) => {
  // Этот эндпоинт можно добавить на бэкенде позже, пока возвращаем заглушку
  // const data = await get('/summary/top-exercises', { limit })
  return []
}

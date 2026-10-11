import { get, post, put, del } from './api'

/**
 * Маппинг полей из формата backend (snake_case) в формат frontend (camelCase)
 */
const mapWorkoutFromApi = (workout) => {
  if (!workout) return null
  return {
    id: workout.id,
    workoutType: workout.workout_type,
    exercise: workout.exercise,
    weight: workout.weight,
    reps: workout.reps,
    duration: workout.duration,
    date: workout.date,
    comment: workout.comment,
    createdAt: workout.created_at,
    updatedAt: workout.updated_at,
  }
}

/**
 * Маппинг полей из формата frontend в формат backend
 */
const mapWorkoutToApi = (workout) => {
  if (!workout) return null
  return {
    workout_type: workout.workoutType,
    exercise: workout.exercise,
    weight: workout.weight !== undefined ? Number(workout.weight) : null,
    reps: workout.reps !== undefined ? Number(workout.reps) : null,
    duration: workout.duration !== undefined ? Number(workout.duration) : null,
    date: workout.date,
    comment: workout.comment || null,
  }
}

/* ===== Получение всех тренировок (с фильтрацией) ===== */

/**
 * Возвращает список тренировок, отсортированный по дате (новые первыми).
 * Поддерживает фильтры: workoutType, dateFrom, dateTo, limit, offset
 */
export const getWorkouts = async (filters = {}) => {
  const params = {}
  if (filters.workoutType) params.workoutType = filters.workoutType
  if (filters.dateFrom) params.dateFrom = filters.dateFrom
  if (filters.dateTo) params.dateTo = filters.dateTo
  if (filters.limit) params.limit = filters.limit
  if (filters.offset) params.offset = filters.offset

  const data = await get('/workouts', params)
  return Array.isArray(data) ? data.map(mapWorkoutFromApi) : []
}

/* ===== Получение одной тренировки по ID ===== */

/**
 * Возвращает тренировку по её ID или null, если не найдена
 */
export const getWorkoutById = async (id) => {
  if (!id) return null
  try {
    const data = await get(`/workouts/${id}`)
    return mapWorkoutFromApi(data)
  } catch (error) {
    if (error.statusCode === 404) return null
    throw error
  }
}

/* ===== Добавление новой тренировки ===== */

/**
 * Создаёт новую тренировку на сервере и возвращает её с присвоенным ID
 */
export const addWorkout = async (data) => {
  if (!data) return null
  const payload = mapWorkoutToApi(data)
  const created = await post('/workouts', payload)
  return mapWorkoutFromApi(created)
}

/* ===== Обновление тренировки ===== */

/**
 * Обновляет существующую тренировку по ID
 */
export const updateWorkout = async (id, data) => {
  if (!id || !data) return null
  const payload = mapWorkoutToApi(data)
  const updated = await put(`/workouts/${id}`, payload)
  return mapWorkoutFromApi(updated)
}

/* ===== Удаление тренировки ===== */

/**
 * Удаляет тренировку по ID. Возвращает true при успехе.
 */
export const deleteWorkout = async (id) => {
  if (!id) return false
  await del(`/workouts/${id}`)
  return true
}

/* ===== Получение последних N тренировок ===== */

/**
 * Возвращает N последних тренировок (по умолчанию 5)
 */
export const getRecentWorkouts = async (limit = 5) => {
  const workouts = await getWorkouts({ limit })
  return workouts.slice(0, limit)
}

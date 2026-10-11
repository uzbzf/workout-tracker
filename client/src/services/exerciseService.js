import { get, post, put, del } from './api'

/**
 * Маппинг полей из формата backend (snake_case) в формат frontend (camelCase)
 */
const mapExerciseFromApi = (exercise) => {
  if (!exercise) return null
  return {
    id: exercise.id,
    name: exercise.name,
    isCustom: Boolean(exercise.is_custom), // В SQLite хранится как 0 или 1
    createdAt: exercise.created_at,
  }
}

/**
 * Маппинг полей из формата frontend в формат backend
 */
const mapExerciseToApi = (exercise) => {
  if (!exercise) return null
  return {
    name: exercise.name,
    is_custom: exercise.isCustom ? 1 : 0,
  }
}

/* ===== Получение всех упражнений ===== */

/**
 * Возвращает список всех упражнений из справочника
 */
export const getAllExercises = async () => {
  const data = await get('/exercises')
  return Array.isArray(data) ? data.map(mapExerciseFromApi) : []
}

/* ===== Получение одного упражнения по ID ===== */

/**
 * Возвращает упражнение по его ID или null, если не найдено
 */
export const getExerciseById = async (id) => {
  if (!id) return null
  try {
    const data = await get(`/exercises/${id}`)
    return mapExerciseFromApi(data)
  } catch (error) {
    if (error.statusCode === 404) return null
    throw error
  }
}

/* ===== Добавление нового упражнения ===== */

/**
 * Создаёт новое упражнение в справочнике
 */
export const createExercise = async (data) => {
  if (!data) return null
  const payload = mapExerciseToApi(data)
  const created = await post('/exercises', payload)
  return mapExerciseFromApi(created)
}

/* ===== Обновление упражнения ===== */

/**
 * Обновляет существующее упражнение по ID
 */
export const updateExercise = async (id, data) => {
  if (!id || !data) return null
  const payload = mapExerciseToApi(data)
  const updated = await put(`/exercises/${id}`, payload)
  return mapExerciseFromApi(updated)
}

/* ===== Удаление упражнения ===== */

/**
 * Удаляет упражнение по ID. Возвращает true при успехе.
 */
export const deleteExercise = async (id) => {
  if (!id) return false
  await del(`/exercises/${id}`)
  return true
}

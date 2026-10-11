/* ===== Ключи для localStorage ===== */
export const STORAGE_KEYS = {
  WORKOUTS: 'workout_tracker_workouts',
  EXERCISES: 'workout_tracker_exercises',
  SETTINGS: 'workout_tracker_settings',
}

/* ===== Проверка доступности localStorage ===== */
const isLocalStorageAvailable = () => {
  try {
    const testKey = '__test__'
    localStorage.setItem(testKey, 'test')
    localStorage.removeItem(testKey)
    return true
  } catch (e) {
    console.warn('localStorage недоступен:', e)
    return false
  }
}

/* ===== Базовые методы работы с localStorage ===== */

/**
 * Сохраняет данные в localStorage
 * @param {string} key - ключ
 * @param {any} data - данные (будут сериализованы в JSON)
 * @returns {boolean} - успех операции
 */
export const setItem = (key, data) => {
  if (!isLocalStorageAvailable()) return false
  
  try {
    const serialized = JSON.stringify(data)
    localStorage.setItem(key, serialized)
    return true
  } catch (e) {
    console.error('Ошибка при сохранении в localStorage:', e)
    return false
  }
}

/**
 * Получает данные из localStorage
 * @param {string} key - ключ
 * @param {any} defaultValue - значение по умолчанию, если ключ не найден
 * @returns {any} - десериализованные данные или defaultValue
 */
export const getItem = (key, defaultValue = null) => {
  if (!isLocalStorageAvailable()) return defaultValue
  
  try {
    const serialized = localStorage.getItem(key)
    if (serialized === null) return defaultValue
    return JSON.parse(serialized)
  } catch (e) {
    console.error('Ошибка при чтении из localStorage:', e)
    return defaultValue
  }
}

/**
 * Удаляет данные из localStorage
 * @param {string} key - ключ
 * @returns {boolean} - успех операции
 */
export const removeItem = (key) => {
  if (!isLocalStorageAvailable()) return false
  
  try {
    localStorage.removeItem(key)
    return true
  } catch (e) {
    console.error('Ошибка при удалении из localStorage:', e)
    return false
  }
}

/**
 * Очищает весь localStorage
 * @returns {boolean} - успех операции
 */
export const clear = () => {
  if (!isLocalStorageAvailable()) return false
  
  try {
    localStorage.clear()
    return true
  } catch (e) {
    console.error('Ошибка при очистке localStorage:', e)
    return false
  }
}

/* ===== Генератор UUID ===== */

/**
 * Генерирует уникальный идентификатор (UUID v4)
 * @returns {string} - уникальный ID
 */
export const generateUUID = () => {
  /* Используем crypto API, если доступен */
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  
  /* Fallback: ручная генерация UUID v4 */
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Генерирует короткий уникальный ID (для удобства отладки)
 * @returns {string} - короткий ID вида "w_abc123"
 */
export const generateShortId = () => {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `w_${timestamp}_${random}`
}
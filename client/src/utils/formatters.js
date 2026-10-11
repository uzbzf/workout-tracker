/* ===== Форматирование даты ===== */

/**
 * Форматирует дату в короткий формат: "12 окт 2026"
 */
export const formatDateShort = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Форматирует дату в полный формат: "12 октября 2026 г."
 */
export const formatDateFull = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Форматирует дату для оси графика: "12 окт"
 */
export const formatDateForChart = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
  })
}

/**
 * Возвращает относительное время: "сегодня", "вчера", "3 дня назад"
 */
export const formatRelativeDate = (dateString) => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = now - date
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'сегодня'
  if (diffDays === 1) return 'вчера'
  if (diffDays < 7) return `${diffDays} ${getDaysWord(diffDays)} назад`
  
  return formatDateShort(dateString)
}

/* Склонение слова "день" */
const getDaysWord = (days) => {
  const lastDigit = days % 10
  const lastTwoDigits = days % 100
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return 'дней'
  if (lastDigit === 1) return 'день'
  if (lastDigit >= 2 && lastDigit <= 4) return 'дня'
  return 'дней'
}

/* ===== Форматирование веса ===== */

/**
 * Форматирует вес с единицей измерения: "80 кг"
 */
export const formatWeight = (weight) => {
  if (weight === null || weight === undefined || weight === '') return ''
  return `${weight} кг`
}

/**
 * Форматирует вес с точностью до одного знака после запятой
 */
export const formatWeightPrecise = (weight) => {
  if (weight === null || weight === undefined || weight === '') return ''
  const num = Number(weight)
  return `${num % 1 === 0 ? num : num.toFixed(1)} кг`
}

/* ===== Форматирование времени/длительности ===== */

/**
 * Форматирует длительность в минутах: "45 мин" или "1 ч 30 мин"
 */
export const formatDuration = (minutes) => {
  if (!minutes || minutes === 0) return ''
  
  const num = Number(minutes)
  
  if (num < 60) {
    return `${num} мин`
  }
  
  const hours = Math.floor(num / 60)
  const remainingMinutes = num % 60
  
  if (remainingMinutes === 0) {
    return `${hours} ч`
  }
  
  return `${hours} ч ${remainingMinutes} мин`
}

/**
 * Форматирует длительность для графиков: "45м" или "1ч 30м"
 */
export const formatDurationShort = (minutes) => {
  if (!minutes || minutes === 0) return ''
  
  const num = Number(minutes)
  
  if (num < 60) {
    return `${num}м`
  }
  
  const hours = Math.floor(num / 60)
  const remainingMinutes = num % 60
  
  if (remainingMinutes === 0) {
    return `${hours}ч`
  }
  
  return `${hours}ч ${remainingMinutes}м`
}

/* ===== Форматирование чисел ===== */

/**
 * Форматирует большое число с разделителями тысяч: "1 234 567"
 */
export const formatNumber = (num) => {
  if (num === null || num === undefined) return ''
  return num.toLocaleString('ru-RU')
}

/**
 * Форматирует число с плюсом для положительных значений: "+5 кг"
 */
export const formatNumberWithSign = (num, unit = '') => {
  if (num === null || num === undefined) return ''
  const sign = num > 0 ? '+' : ''
  return `${sign}${num}${unit ? ' ' + unit : ''}`
}
const { v4: uuidv4 } = require('uuid');
const { getDb, saveDb } = require('../db/connection');

/* Вспомогательная функция: преобразует результат sql.js в массив объектов */
const mapRows = (result) => {
  if (!result || result.length === 0) return [];
  const columns = result[0].columns;
  return result[0].values.map((row) => {
    const obj = {};
    columns.forEach((col, index) => {
      obj[col] = row[index];
    });
    return obj;
  });
};

/**
 * Получает список всех упражнений, отсортированный по алфавиту
 */
const getAllExercises = async () => {
  const db = await getDb();
  const result = db.exec('SELECT * FROM exercises ORDER BY name ASC');
  return mapRows(result);
};

/**
 * Получает одно упражнение по ID
 */
const getExerciseById = async (id) => {
  const db = await getDb();
  const result = db.exec('SELECT * FROM exercises WHERE id = ?', [id]);
  const rows = mapRows(result);
  return rows.length > 0 ? rows[0] : null;
};

/**
 * Создаёт новое упражнение в справочнике
 */
const createExercise = async (data) => {
  const db = await getDb();
  const id = uuidv4();
  const now = new Date().toISOString();
  // is_custom: 1 если пользовательское, 0 если базовое
  const isCustom = data.isCustom ? 1 : 0;

  db.run(
    'INSERT INTO exercises (id, name, is_custom, created_at) VALUES (?, ?, ?, ?)',
    [id, data.name, isCustom, now]
  );

  saveDb(); // Сохраняем изменения на диск
  return await getExerciseById(id);
};

/**
 * Обновляет название существующего упражнения
 */
const updateExercise = async (id, data) => {
  const db = await getDb();
  const existing = await getExerciseById(id);
  if (!existing) return null;

  db.run('UPDATE exercises SET name = ? WHERE id = ?', [data.name, id]);
  
  saveDb(); // Сохраняем изменения на диск
  return await getExerciseById(id);
};

/**
 * Удаляет упражнение по ID
 */
const deleteExercise = async (id) => {
  const db = await getDb();
  const existing = await getExerciseById(id);
  if (!existing) return false;

  db.run('DELETE FROM exercises WHERE id = ?', [id]);
  
  saveDb(); // Сохраняем изменения на диск
  return true;
};

module.exports = {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
};

-- ===== Таблица пользователей =====
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Индекс для быстрого поиска по email (при логине)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ===== Таблица тренировок =====
CREATE TABLE IF NOT EXISTS workouts (
  id TEXT PRIMARY KEY,
  workout_type TEXT NOT NULL DEFAULT 'strength',
  exercise TEXT NOT NULL,
  weight REAL,
  reps INTEGER,
  duration INTEGER,
  date TEXT NOT NULL,
  comment TEXT,
  user_id TEXT NOT NULL DEFAULT '', -- ID пользователя, которому принадлежит тренировка
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Индексы для ускорения фильтрации и сортировки
CREATE INDEX IF NOT EXISTS idx_workouts_date ON workouts(date);
CREATE INDEX IF NOT EXISTS idx_workouts_type ON workouts(workout_type);
CREATE INDEX IF NOT EXISTS idx_workouts_exercise ON workouts(exercise);
CREATE INDEX IF NOT EXISTS idx_workouts_user_id ON workouts(user_id);

-- ===== Таблица упражнений (справочник) =====
CREATE TABLE IF NOT EXISTS exercises (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  is_custom INTEGER NOT NULL DEFAULT 0, -- 0: базовое упражнение, 1: пользовательское
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Индекс для быстрого поиска по названию упражнения
CREATE INDEX IF NOT EXISTS idx_exercises_name ON exercises(name);

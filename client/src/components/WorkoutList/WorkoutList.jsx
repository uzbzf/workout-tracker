import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import styles from './WorkoutList.module.css'

function WorkoutList({ workouts, onEdit, onDelete, onAdd }) {
  if (!workouts || workouts.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📋</div>
        <h3 className={styles.emptyTitle}>История пуста</h3>
        <p className={styles.emptyDescription}>
          Добавьте свою первую тренировку, чтобы начать отслеживание прогресса
        </p>
        {onAdd && (
          <button className={styles.addButton} onClick={onAdd}>
            Добавить тренировку
          </button>
        )}
      </div>
    )
  }

  return (
    <div className={styles.workoutList}>
      {workouts.map((workout) => (
        <div key={workout.id} className={styles.workoutItem}>
          <div className={styles.workoutInfo}>
            <div className={styles.exerciseName}>{workout.exercise}</div>
            <div className={styles.workoutDetails}>
              {workout.date && format(new Date(workout.date), 'd MMMM yyyy', { locale: ru })}
              {workout.workoutType && ` • ${getWorkoutTypeLabel(workout.workoutType)}`}
              {workout.weight && ` • ${workout.weight} кг`}
              {workout.reps && ` • ${workout.reps} повт.`}
              {workout.duration && ` • ${workout.duration} мин`}
            </div>
          </div>
          <div className={styles.workoutActions}>
            {onEdit && (
              <button className={styles.editButton} onClick={() => onEdit(workout)}>
                Редактировать
              </button>
            )}
            {onDelete && (
              <button className={styles.deleteButton} onClick={() => onDelete(workout.id)}>
                Удалить
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function getWorkoutTypeLabel(type) {
  const labels = {
    strength: 'Силовая',
    cardio: 'Кардио',
    flexibility: 'Растяжка',
    mixed: 'Смешанная',
  }
  return labels[type] || type
}

export default WorkoutList

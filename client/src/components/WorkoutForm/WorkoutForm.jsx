import { useState, useEffect } from 'react'
import styles from './WorkoutForm.module.css'

function WorkoutForm({ editData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    workoutType: 'strength',
    exercise: '',
    weight: '',
    reps: '',
    duration: '',
    date: new Date().toISOString().split('T')[0],
    comment: '',
  })

  useEffect(() => {
    if (editData) {
      setFormData({
        workoutType: editData.workoutType || 'strength',
        exercise: editData.exercise || '',
        weight: editData.weight || '',
        reps: editData.reps || '',
        duration: editData.duration || '',
        date: editData.date || new Date().toISOString().split('T')[0],
        comment: editData.comment || '',
      })
    }
  }, [editData])

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const data = {
      ...formData,
      weight: formData.weight ? Number(formData.weight) : null,
      reps: formData.reps ? Number(formData.reps) : null,
      duration: formData.duration ? Number(formData.duration) : null,
    }
    
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formRow}>
        <div className={styles.field}>
          <label>Тип тренировки *</label>
          <select
            value={formData.workoutType}
            onChange={(e) => handleChange('workoutType', e.target.value)}
            required
          >
            <option value="strength">Силовая</option>
            <option value="cardio">Кардио</option>
            <option value="flexibility">Растяжка</option>
            <option value="mixed">Смешанная</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Дата *</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            required
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.field}>
          <label>Упражнение *</label>
          <input
            type="text"
            value={formData.exercise}
            onChange={(e) => handleChange('exercise', e.target.value)}
            placeholder="Например: Жим лёжа"
            required
          />
        </div>

        <div className={styles.field}>
          <label>Длительность (мин)</label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => handleChange('duration', e.target.value)}
            placeholder="45"
            min="0"
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.field}>
          <label>Вес (кг)</label>
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => handleChange('weight', e.target.value)}
            placeholder="80"
            min="0"
            step="0.5"
          />
        </div>

        <div className={styles.field}>
          <label>Повторения</label>
          <input
            type="number"
            value={formData.reps}
            onChange={(e) => handleChange('reps', e.target.value)}
            placeholder="10"
            min="0"
          />
        </div>
      </div>

      <div className={styles.field}>
        <label>Комментарий</label>
        <textarea
          value={formData.comment}
          onChange={(e) => handleChange('comment', e.target.value)}
          placeholder="Заметки о тренировке..."
        />
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>
          Отмена
        </button>
        <button type="submit" className={styles.submitButton}>
          {editData ? 'Сохранить изменения' : 'Добавить тренировку'}
        </button>
      </div>
    </form>
  )
}

export default WorkoutForm

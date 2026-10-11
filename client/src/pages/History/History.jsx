import { useState, useEffect } from 'react'
import Modal from '../../components/Modal/Modal'
import WorkoutForm from '../../components/WorkoutForm/WorkoutForm'
import WorkoutList from '../../components/WorkoutList/WorkoutList'
import { getWorkouts, addWorkout, updateWorkout, deleteWorkout } from '../../services/workoutService'
import styles from './History.module.css'

function History() {
  /* Состояние фильтров */
  const [filters, setFilters] = useState({
    workoutType: '',
    dateFrom: '',
    dateTo: '',
  })

  /* Состояние списка тренировок и загрузки */
  const [workouts, setWorkouts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  /* Состояние модалки */
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingWorkout, setEditingWorkout] = useState(null)

  /* Загрузка данных при монтировании и изменении фильтров */
  useEffect(() => {
    loadData()
  }, [filters])

  /* Асинхронная функция загрузки и фильтрации данных */
  const loadData = async () => {
    setIsLoading(true)
    try {
      /* Передаем фильтры в сервис, бэкенд сам их обработает */
      const data = await getWorkouts(filters)
      setWorkouts(data)
    } catch (error) {
      console.error('Ошибка загрузки истории:', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  /* Обработчик изменения фильтров */
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  /* Сброс всех фильтров */
  const handleResetFilters = () => {
    setFilters({
      workoutType: '',
      dateFrom: '',
      dateTo: '',
    })
  }

  /* Открытие модалки для добавления новой тренировки */
  const handleAddWorkout = () => {
    setEditingWorkout(null)
    setIsModalOpen(true)
  }

  /* Открытие модалки для редактирования тренировки */
  const handleEditWorkout = (workout) => {
    setEditingWorkout(workout)
    setIsModalOpen(true)
  }

  /* Закрытие модалки */
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingWorkout(null)
  }

  /* Обработчик отправки формы (добавление или редактирование) */
  const handleSubmitForm = async (formData) => {
    try {
      if (editingWorkout) {
        await updateWorkout(editingWorkout.id, formData)
      } else {
        await addWorkout(formData)
      }
      handleCloseModal()
      /* loadData вызовется автоматически благодаря useEffect на filters, 
         но если фильтры не менялись, вызываем вручную: */
      if (!filters.workoutType && !filters.dateFrom && !filters.dateTo) {
        loadData() 
      }
    } catch (error) {
      alert('Ошибка при сохранении: ' + error.message)
    }
  }

  /* Обработчик удаления тренировки */
  const handleDeleteWorkout = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту тренировку?')) {
      try {
        await deleteWorkout(id)
        loadData()
      } catch (error) {
        alert('Ошибка при удалении: ' + error.message)
      }
    }
  }

  return (
    <div className={styles.history}>
      {/* Заголовок страницы и кнопка добавления */}
      <div className={styles.header}>
        <h1 className={styles.title}>История тренировок</h1>
        <button className={styles.addButton} onClick={handleAddWorkout}>
          <span className={styles.addIcon}>+</span>
          <span>Добавить тренировку</span>
        </button>
      </div>

      {/* Панель фильтров */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Тип тренировки</label>
          <select
            className={styles.filterSelect}
            value={filters.workoutType}
            onChange={(e) => handleFilterChange('workoutType', e.target.value)}
          >
            <option value="">Все типы</option>
            <option value="strength">Силовая</option>
            <option value="cardio">Кардио</option>
            <option value="flexibility">Растяжка</option>
            <option value="mixed">Смешанная</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Дата от</label>
          <input
            type="date"
            className={styles.filterInput}
            value={filters.dateFrom}
            onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
          />
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Дата до</label>
          <input
            type="date"
            className={styles.filterInput}
            value={filters.dateTo}
            onChange={(e) => handleFilterChange('dateTo', e.target.value)}
          />
        </div>

        <button className={styles.resetButton} onClick={handleResetFilters}>
          Сбросить фильтры
        </button>
      </div>

      {/* Список тренировок */}
      <div className={styles.workoutListContainer}>
        {isLoading ? (
          <div className={styles.loading}>Загрузка истории...</div>
        ) : (
          <WorkoutList
            workouts={workouts}
            onEdit={handleEditWorkout}
            onDelete={handleDeleteWorkout}
            onAdd={handleAddWorkout}
          />
        )}
      </div>

      {/* Модальное окно для добавления/редактирования тренировки */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingWorkout ? 'Редактировать тренировку' : 'Добавить тренировку'}
      >
        <WorkoutForm
          editData={editingWorkout}
          onSubmit={handleSubmitForm}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  )
}

export default History

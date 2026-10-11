import { useState, useEffect } from 'react'
import Modal from '../../components/Modal/Modal'
import WorkoutForm from '../../components/WorkoutForm/WorkoutForm'
import StatCard from '../../components/StatCard/StatCard'
import WorkoutList from '../../components/WorkoutList/WorkoutList'
import { getRecentWorkouts, addWorkout, deleteWorkout } from '../../services/workoutService'
import { getSummaryStats } from '../../services/summaryService'
import { formatDuration } from '../../utils/formatters'
import styles from './Dashboard.module.css'

function Dashboard() {
  /* Состояние для статистики */
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalTime: 0,
    totalWeight: 0,
    avgDuration: 0,
  })

  /* Состояние для последних тренировок */
  const [recentWorkouts, setRecentWorkouts] = useState([])

  /* Состояния для управления модалкой и загрузкой */
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  /* Загрузка данных при монтировании компонента */
  useEffect(() => {
    loadData()
  }, [])

  /* Асинхронная функция загрузки данных из API */
  const loadData = async () => {
    setIsLoading(true)
    try {
      /* Загружаем статистику и список тренировок параллельно */
      const [summary, recent] = await Promise.all([
        getSummaryStats(),
        getRecentWorkouts(5),
      ])
      setStats(summary)
      setRecentWorkouts(recent)
    } catch (error) {
      console.error('Ошибка загрузки дашборда:', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  /* Открытие модалки для добавления новой тренировки */
  const handleAddWorkout = () => {
    setIsModalOpen(true)
  }

  /* Закрытие модалки */
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  /* Обработчик отправки формы (добавление новой тренировки) */
  const handleSubmitForm = async (formData) => {
    try {
      await addWorkout(formData)
      handleCloseModal()
      loadData() /* Перезагружаем данные после успешного сохранения */
    } catch (error) {
      alert('Ошибка при сохранении: ' + error.message)
    }
  }

  /* Обработчик удаления тренировки из списка на дашборде */
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

  /* Индикатор загрузки */
  if (isLoading) {
    return <div className={styles.loading}>Загрузка данных...</div>
  }

  return (
    <div className={styles.dashboard}>
      {/* Заголовок страницы и кнопка добавления */}
      <div className={styles.header}>
        <h1 className={styles.title}>Главная</h1>
        <button className={styles.addButton} onClick={handleAddWorkout}>
          <span className={styles.addIcon}>+</span>
          <span>Добавить тренировку</span>
        </button>
      </div>

      {/* Сетка карточек статистики */}
      <div className={styles.statsGrid}>
        <StatCard 
          title="Тренировок всего" 
          value={stats.totalWorkouts} 
          variant="primary"
          icon="🏋️"
        />
        <StatCard 
          title="Минут тренировок" 
          value={stats.totalTime} 
          variant="info"
          icon="⏱️"
          description={stats.totalTime > 0 ? formatDuration(stats.totalTime) : ''}
        />
        <StatCard 
          title="Поднятый вес" 
          value={stats.totalWeight} 
          unit="кг"
          variant="warning"
          icon="💪"
        />
      </div>

      {/* Секция последних тренировок */}
      <div className={styles.recentWorkouts}>
        <h2 className={styles.sectionTitle}>Последние тренировки</h2>
        <WorkoutList
          workouts={recentWorkouts}
          onDelete={handleDeleteWorkout}
          onAdd={handleAddWorkout}
        />
      </div>

      {/* Модальное окно для добавления тренировки */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Добавить тренировку"
      >
        <WorkoutForm
          onSubmit={handleSubmitForm}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  )
}

export default Dashboard

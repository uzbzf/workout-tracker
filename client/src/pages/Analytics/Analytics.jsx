import { useState, useEffect } from 'react'
import ProgressChart from '../../components/ProgressChart/ProgressChart'
import ActivityChart from '../../components/ActivityChart/ActivityChart'
import { getSummaryStats, getProgressData, getActivityData } from '../../services/summaryService'
import { formatDuration } from '../../utils/formatters'
import styles from './Analytics.module.css'

function Analytics() {
  /* Состояние для сводной статистики */
  const [summary, setSummary] = useState({
    totalWorkouts: 0,
    totalTime: 0,
    totalWeight: 0,
    avgDuration: 0,
  })

  /* Состояние для данных графика прогресса */
  const [progressData, setProgressData] = useState([])

  /* Состояние для данных графика активности */
  const [activityData, setActivityData] = useState([])

  /* Состояние загрузки */
  const [isLoading, setIsLoading] = useState(true)

  /* Загрузка данных при монтировании компонента */
  useEffect(() => {
    loadData()
  }, [])

  /* Асинхронная функция загрузки данных из API */
  const loadData = async () => {
    setIsLoading(true)
    try {
      /* Загружаем все данные параллельно */
      const [stats, progress, activity] = await Promise.all([
        getSummaryStats(),
        getProgressData(),
        getActivityData('week', 8),
      ])

      setSummary(stats)
      setProgressData(progress)
      setActivityData(activity)
    } catch (error) {
      console.error('Ошибка загрузки аналитики:', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  /* Индикатор загрузки */
  if (isLoading) {
    return <div className={styles.loading}>Загрузка аналитики...</div>
  }

  return (
    <div className={styles.analytics}>
      {/* Заголовок страницы */}
      <div className={styles.header}>
        <h1 className={styles.title}>Прогресс и аналитика</h1>
      </div>

      {/* Сетка графиков */}
      <div className={styles.chartsGrid}>
        {/* График прогресса веса */}
        <ProgressChart
          data={progressData}
          title="Прогресс по весу"
          dataKey="weight"
          unit="кг"
          color="#10b981"
        />

        {/* График активности тренировок */}
        <ActivityChart
          data={activityData}
          title="Активность тренировок"
          dataKey="count"
          color="#3b82f6"
        />
      </div>

      {/* Секция сводной статистики */}
      <div className={styles.summarySection}>
        <h2 className={styles.summaryTitle}>Общая статистика</h2>
        <div className={styles.summaryGrid}>
          <div className={styles.summaryItem}>
            <div className={styles.summaryValue}>{summary.totalWorkouts}</div>
            <div className={styles.summaryLabel}>Всего тренировок</div>
          </div>
          <div className={styles.summaryItem}>
            <div className={styles.summaryValue}>
              {summary.totalTime > 0 ? formatDuration(summary.totalTime) : '0 мин'}
            </div>
            <div className={styles.summaryLabel}>Общее время</div>
          </div>
          <div className={styles.summaryItem}>
            <div className={styles.summaryValue}>{summary.totalWeight} кг</div>
            <div className={styles.summaryLabel}>Поднятый вес</div>
          </div>
          <div className={styles.summaryItem}>
            <div className={styles.summaryValue}>
              {summary.avgDuration > 0 ? formatDuration(summary.avgDuration) : '0 мин'}
            </div>
            <div className={styles.summaryLabel}>Средняя длительность</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics

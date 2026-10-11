import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useTheme } from '../../context/ThemeContext'
import styles from './ActivityChart.module.css'

function ActivityChart({ data, title, dataKey, color }) {
  const { theme } = useTheme()
  
  /* Цвета для тёмной и светлой темы */
  const textColor = theme === 'dark' ? '#f9fafb' : '#1a1a1a'
  const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb'

  if (!data || data.length === 0) {
    return (
      <div className={styles.chartContainer}>
        <h3 className={styles.chartTitle}>{title}</h3>
        <div className={styles.emptyChart}>Нет данных для отображения</div>
      </div>
    )
  }

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis 
            dataKey="period" 
            stroke={textColor}
            tick={{ fill: textColor }}
          />
          <YAxis 
            stroke={textColor}
            tick={{ fill: textColor }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
              border: `1px solid ${gridColor}`,
              color: textColor
            }}
          />
          <Legend 
            wrapperStyle={{ color: textColor }}
          />
          <Bar 
            dataKey={dataKey} 
            fill={color} 
            radius={[8, 8, 0, 0]}
            name="Тренировок"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ActivityChart

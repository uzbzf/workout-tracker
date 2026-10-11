import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useTheme } from '../../context/ThemeContext'
import styles from './ProgressChart.module.css'

function ProgressChart({ data, title, dataKey, unit, color }) {
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
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis 
            dataKey="date" 
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
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={2}
            dot={{ fill: color, r: 4 }}
            name={`Вес (${unit})`}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ProgressChart

import styles from './StatCard.module.css'

function StatCard({ title, value, unit, variant = 'primary', icon, description }) {
  return (
    <div className={`${styles.statCard} ${styles[variant]}`}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {icon && <span className={styles.icon}>{icon}</span>}
      </div>
      <div className={styles.value}>
        {value}
        {unit && <span className={styles.unit}>{unit}</span>}
      </div>
      {description && <div className={styles.description}>{description}</div>}
    </div>
  )
}

export default StatCard

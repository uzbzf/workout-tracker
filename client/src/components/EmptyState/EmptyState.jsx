import styles from './EmptyState.module.css'

function EmptyState({ 
  icon = '📭',
  title = 'Ничего не найдено', 
  description = '',
  actionLabel = '',
  onAction = null
}) {
  return (
    <div className={styles.emptyState}>
      {/* Иконка */}
      <div className={styles.icon}>{icon}</div>
      
      {/* Заголовок */}
      <h3 className={styles.title}>{title}</h3>
      
      {/* Описание */}
      {description && <p className={styles.description}>{description}</p>}
      
      {/* Кнопка действия (опционально) */}
      {actionLabel && onAction && (
        <button className={styles.actionButton} onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default EmptyState
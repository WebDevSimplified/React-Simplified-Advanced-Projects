import styles from "./Card.module.css"

export function Card({ header, children, footer }) {
  return (
    <div className={styles.card}>
      {header && <div className={styles.header}>{header}</div>}
      {children && <div className={styles.body}>{children}</div>}
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  )
}

export function CardGrid({ children }) {
  return <div className={styles.grid}>{children}</div>
}

export function CardStack({ children }) {
  return <div className={styles.stack}>{children}</div>
}

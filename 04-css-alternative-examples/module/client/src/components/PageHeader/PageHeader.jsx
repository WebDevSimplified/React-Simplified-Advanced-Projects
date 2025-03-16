import styles from "./PageHeader.module.css"

export function PageHeader({ children, btnSection, subtitle }) {
  return (
    <>
      <h1 className={styles.title}>
        {children}
        {btnSection && <div className={styles.btns}>{btnSection}</div>}
      </h1>
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
    </>
  )
}

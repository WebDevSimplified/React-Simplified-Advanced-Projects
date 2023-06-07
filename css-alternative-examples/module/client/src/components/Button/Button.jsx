import styles from "./Button.module.css"

export function Button({
  className = "",
  outline = false,
  AsComponent = "button",
  ...props
}) {
  return (
    <AsComponent
      className={`${styles.btn} ${outline ? styles.outline : ""} ${className}`}
      {...props}
    />
  )
}

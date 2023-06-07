import {
  Link,
  Outlet,
  ScrollRestoration,
  useNavigation,
} from "react-router-dom"
import styles from "./RootLayout.module.css"

export function RootLayout() {
  const { state } = useNavigation()
  const isLoading = state === "loading"

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.textLarge}>My App</div>
        <ul className={styles.list}>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/todos">Todos</Link>
          </li>
        </ul>
      </nav>
      <ScrollRestoration />
      {isLoading && <div className={styles.loadingSpinner} />}
      <div className={`${styles.container} ${isLoading ? styles.loading : ""}`}>
        <Outlet />
      </div>
    </>
  )
}

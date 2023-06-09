import {
  Link,
  Outlet,
  ScrollRestoration,
  useNavigation,
} from "react-router-dom"

export function RootLayout() {
  const { state } = useNavigation()
  const isLoading = state === "loading"

  return (
    <>
      <nav className="text-slate-100 bg-slate-900 flex justify-between items-center gap-4 px-8 py-4 mb-4 sticky top-0 z-50">
        <div className="text-3xl">My App</div>
        <ul className="flex gap-4">
          <li>
            <Link to="/posts" className="hover:underline focus:underline">
              Posts
            </Link>
          </li>
          <li>
            <Link to="/users" className="hover:underline focus:underline">
              Users
            </Link>
          </li>
          <li>
            <Link to="/todos" className="hover:underline focus:underline">
              Todos
            </Link>
          </li>
        </ul>
      </nav>
      <ScrollRestoration />
      {isLoading && <div className="loading-spinner" />}
      <div
        className={`mx-auto px-8 mb-8 max-w-7xl ${
          isLoading ? "pointer-events-none blur-sm" : ""
        }`}
      >
        <Outlet />
      </div>
    </>
  )
}

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/features/authentication"
import { useTheme } from "@/hooks/useTheme"
import { ChevronDown, Moon, Sun } from "lucide-react"
import { Link, NavLink } from "react-router-dom"

const LINKS = [
  { to: "/tasks", label: "Task Board" },
  { to: "/jobs", label: "Job Listings" },
]

export function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="sticky top-0 z-10 bg-white dark:bg-slate-950 border-b p-4">
      <div className="container flex items-center justify-between gap-4">
        <span className="text-lg">WDS App</span>
        <ul className="flex">
          <li className="flex items-center">
            <ThemeToggleButton />
          </li>
          {LINKS.map(link => (
            <NavItem key={link.to} {...link} />
          ))}
          {user ? (
            <li className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800"
                  >
                    <span>{user.email}</span>
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem asChild>
                    <Link to="/jobs/my-listings">My Listings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          ) : (
            <NavItem to="/login" label="Login" />
          )}
        </ul>
      </div>
    </nav>
  )
}

type NavItemProps = {
  to: string
  label: string
}

function NavItem({ to, label }: NavItemProps) {
  return (
    <li className="h-full flex items-center">
      <Button asChild variant="ghost">
        <NavLink to={to}>{label}</NavLink>
      </Button>
    </li>
  )
}

function ThemeToggleButton() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800"
        >
          <Sun className="h-5 w-5 scale-100 transition-transform dark:scale-0" />
          <Moon className="absolute h-5 w-5 scale-0 transition-transform dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

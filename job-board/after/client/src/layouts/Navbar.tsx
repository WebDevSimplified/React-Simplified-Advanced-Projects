import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuSub,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/features/authentication"
import { useTheme } from "@/hooks/useTheme"
import { ChevronDown, Menu, Moon, Sun } from "lucide-react"
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
        <div className="flex">
          <ThemeToggleButton />
          <div className="hidden sm:flex">
            {LINKS.map(link => (
              <NavItem key={link.to} {...link} />
            ))}
            {user ? (
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
                <DropdownMenuContent>
                  <LoginMenuItems logout={logout} />
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavItem to="/login" label="Login" />
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="block sm:hidden">
              <Button
                variant="ghost"
                className="data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800"
              >
                <Menu className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {LINKS.map(link => (
                <DropdownMenuItem key={link.to} asChild>
                  <NavLink to={link.to}>{link.label}</NavLink>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              {user ? (
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger asChild>
                    <span className="mr-auto">{user.email}</span>
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <LoginMenuItems logout={logout} />
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              ) : (
                <DropdownMenuItem asChild>
                  <NavLink to="/login">Login</NavLink>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

type LoginMenuItemsProps = {
  logout: () => void
}

function LoginMenuItems({ logout }: LoginMenuItemsProps) {
  return (
    <>
      <DropdownMenuItem asChild>
        <Link to="/jobs/my-listings">My Listings</Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
    </>
  )
}

type NavItemProps = {
  to: string
  label: string
}

function NavItem({ to, label }: NavItemProps) {
  return (
    <div className="h-full flex">
      <Button asChild variant="ghost">
        <NavLink to={to}>{label}</NavLink>
      </Button>
    </div>
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

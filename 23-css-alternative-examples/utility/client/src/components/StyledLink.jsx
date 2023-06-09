import { Link } from "react-router-dom"

export function StyledLink({ className, ...props }) {
  return (
    <Link
      className={`text-sky-500 visited:text-purple-800 underline ${className}`}
      {...props}
    />
  )
}

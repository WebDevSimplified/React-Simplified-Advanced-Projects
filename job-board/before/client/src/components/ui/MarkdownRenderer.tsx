import { cn } from "@/utils/shadcnUtils"
import ReactMarkdown from "react-markdown"

type MarkdownRendererProps = React.ComponentProps<typeof ReactMarkdown>

export function MarkdownRenderer({
  className,
  ...props
}: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      className={cn(
        "prose dark:prose-invert prose-slate max-w-full",
        className
      )}
      {...props}
    />
  )
}

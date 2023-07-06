import { motion, AnimatePresence } from "framer-motion"

type AnimateVisibilityProps = {
  isVisible: boolean
  children: React.ReactNode
}

export function AnimateVisibility({
  isVisible,
  children,
}: AnimateVisibilityProps) {
  return (
    <AnimatePresence initial={false}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

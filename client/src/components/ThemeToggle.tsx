import { motion } from "framer-motion";
import { Palette } from "lucide-react";
import { useTodoStore } from "../store/use-todo-store";
import { cn } from "../lib/utils";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTodoStore();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={cn(
        "relative flex items-center justify-center w-12 h-12 rounded-full",
        "glass-button group overflow-hidden"
      )}
      aria-label="Toggle Theme"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <Palette className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
      
      {/* Subtle indicator of current theme */}
      <motion.div 
        layout
        className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-primary"
        initial={false}
        animate={{
          x: theme === 'theme1' ? -6 : 6
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </motion.button>
  );
}

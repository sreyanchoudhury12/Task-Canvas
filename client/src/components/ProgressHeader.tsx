import { motion } from "framer-motion";
import { format } from "date-fns";
import { useTodoStore } from "../store/use-todo-store";
import { ThemeToggle } from "./ThemeToggle";

export function ProgressHeader() {
  const todos = useTodoStore((state) => state.todos);
  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;
  const progressPercentage = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;
  
  const today = new Date();

  return (
    <div className="mb-8 relative z-10">
      <div className="flex items-start justify-between mb-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display mb-2"
          >
            My Day
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 font-medium text-lg"
          >
            {format(today, "EEEE, MMMM do")}
          </motion.p>
        </div>
        <ThemeToggle />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-panel rounded-2xl p-5"
      >
        <div className="flex justify-between items-end mb-3">
          <div>
            <p className="text-white/60 text-sm font-medium uppercase tracking-wider mb-1">Daily Progress</p>
            <p className="text-2xl font-bold text-white">
              {completedCount} <span className="text-white/40 text-lg">/ {totalCount} tasks</span>
            </p>
          </div>
          {totalCount > 0 && progressPercentage === 100 && (
            <motion.span 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-3 py-1 bg-green-500/20 text-green-300 border border-green-500/30 rounded-full text-xs font-bold uppercase tracking-wider"
            >
              Completed
            </motion.span>
          )}
        </div>
        
        <div className="h-2 w-full bg-black/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-purple-400"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}

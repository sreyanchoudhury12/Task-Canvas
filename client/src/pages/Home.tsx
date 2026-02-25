import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useTodoStore } from "../store/use-todo-store";
import { ProgressHeader } from "../components/ProgressHeader";
import { TodoInput } from "../components/TodoInput";
import { TodoItem } from "../components/TodoItem";

export default function Home() {
  const todos = useTodoStore((state) => state.todos);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);
  
  const hasCompleted = todos.some(t => t.completed);

  return (
    <div className="relative w-full max-w-2xl mx-auto z-10">
      <ProgressHeader />
      <TodoInput />

      <div className="relative">
        <ul className="space-y-1">
          <AnimatePresence mode="popLayout">
            {todos.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-white/20" />
                </div>
                <p className="text-xl font-medium text-white/80 mb-2">No tasks yet</p>
                <p className="text-white/40">Add a task above to get started</p>
              </motion.div>
            ) : (
              todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))
            )}
          </AnimatePresence>
        </ul>

        {/* Action Bar at the bottom */}
        <AnimatePresence>
          {todos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 flex justify-between items-center px-2"
            >
              <p className="text-sm text-white/40 font-medium">
                {todos.filter(t => !t.completed).length} items left
              </p>
              
              {hasCompleted && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearCompleted}
                  className="text-sm text-white/60 hover:text-white font-medium transition-colors"
                >
                  Clear completed
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { type Todo, useTodoStore } from "../store/use-todo-store";
import { AnimatedCheckbox } from "./AnimatedCheckbox";
import { cn } from "../lib/utils";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo } = useTodoStore();

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.01 }}
      className="group flex items-center gap-4 p-4 rounded-2xl glass-button mb-3"
    >
      <AnimatedCheckbox 
        checked={todo.completed} 
        onChange={() => toggleTodo(todo.id)} 
      />
      
      <span 
        className={cn(
          "flex-1 text-lg font-medium transition-all duration-300 cursor-pointer select-none",
          todo.completed ? "text-white/40 line-through" : "text-white/90"
        )}
        onClick={() => toggleTodo(todo.id)}
      >
        {todo.title}
      </span>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => deleteTodo(todo.id)}
        className="p-2 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 outline-none"
        aria-label="Delete todo"
      >
        <Trash2 className="w-5 h-5" />
      </motion.button>
    </motion.li>
  );
}

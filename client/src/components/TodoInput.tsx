import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useTodoStore } from "../store/use-todo-store";

export function TodoInput() {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const addTodo = useTodoStore((state) => state.addTodo);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      addTodo(value);
      setValue("");
      // Keep focus after adding for rapid entry
      inputRef.current?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full z-10 mb-8">
      <motion.div
        animate={{ 
          scale: isFocused ? 1.02 : 1,
          boxShadow: isFocused ? "0 0 0 2px rgba(139, 92, 246, 0.3)" : "0 0 0 0px rgba(139, 92, 246, 0)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative flex items-center w-full rounded-2xl overflow-hidden glass-input"
      >
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="What needs to be done?"
          className="w-full bg-transparent border-none py-5 pl-6 pr-16 text-lg outline-none placeholder:text-white/40"
        />
        
        <AnimatePresence>
          {value.trim().length > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="absolute right-3 p-2 bg-primary text-white rounded-xl shadow-lg shadow-primary/25"
            >
              <Plus className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </form>
  );
}

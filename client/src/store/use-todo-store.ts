import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

export type ThemeType = 'theme1' | 'theme2';

interface TodoState {
  todos: Todo[];
  theme: ThemeType;
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => void;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      theme: 'theme1',
      
      addTodo: (title: string) => 
        set((state) => ({
          todos: [
            {
              id: crypto.randomUUID(),
              title: title.trim(),
              completed: false,
              createdAt: Date.now(),
            },
            ...state.todos,
          ],
        })),

      toggleTodo: (id: string) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),

      deleteTodo: (id: string) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      clearCompleted: () =>
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        })),

      setTheme: (theme: ThemeType) => set({ theme }),
      
      toggleTheme: () => 
        set((state) => ({
          theme: state.theme === 'theme1' ? 'theme2' : 'theme1'
        })),
    }),
    {
      name: 'modern-glass-todos',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

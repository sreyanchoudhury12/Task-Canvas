import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTodoStore } from "../store/use-todo-store";

// Import images statically as requested
import bg1 from '@assets/31508_1771994432894.jpg';
import bg2 from '@assets/Screenshot_2026-02-25_101119_1771994498433.png';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const theme = useTodoStore((state) => state.theme);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden selection:bg-primary/40 selection:text-white font-sans">
      {/* Background Image Layer with crossfade animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[-2] bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${theme === 'theme1' ? bg1 : bg2})`,
          }}
        />
      </AnimatePresence>

      {/* Subtle global dark overlay to ensure text contrast always works */}
      <div className="fixed inset-0 z-[-1] bg-black/40 mix-blend-multiply pointer-events-none" />

      {/* Main Content Area */}
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {children}
      </main>
    </div>
  );
}

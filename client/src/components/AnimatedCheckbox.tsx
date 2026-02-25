import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface AnimatedCheckboxProps {
  checked: boolean;
  onChange: () => void;
  className?: string;
}

const tickVariants = {
  checked: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  unchecked: {
    pathLength: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

export function AnimatedCheckbox({ checked, onChange, className }: AnimatedCheckboxProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={cn(
        "relative flex items-center justify-center w-6 h-6 rounded-md border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50",
        checked 
          ? "bg-primary border-primary" 
          : "bg-black/20 border-white/30 hover:border-white/50",
        className
      )}
      aria-checked={checked}
      role="checkbox"
    >
      <motion.svg
        viewBox="0 0 24 24"
        className="w-4 h-4 text-white absolute inset-0 m-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="unchecked"
        animate={checked ? "checked" : "unchecked"}
      >
        <motion.path
          d="M5 12L10 17L20 7"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={tickVariants}
        />
      </motion.svg>
    </button>
  );
}

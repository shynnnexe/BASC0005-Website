import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 md:top-8 left-[5rem] md:left-[10rem] z-50 p-2 md:p-3 rounded-full bg-[#4a90e2]/20 backdrop-blur-md border border-[#4a90e2]/40 hover:bg-[#4a90e2]/30 text-white shadow-lg transition-all hover:scale-105"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="w-4 h-4 md:w-5 md:h-5" /> : <Moon className="w-4 h-4 md:w-5 md:h-5" />}
    </button>
  );
}
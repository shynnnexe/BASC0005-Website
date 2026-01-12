import { motion } from "motion/react";

interface NavigationProps {
  currentPage: number;
  totalPages: number;
  onNavigate: (index: number) => void;
  pageNames: string[];
}

export function Navigation({
  currentPage,
  totalPages,
  onNavigate,
  pageNames,
}: NavigationProps) {
  // Don't show navigation on landing page
  if (currentPage === 0) {
    return null;
  }

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => onNavigate(index)}
          className="group relative"
          aria-label={`Go to ${pageNames[index]}`}
        >
          <motion.div
            className={`w-3 h-3 rounded-full transition-all ${
              currentPage === index
                ? "bg-[#4a90e2] scale-125"
                : "bg-[#5ca4d8]/40 hover:bg-[#5ca4d8]"
            }`}
            whileHover={{ scale: 1.2 }}
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 bg-[#4a90e2] text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {pageNames[index]}
          </span>
        </button>
      ))}
    </div>
  );
}
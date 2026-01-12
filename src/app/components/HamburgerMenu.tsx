import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

interface HamburgerMenuProps {
  currentPage: number;
  pageNames: string[];
  onNavigate: (index: number) => void;
}

export function HamburgerMenu({
  currentPage,
  pageNames,
  onNavigate,
}: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Don't show on landing page
  if (currentPage === 0) {
    return null;
  }

  const handleNavigate = (index: number) => {
    onNavigate(index);
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-8 left-8 z-50 p-3 rounded-lg bg-[#4a90e2]/20 backdrop-blur-md border border-[#5ca4d8]/40 hover:bg-[#4a90e2]/30 transition-all shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-[#4a90e2]" />
        ) : (
          <Menu className="w-6 h-6 text-[#4a90e2]" />
        )}
      </motion.button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-xl border-r border-[#5ca4d8]/30 shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-8 pt-24">
                <h2 className="text-2xl font-bold text-[#4a90e2] mb-8 flex items-center gap-2">
                  <Menu className="w-6 h-6" />
                  Navigation
                </h2>

                <nav className="space-y-2">
                  {pageNames.map((name, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleNavigate(index)}
                      className={`w-full text-left px-6 py-4 rounded-xl transition-all ${
                        currentPage === index
                          ? "bg-[#4a90e2] text-white shadow-lg"
                          : "bg-[#5ca4d8]/10 hover:bg-[#5ca4d8]/20 text-gray-800 dark:text-gray-200"
                      }`}
                      whileHover={{ x: 8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-lg">{name}</span>
                        <span
                          className={`text-sm ${
                            currentPage === index
                              ? "text-white/80"
                              : "text-[#4a90e2]"
                          }`}
                        >
                          {index + 1}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

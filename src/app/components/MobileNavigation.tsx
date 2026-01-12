import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";

interface MobileNavigationProps {
  pageNames: string[];
  onNavigate: (index: number) => void;
  currentPage: number;
}

export function MobileNavigation({ pageNames, onNavigate, currentPage }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (index: number) => {
    onNavigate(index);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 md:hidden bg-[#4a90e2]/20 backdrop-blur-md border border-[#4a90e2]/40 hover:bg-[#4a90e2]/30 text-white p-3 rounded-full shadow-lg transition-all"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute right-0 top-0 h-full w-80 bg-[#ccdad1] shadow-2xl p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl mb-8 mt-12 text-[#38302e]">Navigation</h2>
              <nav className="space-y-2">
                {pageNames.map((name, index) => (
                  <Button
                    key={index}
                    onClick={() => handleNavigate(index)}
                    variant={currentPage === index ? "default" : "ghost"}
                    className={currentPage === index ? "w-full justify-start text-lg bg-[#38302e] text-white hover:bg-[#6f6866]" : "w-full justify-start text-lg text-[#38302e] hover:bg-[#9caea9]"}
                  >
                    {name}
                  </Button>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
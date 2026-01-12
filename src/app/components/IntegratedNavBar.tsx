import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Home, Moon, Sun, Search, ChevronRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface IntegratedNavBarProps {
  currentPage: number;
  pageNames: string[];
  onNavigate: (index: number) => void;
  onSearch: () => void;
  onNavigateToTab?: (pageIndex: number, tabValue: string) => void;
}

export function IntegratedNavBar({
  currentPage,
  pageNames,
  onNavigate,
  onSearch,
  onNavigateToTab,
}: IntegratedNavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredPage, setHoveredPage] = useState<number | null>(null);
  const { isDark, toggleTheme } = useTheme();

  // Define which pages have tabs and what those tabs are
  const pageTabs: { [key: number]: { value: string; label: string }[] } = {
    1: [ // Introduction
      { value: "abstract", label: "Abstract" },
      { value: "context", label: "Background" },
      { value: "literature", label: "Literature Review" },
      { value: "question", label: "Research Question" }
    ],
    2: [ // Variables
      { value: "data", label: "Data" },
      { value: "nationality", label: "Nationality" },
      { value: "year-season", label: "Year & Season" },
      { value: "route", label: "Route" },
      { value: "crowding", label: "Crowding" },
      { value: "sherpa-ratio", label: "Sherpa Ratio" },
      { value: "team-size", label: "Team Size" },
      { value: "limitations", label: "Limitations" }
    ],
    3: [ // Data & Methods
      { value: "sources", label: "Data Sources" },
      { value: "processing", label: "Data Processing" },
      { value: "dataset", label: "Final Dataset" },
      { value: "methods", label: "Methods" },
      { value: "limitations", label: "Limitations" }
    ],
    4: [ // Analysis
      { value: "regression", label: "Regression Results" },
      { value: "visualizations", label: "Visualisations" },
      { value: "patterns", label: "Key Patterns" }
    ],
    5: [ // Discussion & Team
      { value: "findings", label: "Key Findings" },
      { value: "limitations", label: "Limitations" },
      { value: "criteria", label: "Assessment Criteria" },
      { value: "team", label: "Team" },
      { value: "references", label: "References" }
    ]
  };

  // Don't show on landing page
  if (currentPage === 0) {
    return null;
  }

  const handleNavigate = (index: number) => {
    onNavigate(index);
    setIsMenuOpen(false);
  };

  const handleTabNavigate = (pageIndex: number, tabValue: string) => {
    if (onNavigateToTab) {
      onNavigateToTab(pageIndex, tabValue);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Integrated Navigation Bar */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-4 left-4 z-50 flex items-center gap-2"
      >
        {/* Hamburger Menu Button */}
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2.5 md:p-3 rounded-xl bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-md border border-[#5ca4d8]/30 hover:bg-[#4a90e2]/20 transition-all shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-4 h-4 md:w-5 md:h-5 text-[#4a90e2]" />
          ) : (
            <Menu className="w-4 h-4 md:w-5 md:h-5 text-[#4a90e2]" />
          )}
        </motion.button>

        {/* Combined Controls */}
        <motion.div
          className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 rounded-xl bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-md border border-[#5ca4d8]/30 shadow-lg"
          whileHover={{ scale: 1.02 }}
        >
          {/* Home Button */}
          <motion.button
            onClick={() => onNavigate(0)}
            className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-lg hover:bg-[#4a90e2]/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Go to home"
          >
            <Home className="w-4 h-4 text-[#4a90e2]" />
            <span className="hidden md:inline text-sm font-medium text-[#4a90e2]">Home</span>
          </motion.button>

          {/* Divider */}
          <div className="w-px h-5 md:h-6 bg-[#5ca4d8]/30" />

          {/* Dark Mode Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="p-1.5 md:p-2 rounded-lg hover:bg-[#4a90e2]/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-[#4a90e2]" />
            ) : (
              <Moon className="w-4 h-4 text-[#4a90e2]" />
            )}
          </motion.button>

          {/* Divider */}
          <div className="w-px h-5 md:h-6 bg-[#5ca4d8]/30" />

          {/* Search Button */}
          <motion.button
            onClick={onSearch}
            className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-lg hover:bg-[#4a90e2]/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Search"
          >
            <Search className="w-4 h-4 text-[#4a90e2]" />
            <span className="hidden md:inline text-sm font-medium text-[#4a90e2]">Search</span>
            <span className="hidden lg:inline text-xs text-[#4a90e2]/60 ml-1">⌘K</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
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
                    <div 
                      key={index}
                      className="relative"
                      onMouseEnter={() => setHoveredPage(index)}
                      onMouseLeave={() => setHoveredPage(null)}
                    >
                      <motion.button
                        onClick={() => handleNavigate(index)}
                        className={`w-full text-left px-6 py-4 rounded-xl transition-all border-2 ${
                          currentPage === index
                            ? "border-[#4a90e2] bg-[#4a90e2]/10 text-[#4a90e2] shadow-lg"
                            : "border-[#5ca4d8]/30 bg-transparent hover:border-[#5ca4d8]/50 hover:bg-[#5ca4d8]/10 text-gray-800 dark:text-gray-200"
                        }`}
                        whileHover={{ x: 8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-lg">{name}</span>
                          <div className="flex items-center gap-2">
                            {pageTabs[index] && (
                              <ChevronRight 
                                className={`w-4 h-4 transition-opacity ${
                                  hoveredPage === index ? "opacity-100" : "opacity-50"
                                } ${
                                  currentPage === index ? "text-[#4a90e2]" : "text-[#4a90e2]/60"
                                }`}
                              />
                            )}
                            <span
                              className={`text-sm ${
                                currentPage === index
                                  ? "text-[#4a90e2]"
                                  : "text-[#4a90e2]/60"
                              }`}
                            >
                              {index + 1}
                            </span>
                          </div>
                        </div>
                      </motion.button>

                      {/* Sub-menu for tabs */}
                      <AnimatePresence>
                        {hoveredPage === index && pageTabs[index] && (
                          <motion.div
                            initial={{ opacity: 0, x: -10, height: 0 }}
                            animate={{ opacity: 1, x: 0, height: "auto" }}
                            exit={{ opacity: 0, x: -10, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden mt-1 ml-4 space-y-1"
                          >
                            {pageTabs[index].map((tab) => (
                              <motion.button
                                key={tab.value}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTabNavigate(index, tab.value);
                                }}
                                className="w-full text-left px-4 py-2 rounded-lg border border-[#4a90e2]/20 hover:border-[#4a90e2]/40 hover:bg-[#4a90e2]/10 text-gray-700 dark:text-gray-300 text-sm transition-all"
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#4a90e2]" />
                                  {tab.label}
                                </div>
                              </motion.button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
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
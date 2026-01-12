import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SearchBarProps {
  onNavigate?: (page: string | number) => void;
}

export interface SearchBarRef {
  open: () => void;
}

const searchableContent = [
  { page: 1, section: "Abstract", keywords: ["purpose", "methods", "results", "conclusion", "abstract", "summary"] },
  { page: 1, section: "Background", keywords: ["history", "1953", "summit", "tenzing", "hillary", "motivation"] },
  { page: 1, section: "Literature Review", keywords: ["huey", "gallagher", "salisbury", "year", "season", "nationality", "route", "crowding", "sherpa"] },
  { page: 1, section: "Research Question", keywords: ["determinants", "success", "1990", "2025", "scope", "approach"] },
  { page: 2, section: "Data Sources", keywords: ["himalayan database", "dataset", "expedition", "records"] },
  { page: 2, section: "Processing", keywords: ["scraping", "cleaning", "python", "beautiful soup", "pandas"] },
  { page: 2, section: "Methods", keywords: ["ols", "regression", "analysis", "methodology", "statistical"] },
  { page: 2, section: "Limitations", keywords: ["age", "health", "sherpa", "data quality", "covid", "avalanche"] },
  { page: 3, section: "Regression Results", keywords: ["coefficient", "p-value", "r-squared", "significance", "table"] },
  { page: 3, section: "Visualizations", keywords: ["chart", "graph", "success rate", "trend", "citizenship"] },
  { page: 3, section: "Key Patterns", keywords: ["temporal", "seasonal", "spring", "geographic", "2015"] },
  { page: 4, section: "Key Findings", keywords: ["conclusion", "findings", "interpretation", "implications"] },
  { page: 4, section: "Team", keywords: ["alice", "claire", "snigdha", "shayna", "becky", "rania", "linkedin"] },
  { page: 4, section: "References", keywords: ["bibliography", "citations", "sources", "harvard"] },
];

export const SearchBar = forwardRef<SearchBarRef, SearchBarProps>(({ onNavigate }: SearchBarProps, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof searchableContent>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Search logic
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const searchTerms = query.toLowerCase().split(" ");
    const filtered = searchableContent.filter((item) => {
      return searchTerms.some((term) =>
        item.section.toLowerCase().includes(term) ||
        item.keywords.some((keyword) => keyword.includes(term))
      );
    });

    setResults(filtered);
  }, [query]);

  const handleResultClick = (pageNum: number) => {
    if (onNavigate) {
      onNavigate(pageNum);
    }
    setIsOpen(false);
    setQuery("");
  };

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
  }));

  return (
    <>
      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            {/* Search Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#5ca4d8]/30 z-[70] overflow-hidden"
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 p-4 border-b border-[#5ca4d8]/20">
                <Search className="w-5 h-5 text-[#4a90e2]" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search pages, sections, and topics..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-[#4a90e2]/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-[#4a90e2]" />
                </button>
              </div>

              {/* Search Results */}
              <div className="max-h-96 overflow-y-auto p-2">
                {query && results.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No results found
                  </div>
                )}
                {query && results.length > 0 && (
                  <div className="space-y-1">
                    {results.map((result, index) => (
                      <button
                        key={index}
                        onClick={() => handleResultClick(result.page)}
                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-[#4a90e2]/10 transition-colors group"
                      >
                        <div className="font-medium text-[#4a90e2] group-hover:text-[#5ca4d8]">
                          {result.section}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Page {result.page + 1}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {!query && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    Start typing to search...
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

SearchBar.displayName = "SearchBar";
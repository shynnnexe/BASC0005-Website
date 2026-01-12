import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "motion/react";
import { LandingPage } from "./components/LandingPage";
import { IntroductionPage } from "./components/IntroductionPage";
import { VariablesPage } from "./components/VariablesPage";
import { DataMethodsPage } from "./components/DataMethodsPage";
import { AnalysisPage } from "./components/AnalysisPage";
import { DiscussionTeamPage } from "./components/DiscussionTeamPage";
import { Navigation } from "./components/Navigation";
import { MobileNavigation } from "./components/MobileNavigation";
import { IntegratedNavBar } from "./components/IntegratedNavBar";
import { SearchBar, SearchBarRef } from "./components/SearchBar";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

const pages = [
  { name: "Landing", component: LandingPage },
  { name: "Introduction", component: IntroductionPage },
  { name: "Variables", component: VariablesPage },
  { name: "Data & Methods", component: DataMethodsPage },
  { name: "Analysis", component: AnalysisPage },
  { name: "Discussion", component: DiscussionTeamPage },
];

const pageMap: Record<string, number> = {
  landing: 0,
  home: 1,
  introduction: 1,
  context: 1,
  variables: 2,
  data: 3,
  methods: 3,
  analysis: 4,
  results: 4,
  findings: 4,
  discussion: 5,
  team: 5,
  conclusion: 5,
};

function AppContent() {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentTab, setCurrentTab] = useState<string | undefined>(undefined);
  const { isDark } = useTheme();
  const searchBarRef = useRef<SearchBarRef>(null);

  const navigateToPage = (pageIdentifier: string | number, tab?: string) => {
    const targetPage = typeof pageIdentifier === "string" 
      ? pageMap[pageIdentifier.toLowerCase()] 
      : pageIdentifier;
    
    if (targetPage !== undefined) {
      setCurrentPage(targetPage);
      setCurrentTab(tab);
    }
  };

  const navigateToTab = (pageIndex: number, tabValue: string) => {
    setCurrentPage(pageIndex);
    setCurrentTab(tabValue);
  };

  // Scroll to top when page or tab changes
  useEffect(() => {
    // Scroll multiple targets to ensure it works
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentPage, currentTab]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && currentPage < pages.length - 1) {
        navigateToPage(currentPage + 1);
      } else if (e.key === "ArrowUp" && currentPage > 0) {
        navigateToPage(currentPage - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  // Removed scroll navigation to allow scrolling within pages

  const CurrentPageComponent = pages[currentPage].component;

  return (
    <div className={`w-full min-h-screen overflow-x-hidden ${isDark ? 'dark' : ''}`}>
      <AnimatePresence mode="wait">
        <CurrentPageComponent 
          key={`${currentPage}-${currentTab || 'default'}`}
          onNavigate={navigateToPage}
          defaultTab={currentTab}
        />
      </AnimatePresence>

      <SearchBar onNavigate={navigateToPage} ref={searchBarRef} />

      <IntegratedNavBar
        currentPage={currentPage}
        pageNames={pages.map(p => p.name)}
        onNavigate={navigateToPage}
        onSearch={() => searchBarRef.current?.open()}
        onNavigateToTab={navigateToTab}
      />

      <Navigation
        currentPage={currentPage}
        totalPages={pages.length}
        onNavigate={navigateToPage}
        pageNames={pages.map(p => p.name)}
      />

      {/* MobileNavigation removed - IntegratedNavBar now handles all screen sizes */}

      {/* Page indicator */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 text-sm z-50 px-4 py-2 rounded-full border hidden md:block text-white bg-[#4a90e2]/20 border-[#4a90e2]/40 backdrop-blur-md shadow-lg">
        {currentPage + 1} / {pages.length}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
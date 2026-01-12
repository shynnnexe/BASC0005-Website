import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "../context/ThemeContext";
import { useState, useRef } from "react";

interface LandingPageProps {
  onNavigate: (page: string | number, tab?: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const { isDark } = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse position for parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    setMousePosition({ x, y });
  };
  
  const sections = {
    introduction: {
      name: 'Introduction',
      page: 1,
      tabs: [
        { label: 'Background', value: 'context' },
        { label: 'Literature Review', value: 'literature' },
        { label: 'Hypotheses', value: 'question' }
      ]
    },
    variables: {
      name: 'Variables',
      page: 2,
      tabs: [
        { label: 'Nationality', value: 'nationality' },
        { label: 'Year/Season', value: 'year-season' },
        { label: 'Route', value: 'route' },
        { label: 'Crowding', value: 'crowding' },
        { label: 'Sherpa Ratio', value: 'sherpa-ratio' },
        { label: 'Team Size', value: 'team-size' }
      ]
    },
    data: {
      name: 'Data & Methods',
      page: 3,
      tabs: [
        { label: 'Data Sources', value: 'sources' },
        { label: 'Processing', value: 'processing' },
        { label: 'Analysis Methods', value: 'methods' },
        { label: 'Limitations', value: 'limitations' }
      ]
    },
    analysis: {
      name: 'Analysis',
      page: 4,
      tabs: [
        { label: 'Visualisations', value: 'visualizations' },
        { label: 'Regression', value: 'regression' },
        { label: 'Patterns', value: 'patterns' }
      ]
    },
    discussion: {
      name: 'Discussion',
      page: 5,
      tabs: [
        { label: 'Key Findings', value: 'findings' },
        { label: 'Limitations', value: 'limitations' },
        { label: 'Assessment Criteria', value: 'criteria' },
        { label: 'Team', value: 'team' },
        { label: 'References', value: 'references' }
      ]
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-screen relative overflow-hidden"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Full-screen Background Image */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudCUyMGV2ZXJlc3R8ZW58MXx8fHwxNzM2NTIzMjAxfDA&ixlib=rb-4.1.0&q=80&w=1080')`,
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) scale(1.1)`,
          transition: 'transform 0.3s ease-out'
        }}
      />

      {/* Gradient overlay for readability */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-br from-black/60 via-black/40 to-black/50' 
          : 'bg-gradient-to-br from-black/30 via-transparent to-black/20'
      }`} />

      {/* Top left text - removed Quantitative Analysis */}

      {/* GRUNGE branding - top right */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-8 right-12 text-white hidden md:block"
      >
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold tracking-tight">GRUNGE</div>
          <div className="w-2 h-2 rounded-full bg-[#4a90e2]" />
        </div>
      </motion.div>

      {/* Top Navigation Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="hidden md:flex absolute top-8 left-12 gap-3 z-50"
      >
        {/* Introduction */}
        <div 
          className="relative"
          onMouseEnter={() => setHoveredSection('introduction')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <Button
            onClick={() => onNavigate && onNavigate(sections.introduction.page)}
            variant="ghost"
            className="hover:bg-[#4a90e2]/30 bg-white/5 backdrop-blur-sm border border-white/20 hover:border-[#4a90e2]/50 transition-all text-white/90 hover:text-white text-xs tracking-wider uppercase px-4 py-2 rounded-2xl"
          >
            Introduction
          </Button>
          <AnimatePresence>
            {hoveredSection === 'introduction' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-2 left-0 bg-[#4a90e2]/20 backdrop-blur-md border border-[#4a90e2]/40 rounded-2xl px-4 py-3 min-w-[200px] shadow-2xl z-[100]"
              >
                {sections.introduction.tabs.map((tab, idx) => (
                  <div
                    key={idx}
                    onClick={() => onNavigate(sections.introduction.page, tab.value)}
                    className="py-2 px-3 hover:bg-[#4a90e2]/30 rounded-lg transition-colors text-white/90 hover:text-white normal-case cursor-pointer"
                  >
                    {tab.label}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Variables */}
        <div 
          className="relative"
          onMouseEnter={() => setHoveredSection('variables')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <Button
            onClick={() => onNavigate && onNavigate(sections.variables.page)}
            variant="ghost"
            className="hover:bg-[#4a90e2]/30 bg-white/5 backdrop-blur-sm border border-white/20 hover:border-[#4a90e2]/50 transition-all text-white/90 hover:text-white text-xs tracking-wider uppercase px-4 py-2 rounded-2xl"
          >
            Variables
          </Button>
          <AnimatePresence>
            {hoveredSection === 'variables' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-2 left-0 bg-[#4a90e2]/20 backdrop-blur-md border border-[#4a90e2]/40 rounded-2xl px-4 py-3 min-w-[200px] shadow-2xl z-[100]"
              >
                {sections.variables.tabs.map((tab, idx) => (
                  <div
                    key={idx}
                    onClick={() => onNavigate(sections.variables.page, tab.value)}
                    className="py-2 px-3 hover:bg-[#4a90e2]/30 rounded-lg transition-colors text-white/90 hover:text-white normal-case cursor-pointer"
                  >
                    {tab.label}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Data & Methods */}
        <div 
          className="relative"
          onMouseEnter={() => setHoveredSection('data')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <Button
            onClick={() => onNavigate && onNavigate(sections.data.page)}
            variant="ghost"
            className="hover:bg-[#4a90e2]/30 bg-white/5 backdrop-blur-sm border border-white/20 hover:border-[#4a90e2]/50 transition-all text-white/90 hover:text-white text-xs tracking-wider uppercase px-4 py-2 rounded-2xl"
          >
            Data & Methods
          </Button>
          <AnimatePresence>
            {hoveredSection === 'data' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-2 left-0 bg-[#4a90e2]/20 backdrop-blur-md border border-[#4a90e2]/40 rounded-2xl px-4 py-3 min-w-[200px] shadow-2xl z-[100]"
              >
                {sections.data.tabs.map((tab, idx) => (
                  <div
                    key={idx}
                    onClick={() => onNavigate(sections.data.page, tab.value)}
                    className="py-2 px-3 hover:bg-[#4a90e2]/30 rounded-lg transition-colors text-white/90 hover:text-white normal-case cursor-pointer"
                  >
                    {tab.label}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Analysis */}
        <div 
          className="relative"
          onMouseEnter={() => setHoveredSection('analysis')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <Button
            onClick={() => onNavigate && onNavigate(sections.analysis.page)}
            variant="ghost"
            className="hover:bg-[#4a90e2]/30 bg-white/5 backdrop-blur-sm border border-white/20 hover:border-[#4a90e2]/50 transition-all text-white/90 hover:text-white text-xs tracking-wider uppercase px-4 py-2 rounded-2xl"
          >
            Analysis
          </Button>
          <AnimatePresence>
            {hoveredSection === 'analysis' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-2 left-0 bg-[#4a90e2]/20 backdrop-blur-md border border-[#4a90e2]/40 rounded-2xl px-4 py-3 min-w-[200px] shadow-2xl z-[100]"
              >
                {sections.analysis.tabs.map((tab, idx) => (
                  <div
                    key={idx}
                    onClick={() => onNavigate(sections.analysis.page, tab.value)}
                    className="py-2 px-3 hover:bg-[#4a90e2]/30 rounded-lg transition-colors text-white/90 hover:text-white normal-case cursor-pointer"
                  >
                    {tab.label}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Discussion */}
        <div 
          className="relative"
          onMouseEnter={() => setHoveredSection('discussion')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <Button
            onClick={() => onNavigate && onNavigate(sections.discussion.page)}
            variant="ghost"
            className="hover:bg-[#4a90e2]/30 bg-white/5 backdrop-blur-sm border border-white/20 hover:border-[#4a90e2]/50 transition-all text-white/90 hover:text-white text-xs tracking-wider uppercase px-4 py-2 rounded-2xl"
          >
            Discussion
          </Button>
          <AnimatePresence>
            {hoveredSection === 'discussion' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-2 left-0 bg-[#4a90e2]/20 backdrop-blur-md border border-[#4a90e2]/40 rounded-2xl px-4 py-3 min-w-[200px] shadow-2xl z-[100]"
              >
                {sections.discussion.tabs.map((tab, idx) => (
                  <div
                    key={idx}
                    onClick={() => onNavigate(sections.discussion.page, tab.value)}
                    className="py-2 px-3 hover:bg-[#4a90e2]/30 rounded-lg transition-colors text-white/90 hover:text-white normal-case cursor-pointer"
                  >
                    {tab.label}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Main content - left aligned */}
      <div className="relative z-10 h-full flex items-center px-4 sm:px-6 md:px-12">
        <motion.div 
          className="max-w-xl"
          style={{
            transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-4 md:mb-6 leading-[0.9] text-white"
            style={{ fontWeight: 700 }}
          >
            Mount<br />Everest
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-white/90 mb-2 leading-relaxed"
          >
            What are the determinants of summit success from 1990 to 2025?
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xs sm:text-sm text-white/70 mb-8 md:mb-10"
          >
            A statistical analysis of expedition patterns across 35 years
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            onClick={() => onNavigate && onNavigate(1)}
            className="px-6 md:px-8 py-2.5 md:py-3 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white rounded-full transition-all text-sm tracking-wide"
          >
            START
          </motion.button>
        </motion.div>
      </div>

      {/* Navigation dots - right side */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3"
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            onClick={() => onNavigate && onNavigate(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === 0 ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </motion.div>

      {/* Bottom navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="hidden md:flex absolute bottom-0 left-0 right-0 px-12 py-8 items-center justify-end text-white"
      >
        <div className="flex items-center gap-6">
          <span className="text-xs text-white/60">BASC005: Quantitative Methods & Mathematical Thinking 2</span>
          <span className="text-xs text-white/60">2025/26</span>
          <span className="text-xs text-white/40">• Image: Unsplash</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
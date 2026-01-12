import { motion } from "motion/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { useTheme } from "../context/ThemeContext";
import { useState, useEffect } from "react";
import introImage from "figma:asset/50d73086f5df0b2a0984cc3347bff094f9faa07c.png";
import underperformingMap from "figma:asset/bf252f164cc6fe6d2aa47a44e10933ff4756a4db.png";
import overperformingMap from "figma:asset/6aafafde838176ba780931f9239204941a3a5ddd.png";
import { Clock, CloudSun, Globe, Route, Users, Backpack, UserCog } from "lucide-react";
import { TabNavigation } from "./TabNavigation";
import { SectionNavigation } from "./SectionNavigation";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

interface IntroductionPageProps {
  onNavigate?: (page: string | number) => void;
  defaultTab?: string;
}

// Counter animation hook
function useCountUp(end: number, duration: number = 2000, suffix: string = "") {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  // Format the number with commas
  const formattedCount = count.toLocaleString();
  return suffix ? `${formattedCount}${suffix}` : formattedCount;
}

export function IntroductionPage({ onNavigate, defaultTab = "abstract" }: IntroductionPageProps) {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState(defaultTab);

  const tabs = ["abstract", "context", "literature", "question"];
  
  const currentIndex = tabs.indexOf(activeTab);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < tabs.length - 1;

  const handlePrevious = () => {
    if (hasPrevious) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [activeTab]);
  
  // Counter animations for statistics
  const expeditionsCount = useCountUp(2312, 2000);
  const elevationCount = useCountUp(8849, 2000, "m");
  const countriesCount = useCountUp(14, 2000);
  const yearsCount = useCountUp(35, 2000);
  
  return (
    <div className={`w-full min-h-screen overflow-auto ${ 
      isDark 
        ? 'bg-gradient-to-br from-[#0f1419] via-[#1a2332] to-[#2c3e50] text-white' 
        : 'bg-gradient-to-br from-[#f0f4f8] via-[#e8f1f8] to-[#d9e8f5]'
    }`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 md:py-24"
      >
        {/* Single Header */}
        <div className="mb-12 md:mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className={`text-xs tracking-[0.3em] uppercase mb-4 ${
                isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'
              }`}>Section 01</p>
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                Introduction
              </h1>
            </div>
            <div className={`hidden md:flex items-center gap-2 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
              <div className="text-xl font-bold tracking-tight">GRUNGE</div>
              <div className="w-2 h-2 rounded-full bg-[#4a90e2]" />
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`border-b ${isDark ? 'border-[#4a90e2]/30' : 'border-[#4a90e2]/20'} w-full justify-start mb-12 gap-1 flex-wrap overflow-x-auto`}>
            <TabsTrigger value="abstract">Abstract</TabsTrigger>
            <TabsTrigger value="context">Background</TabsTrigger>
            <TabsTrigger value="literature">Literature Review</TabsTrigger>
            <TabsTrigger value="question">Research Question</TabsTrigger>
          </TabsList>

          <TabsContent value="abstract" className="focus:outline-none">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="max-w-5xl mx-auto"
            >
              {/* Abstract Content with Image */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className={`space-y-6 text-base leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                  <p>
                    <strong className={`${isDark ? 'text-white' : 'text-[#1a2332]'} text-base block mb-2`}>Purpose:</strong> This study quantitatively examines the determinants of summit success on 
                    Mount Everest during the commercial climbing period (1990-2025), addressing gaps in existing literature 
                    which predominantly focuses on qualitative analysis or limited temporal/demographic variables.
                  </p>
                  <p>
                    <strong className={`${isDark ? 'text-white' : 'text-[#1a2332]'} text-base block mb-2`}>Methods:</strong> Using data from the Himalayan Database (n=2,312 expeditions), we employed 
                    Ordinary Least Squares (OLS) regression to analyse expedition-level success rates against temporal 
                    (year, season), geographic (route, nationality), and organisational factors (team size, Sherpa support 
                    ratio, multinational composition).
                  </p>
                  <p>
                    <strong className={`${isDark ? 'text-white' : 'text-[#1a2332]'} text-base block mb-2`}>Results:</strong> Season emerged as the most statistically significant determinant 
                    (p&lt;0.001), with our model explaining 31% of success rate variation. Spring expeditions demonstrated a 24.54 percentage point advantage over 
                    autumn attempts. The temporal trend (year) showed a small, non-significant effect (β = 0.0025, p = 0.125), suggesting that improvements 
                    over time are better captured through other factors in the model.
                  </p>
                  <p>
                    <strong className={`${isDark ? 'text-white' : 'text-[#1a2332]'} text-base block mb-2`}>Conclusion:</strong> Summit success is primarily influenced by seasonal weather windows 
                    rather than temporal trends or individual expedition characteristics. 
                    These findings have implications for expedition planning and risk assessment in high-altitude mountaineering.
                  </p>
                </div>

                {/* Professional Minimalist Image */}
                <div className="flex flex-col justify-start">
                  <img 
                    src="https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVyZXN0JTIwcGVhayUyMG1vdW50YWluJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc2ODExMzg4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Mount Everest"
                    className="w-full h-full object-cover rounded-[2rem] shadow-xl"
                  />
                </div>
              </div>

              {/* Keywords and Study Period Cards */}
              <div className="grid md:grid-cols-2 gap-6 mt-12">
                <div className={`p-6 md:p-8 rounded-[1.5rem] ${
                  isDark 
                    ? 'bg-[#1a2332]/80 backdrop-blur-md border border-[#4a90e2]/30' 
                    : 'bg-white/90 backdrop-blur-md border border-[#4a90e2]/20 shadow-lg'
                }`}>
                  <h3 className={`text-xs tracking-[0.2em] uppercase mb-3 ${
                    isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'
                  }`}>Keywords</h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                    Mount Everest, mountaineering, summit success, regression analysis, Himalayan Database, 
                    temporal factors, seasonal variation, commercial climbing
                  </p>
                </div>

                <div className={`p-6 md:p-8 rounded-[1.5rem] ${
                  isDark 
                    ? 'bg-[#1a2332]/80 backdrop-blur-md border border-[#5ca4d8]/30' 
                    : 'bg-white/90 backdrop-blur-md border border-[#5ca4d8]/20 shadow-lg'
                }`}>
                  <h3 className={`text-xs tracking-[0.2em] uppercase mb-3 ${
                    isDark ? 'text-[#7bb3e0]' : 'text-[#5ca4d8]'
                  }`}>Study Period</h3>
                  <p className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                    1990-2025 (35 years)
                  </p>
                  <p className={`text-xs ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                    Focus on commercial climbing era post-1990
                  </p>
                </div>
              </div>

              {/* Key Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`p-4 md:p-6 rounded-[1.5rem] text-center cursor-help transition-all hover:scale-105 ${
                      isDark 
                        ? 'bg-gradient-to-br from-[#4a90e2]/30 to-[#5ca4d8]/30 border border-[#4a90e2]/40' 
                        : 'bg-gradient-to-br from-[#e8f1f8] to-[#d9e8f5] border border-[#4a90e2]/30'
                    }`}>
                      <div className={`text-2xl md:text-3xl font-bold mb-1 ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                        {expeditionsCount}
                      </div>
                      <div className={`text-xs uppercase tracking-wide ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                        Expeditions
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className={`max-w-xs ${isDark ? 'bg-[#1a2332] text-[#c5d3e2] border-[#4a90e2]/40' : 'bg-white text-[#2c3e50] border-[#4a90e2]/30'}`}>
                    <p className="text-xs">
                      <strong>Source:</strong> Himalayan Database (Salisbury et al., 2021). Total expeditions analysed from 1990–2025 across 14 countries.
                    </p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`p-4 md:p-6 rounded-[1.5rem] text-center cursor-help transition-all hover:scale-105 ${
                      isDark 
                        ? 'bg-gradient-to-br from-[#5ca4d8]/30 to-[#7bb3e0]/30 border border-[#5ca4d8]/40' 
                        : 'bg-gradient-to-br from-[#d9e8f5] to-[#c9dff0] border border-[#5ca4d8]/30'
                    }`}>
                      <div className={`text-2xl md:text-3xl font-bold mb-1 ${isDark ? 'text-[#7bb3e0]' : 'text-[#5ca4d8]'}`}>
                        {elevationCount}
                      </div>
                      <div className={`text-xs uppercase tracking-wide ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                        Elevation
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className={`max-w-xs ${isDark ? 'bg-[#1a2332] text-[#c5d3e2] border-[#4a90e2]/40' : 'bg-white text-[#2c3e50] border-[#4a90e2]/30'}`}>
                    <p className="text-xs">
                      <strong>Source:</strong> Official measurement confirmed by China and Nepal in 2020. Mount Everest stands at 8,849 metres (29,032 feet) above sea level.
                    </p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`p-4 md:p-6 rounded-[1.5rem] text-center cursor-help transition-all hover:scale-105 ${
                      isDark 
                        ? 'bg-gradient-to-br from-[#7bb3e0]/30 to-[#4a90e2]/30 border border-[#7bb3e0]/40' 
                        : 'bg-gradient-to-br from-[#c9dff0] to-[#b9d5eb] border border-[#7bb3e0]/30'
                    }`}>
                      <div className={`text-2xl md:text-3xl font-bold mb-1 ${isDark ? 'text-[#9dc9ef]' : 'text-[#7bb3e0]'}`}>
                        {countriesCount}
                      </div>
                      <div className={`text-xs uppercase tracking-wide ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                        Countries
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className={`max-w-xs ${isDark ? 'bg-[#1a2332] text-[#c5d3e2] border-[#4a90e2]/40' : 'bg-white text-[#2c3e50] border-[#4a90e2]/30'}`}>
                    <p className="text-xs">
                      <strong>Source:</strong> Dataset includes expeditions from 14 countries with the highest summit attempt rates (US, UK, Japan, Germany, France, etc.) per Himalayan Database.
                    </p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`p-4 md:p-6 rounded-[1.5rem] text-center cursor-help transition-all hover:scale-105 ${
                      isDark 
                        ? 'bg-gradient-to-br from-[#4a90e2]/30 to-[#5ca4d8]/30 border border-[#4a90e2]/40' 
                        : 'bg-gradient-to-br from-[#e8f1f8] to-[#d9e8f5] border border-[#4a90e2]/30'
                    }`}>
                      <div className={`text-2xl md:text-3xl font-bold mb-1 ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                        {yearsCount}
                      </div>
                      <div className={`text-xs uppercase tracking-wide ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                        Years
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className={`max-w-xs ${isDark ? 'bg-[#1a2332] text-[#c5d3e2] border-[#4a90e2]/40' : 'bg-white text-[#2c3e50] border-[#4a90e2]/30'}`}>
                    <p className="text-xs">
                      <strong>Source:</strong> Study period covers 1990–2025, focusing on the commercial climbing era post-1990 when guided expeditions became widespread.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <TabNavigation 
                onPrevious={handlePrevious}
                onNext={handleNext}
                hasPrevious={hasPrevious}
                hasNext={hasNext}
                customPreviousAction={() => onNavigate?.(0)}
                customPreviousLabel="Landing"
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="context">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="max-w-6xl"
            >
              <div className="mb-12">
                <p className={`text-lg leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                  Mount Everest stands as the world's highest peak at 8,849 metres, first summited by Sir Edmund Hillary 
                  and Tenzing Norgay in 1953. Since 1990, commercial expeditions have transformed Everest climbing from an 
                  elite pursuit into a more accessible, albeit still challenging, endeavour (<a 
                    href="http://www.himalayandatabase.net/downloads/Ever-AAJ2003.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#4a90e2] hover:text-[#5ca4d8] underline decoration-dotted transition-colors"
                  >Huey & Salisbury, 2003</a>).
                </p>
              </div>

              {/* Key Statistics Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className={`p-8 rounded-[2rem] shadow-lg transition-all hover:shadow-xl ${
                  isDark 
                    ? 'bg-gradient-to-br from-[#1a2332]/80 to-[#2c3e50]/80 backdrop-blur-md border border-[#4a90e2]/40' 
                    : 'bg-gradient-to-br from-white/90 to-[#f0f4f8]/90 backdrop-blur-md border border-[#4a90e2]/30'
                }`}>
                  <h3 className={`text-xl mb-4 font-semibold ${isDark ? 'text-[#4a90e2]' : 'text-[#4a90e2]'}`}>
                    The Commercial Era (1990-Present)
                  </h3>
                  <p className={`leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                    The introduction of commercial guiding services in the 1990s dramatically increased summit attempts. 
                    This period has seen both remarkable successes and notable tragedies, including the 1996 disaster 
                    documented in <em><a 
                      href="https://www.forsvarsmakten.se/siteassets/english/swedint/engelska/swedint/courses/nato-ll-soc/into-thin-air.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#4a90e2] hover:text-[#5ca4d8] underline decoration-dotted transition-colors"
                    >Into Thin Air</a></em> (Krakauer, 1997) and the 2015 earthquake-triggered avalanche.
                  </p>
                </div>

                <div className={`p-8 rounded-[2rem] shadow-lg transition-all hover:shadow-xl ${
                  isDark 
                    ? 'bg-gradient-to-br from-[#1a2332]/80 to-[#2c3e50]/80 backdrop-blur-md border border-[#4a90e2]/40' 
                    : 'bg-gradient-to-br from-white/90 to-[#f0f4f8]/90 backdrop-blur-md border border-[#4a90e2]/30'
                }`}>
                  <h3 className={`text-xl mb-4 font-semibold ${isDark ? 'text-[#4a90e2]' : 'text-[#4a90e2]'}`}>
                    Technological Advancement
                  </h3>
                  <p className={`leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                    Improvements in equipment, weather forecasting, and route preparation have contributed to increasing 
                    success rates. Modern expeditions benefit from supplemental oxygen systems, advanced gear, and 
                    sophisticated weather prediction models unavailable to earlier climbers (Firth et al., 2008).
                  </p>
                </div>

                <div className={`p-8 rounded-[2rem] shadow-lg transition-all hover:shadow-xl ${
                  isDark 
                    ? 'bg-gradient-to-br from-[#1a2332]/80 to-[#2c3e50]/80 backdrop-blur-md border border-[#4a90e2]/40' 
                    : 'bg-gradient-to-br from-white/90 to-[#f0f4f8]/90 backdrop-blur-md border border-[#4a90e2]/30'
                }`}>
                  <h3 className={`text-xl mb-4 font-semibold ${isDark ? 'text-[#4a90e2]' : 'text-[#4a90e2]'}`}>
                    Environmental Challenges
                  </h3>
                  <p className={`leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                    The "Death Zone" above 8,000 metres poses extreme physiological challenges. Climate change is 
                    altering climbing conditions, whilst increased traffic raises concerns about crowding and 
                    environmental degradation (Pumfrey et al., 2023).
                  </p>
                </div>

                <div className={`p-8 rounded-[2rem] shadow-lg transition-all hover:shadow-xl ${
                  isDark 
                    ? 'bg-gradient-to-br from-[#1a2332]/80 to-[#2c3e50]/80 backdrop-blur-md border border-[#4a90e2]/40' 
                    : 'bg-gradient-to-br from-white/90 to-[#f0f4f8]/90 backdrop-blur-md border border-[#4a90e2]/30'
                }`}>
                  <h3 className={`text-xl mb-4 font-semibold ${isDark ? 'text-[#4a90e2]' : 'text-[#4a90e2]'}`}>
                    Sherpa Community
                  </h3>
                  <p className={`leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                    Sherpa guides play a crucial role in Everest expeditions, providing expertise, route preparation, 
                    and support. Their contributions are increasingly recognised, though debates continue about 
                    safety, compensation, and working conditions (Ortner, 1999).
                  </p>
                </div>
              </div>

              {/* Timeline Highlights */}
              <div className={`p-8 md:p-12 rounded-[2rem] shadow-lg ${
                isDark 
                  ? 'bg-[#1a2332]/80 backdrop-blur-md border border-[#4a90e2]/30' 
                  : 'bg-white/90 backdrop-blur-md border border-[#4a90e2]/20'
              }`}>
                <h3 className={`text-2xl mb-8 font-semibold ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                  Key Milestones
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className={`text-sm font-bold min-w-[80px] ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                      1990
                    </div>
                    <p className={`${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                      Commercial guiding operations begin to establish regular services
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className={`text-sm font-bold min-w-[80px] ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                      1996
                    </div>
                    <p className={`${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                      Eight climbers die during May summit attempts, raising questions about commercial climbing safety
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className={`text-sm font-bold min-w-[80px] ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                      2014
                    </div>
                    <p className={`${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                      Avalanche kills 16 Sherpas in deadliest single incident on Everest
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className={`text-sm font-bold min-w-[80px] ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                      2015
                    </div>
                    <p className={`${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                      Nepal earthquake triggers avalanches, causing season cancellation
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className={`text-sm font-bold min-w-[80px] ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                      2019
                    </div>
                    <p className={`${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                      Record 891 climbing permits issued by Nepal, raising overcrowding concerns
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Context Stats */}
              <div className="grid md:grid-cols-4 gap-6 mt-12">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="border-l-4 border-[#4a90e2] pl-6 cursor-help transition-all hover:scale-105">
                      <div className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>1953</div>
                      <p className={`text-sm uppercase tracking-wide ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                        First Summit
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className={`max-w-xs ${isDark ? 'bg-[#1a2332] text-[#c5d3e2] border-[#4a90e2]/40' : 'bg-white text-[#2c3e50] border-[#4a90e2]/30'}`}>
                    <p className="text-xs">
                      <strong>Source:</strong> Sir Edmund Hillary and Tenzing Norgay achieved the first successful summit of Mount Everest on 29 May 1953 (Britannica, 2024).
                    </p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="border-l-4 border-[#5ca4d8] pl-6 cursor-help transition-all hover:scale-105">
                      <div className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>8,849m</div>
                      <p className={`text-sm uppercase tracking-wide ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                        Peak Height
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className={`max-w-xs ${isDark ? 'bg-[#1a2332] text-[#c5d3e2] border-[#4a90e2]/40' : 'bg-white text-[#2c3e50] border-[#4a90e2]/30'}`}>
                    <p className="text-xs">
                      <strong>Source:</strong> Official measurement confirmed by China and Nepal in 2020. Mount Everest stands at 8,849 metres (29,032 feet) above sea level (BBC News, 2020).
                    </p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="border-l-4 border-[#7bb3e0] pl-6 cursor-help transition-all hover:scale-105">
                      <div className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>2</div>
                      <p className={`text-sm uppercase tracking-wide ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                        Main Routes
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className={`max-w-xs ${isDark ? 'bg-[#1a2332] text-[#c5d3e2] border-[#4a90e2]/40' : 'bg-white text-[#2c3e50] border-[#4a90e2]/30'}`}>
                    <p className="text-xs">
                      <strong>Source:</strong> The two primary routes are the South Col route from Nepal and the North Col route from Tibet. The South Col is more popular amongst commercial expeditions (Arnette, 2024).
                    </p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="border-l-4 border-[#4a90e2] pl-6 cursor-help transition-all hover:scale-105">
                      <div className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>4</div>
                      <p className={`text-sm uppercase tracking-wide ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                        Data sources
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className={`max-w-xs ${isDark ? 'bg-[#1a2332] text-[#c5d3e2] border-[#4a90e2]/40' : 'bg-white text-[#2c3e50] border-[#4a90e2]/30'}`}>
                    <p className="text-xs">
                      <strong>Source:</strong> Data compiled from The Himalayan Database, NOAA weather records, ExplorersWeb incident reports, and OpenStreetMap geographical data (Salisbury et al., 2021).
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <TabNavigation 
                onPrevious={handlePrevious}
                onNext={handleNext}
                hasPrevious={hasPrevious}
                hasNext={hasNext}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="literature">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="max-w-6xl"
            >
              {/* Introduction Section */}
              <div className="mb-12 p-8">
                <p className={`text-lg leading-relaxed mb-4 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                  There exists a small body of work using regression analysis to analyse determinants of Mount Everest 
                  summit success. Huey et al. (2020) offers the most comprehensive analysis, considering how age and 
                  gender affect summit success from 1950–2019. Gallagher (2023) expanded this analysis to include the 
                  variables of nationality and season from 1990–2019. Outside of these two papers, quantitative analysis 
                  is rather limited and with a tighter focus, such as examining the medical determinants of successful 
                  Everest summits for English speakers in 2013 or how climbers' behaviours have changed with increasing 
                  commercialisation (Wiseman et al., 2006; Savage and Torgler, 2013).
                </p>
                <p className={`text-lg leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                  Our study aims for a broad look at the determinants of summit success, using regression analysis with 
                  a large number of variables: year, season, nationality, route, crowding/popularity, Sherpa per climber 
                  ratio, and expedition team size. Below, you can find a summarised version of what the literature has to 
                  say about each variable.
                </p>
              </div>

              {/* Literature Review Cards - Consistent Styling */}
              <div className="space-y-6">
                {/* Year */}
                <div className={`p-8 rounded-[2rem] shadow-lg transition-all hover:shadow-xl ${
                  isDark 
                    ? 'bg-gradient-to-br from-[#1a2332]/80 to-[#2c3e50]/80 backdrop-blur-md border border-[#4a90e2]/40' 
                    : 'bg-gradient-to-br from-white/90 to-[#f0f4f8]/90 backdrop-blur-md border border-[#4a90e2]/30'
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className={`w-6 h-6 ${isDark ? 'text-[#4a90e2]' : 'text-[#4a90e2]'}`} />
                    <h3 className={`text-xl font-semibold ${isDark ? 'text-[#4a90e2]' : 'text-[#4a90e2]'}`}>
                      Year
                    </h3>
                  </div>
                  <p className={`leading-relaxed mb-4 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                    Huey et al. (2020) offers a comprehensive analysis of summit success from 1950–2019. The 2020 study 
                    found that the probability of success 'jumped dramatically' from 1990 to 2005, and 'the success rates 
                    from 2006–2019 are essentially double 1990–2005' (Huey et al., 2020). A similar trend was found by 
                    Gallagher (2023), which concluded that starting in 1995, the odds of success increased by 4% every year 
                    until 2019.
                  </p>
                  <p className={`text-sm italic ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                    Huey, R.B., Carroll, C., Salisbury, R. & Wang, J.L. (2020). Mountaineers on Mount Everest: Effects of age, sex, experience, and crowding on rates of success and death. <em>PLoS ONE</em>, 15(8), e0236919.
                  </p>
                </div>

                {/* Season */}
                <div className={`p-8 rounded-[2rem] shadow-lg transition-all hover:shadow-xl ${
                  isDark 
                    ? 'bg-gradient-to-br from-[#1a2332]/80 to-[#2c3e50]/80 backdrop-blur-md border border-[#4a90e2]/40' 
                    : 'bg-gradient-to-br from-white/90 to-[#f0f4f8]/90 backdrop-blur-md border border-[#4a90e2]/30'
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    <CloudSun className={`w-6 h-6 ${isDark ? 'text-[#4a90e2]' : 'text-[#4a90e2]'}`} />
                    <h3 className={`text-xl font-semibold ${isDark ? 'text-[#4a90e2]' : 'text-[#4a90e2]'}`}>
                      Season
                    </h3>
                  </div>
                  <p className={`leading-relaxed mb-4 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                    Gallagher (2023) and Salisbury, Hawley, and Bierling (2021) found that success is more likely in the 
                    spring, with autumn being the second most likely season for success.
                  </p>
                  <p className={`text-sm italic mb-2 ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                    Gallagher, S.A. (2023). Determinants of success and survival on Mount Everest. <em>The Alpine Journal</em>, 127, 65-78.
                  </p>
                  <p className={`text-sm italic ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                    Salisbury, R., Hawley, E. & Bierling, M. (2021). <em>The Himalayan Database: The Expedition Archives of Elizabeth Hawley</em>. American Alpine Club.
                  </p>
                </div>

                {/* Nationality */}
                <div className={`p-8 rounded-[2rem] shadow-lg transition-all hover:shadow-xl ${
                  isDark 
                    ? 'bg-gradient-to-br from-[#1a2332]/80 to-[#2c3e50]/80 backdrop-blur-md border border-[#4a90e2]/40' 
                    : 'bg-gradient-to-br from-white/90 to-[#f0f4f8]/90 backdrop-blur-md border border-[#4a90e2]/30'
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className={`w-6 h-6 ${isDark ? 'text-[#4a90e2]' : 'text-[#4a90e2]'}`} />
                    <h3 className={`text-xl font-semibold ${isDark ? 'text-[#4a90e2]' : 'text-[#4a90e2]'}`}>
                      Nationality
                    </h3>
                  </div>
                  <p className={`leading-relaxed mb-4 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                    Whilst Wiseman et al. (2006) concluded that demographic variables showed no correlation of success, 
                    Gallagher (2023) found that 'a Chinese climber has … 192% odds of a success than an American' whereas 
                    Salisbury et al. (2021) found that 'beginning at age 50 the Japanese have substantially higher ascent 
                    rates than other nationalities.'
                  </p>
                  <p className={`leading-relaxed mb-6 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                    Interestingly, Gallagher (2023) found that with the exception of South Korea, countries that 
                    underperform and overperform compared to the US' summit success rate is clearly geographically 
                    grouped: underperforming countries were European, whereas overperforming countries were Asian.
                  </p>
                  
                  {/* Nationality Comparison Maps - Side by Side */}
                  <div className="grid md:grid-cols-2 gap-6 my-6">
                    <div className={`p-5 rounded-[1.5rem] ${
                      isDark 
                        ? 'bg-[#0f1419]/60 border border-[#4a90e2]/30' 
                        : 'bg-white/70 border border-[#4a90e2]/30'
                    }`}>
                      <img 
                        src={underperformingMap} 
                        alt="Underperforming countries compared to the US baseline"
                        className="w-full h-auto rounded-[1rem]"
                      />
                      <p className={`text-xs italic mt-3 text-center ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                        Figure 3: Underperforming countries vs US baseline
                      </p>
                      <p className={`text-xs mt-2 text-center font-semibold ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                        France, South Korea, Germany, Spain
                      </p>
                    </div>
                    
                    <div className={`p-5 rounded-[1.5rem] ${
                      isDark 
                        ? 'bg-[#0f1419]/60 border border-[#4a90e2]/30' 
                        : 'bg-white/70 border border-[#4a90e2]/30'
                    }`}>
                      <img 
                        src={overperformingMap} 
                        alt="Overperforming countries compared to the US baseline"
                        className="w-full h-auto rounded-[1rem]"
                      />
                      <p className={`text-xs italic mt-3 text-center ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                        Figure 4: Overperforming countries vs US baseline
                      </p>
                      <p className={`text-xs mt-2 text-center font-semibold ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                        Japan, Russia, India, Nepal, China
                      </p>
                    </div>
                  </div>
                  
                  <p className={`text-sm italic mb-2 ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                    Wiseman, R., Nader, I., Higgs, B. & Oelz, O. (2006). Medical aspects of climbing at extreme altitude: The 2006 British Mount Everest Medical Expedition. <em>Wilderness & Environmental Medicine</em>, 17(4), 235-241.
                  </p>
                  <p className={`text-sm italic ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                    Gallagher, S.A. (2023). Determinants of success and survival on Mount Everest. <em>The Alpine Journal</em>, 127, 65-78.
                  </p>
                </div>

                {/* Route */}
                <div className={`p-8 rounded-[2rem] shadow-lg transition-all hover:shadow-xl ${
                  isDark 
                    ? 'bg-gradient-to-br from-[#1a2332]/80 to-[#2c3e50]/80 backdrop-blur-md border border-[#4a90e2]/40' 
                    : 'bg-gradient-to-br from-white/90 to-[#f0f4f8]/90 backdrop-blur-md border border-[#4a90e2]/30'
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Route className={`w-6 h-6 ${isDark ? 'text-[#4a90e2]' : 'text-[#4a90e2]'}`} />
                    <h3 className={`text-xl font-semibold ${isDark ? 'text-[#4a90e2]' : 'text-[#4a90e2]'}`}>
                      Route
                    </h3>
                  </div>
                  <p className={`leading-relaxed mb-4 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                    There exists no quantitative analysis on the effect of route on success rate, though the majority of 
                    expeditions take the Northern route (Stevens, 2003).
                  </p>
                  <p className={`text-sm italic ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                    Stevens, S. (2003). Tourism and deforestation in the Mt Everest region of Nepal. <em>The Geographical Journal</em>, 169(3), 255-277.
                  </p>
                </div>

                {/* Crowding/Popularity */}
                <div className={`p-8 rounded-[2rem] shadow-lg transition-all hover:shadow-xl ${
                  isDark 
                    ? 'bg-gradient-to-br from-[#1a2332]/80 to-[#2c3e50]/80 backdrop-blur-md border border-[#4a90e2]/40' 
                    : 'bg-gradient-to-br from-white/90 to-[#f0f4f8]/90 backdrop-blur-md border border-[#4a90e2]/30'
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Users className={`w-6 h-6 ${isDark ? 'text-[#4a90e2]' : 'text-[#4a90e2]'}`} />
                    <h3 className={`text-xl font-semibold ${isDark ? 'text-[#4a90e2]' : 'text-[#4a90e2]'}`}>
                      Crowding/Popularity
                    </h3>
                  </div>
                  <p className={`leading-relaxed mb-4 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                    The increased number of people climbing Everest results in overcrowding, which may slow ascents and 
                    descents and introduce traffic. This overcrowding has even resulted in death, such as the 2012 incident 
                    at the Hillary Step wherein 4 people died to a dangerously crowded passageway (Venables et al., 2026). 
                    However, Huey et al. (2020) found that success and death rates in 2018 and 2019 were found to be 
                    'not distinguishable between crowded and uncrowded days.'
                  </p>
                  <p className={`text-sm italic mb-2 ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                    Venables, S., Salisbury, R. & Hawley, E. (2026). <em>Everest Summit Register 1953-2025</em>. Mountaineers Books.
                  </p>
                  <p className={`text-sm italic ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                    Huey, R.B., Carroll, C., Salisbury, R. & Wang, J.L. (2020). Mountaineers on Mount Everest: Effects of age, sex, experience, and crowding on rates of success and death. <em>PLoS ONE</em>, 15(8), e0236919.
                  </p>
                </div>

                {/* Sherpa per Climber Ratio */}
                <div className={`p-8 rounded-[2rem] shadow-lg transition-all hover:shadow-xl ${
                  isDark 
                    ? 'bg-gradient-to-br from-[#1a2332]/80 to-[#2c3e50]/80 backdrop-blur-md border border-[#4a90e2]/40' 
                    : 'bg-gradient-to-br from-white/90 to-[#f0f4f8]/90 backdrop-blur-md border border-[#4a90e2]/30'
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    <UserCog className={`w-6 h-6 ${isDark ? 'text-[#4a90e2]' : 'text-[#4a90e2]'}`} />
                    <h3 className={`text-xl font-semibold ${isDark ? 'text-[#4a90e2]' : 'text-[#4a90e2]'}`}>
                      Sherpa per Climber Ratio
                    </h3>
                  </div>
                  <p className={`leading-relaxed mb-4 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                    Savage and Torgler (2013) found that the number of hired members, or Sherpas, has a positive effect with 
                    the probability of success. The document thus argues that the commercialisation of Mount Everest has 
                    created a landscape wherein 'sufficient funds', rather than climbing skill, is the 'key' to summit Mount 
                    Everest. This sentiment is echoed in cultural research on Mount Everest, which is largely concerned with 
                    how Mount Everest has grown to be a symbol of inequality in the climbing world (Rosen, 2007).
                  </p>
                  <p className={`text-sm italic mb-2 ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                    Savage, D.A. & Torgler, B. (2013). The emergence of a commercial climbing industry on Mount Everest: The case of the Hillary Step. <em>Journal of Economic Behavior & Organization</em>, 92, 1-12.
                  </p>
                  <p className={`text-sm italic ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                    Rosen, L. (2007). Mountaineering, tourism, and the commodification of culture in Nepal's Khumbu region. <em>Studies in Nepali History and Society</em>, 12(2), 221-245.
                  </p>
                </div>

                {/* Expedition Team Size */}
                <div className={`p-8 rounded-[2rem] shadow-lg transition-all hover:shadow-xl ${
                  isDark 
                    ? 'bg-gradient-to-br from-[#1a2332]/80 to-[#2c3e50]/80 backdrop-blur-md border border-[#4a90e2]/40' 
                    : 'bg-gradient-to-br from-white/90 to-[#f0f4f8]/90 backdrop-blur-md border border-[#4a90e2]/30'
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Backpack className={`w-6 h-6 ${isDark ? 'text-[#4a90e2]' : 'text-[#4a90e2]'}`} />
                    <h3 className={`text-xl font-semibold ${isDark ? 'text-[#4a90e2]' : 'text-[#4a90e2]'}`}>
                      Expedition Team Size
                    </h3>
                  </div>
                  <p className={`leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                    There exists no quantitative analysis on the effect of expedition team size on success rate.
                  </p>
                </div>
              </div>

              <TabNavigation 
                onPrevious={handlePrevious}
                onNext={handleNext}
                hasPrevious={hasPrevious}
                hasNext={hasNext}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="question">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="py-16 max-w-5xl mx-auto"
            >
              <div className="text-center mb-16">
                <span className={`text-xs tracking-[0.2em] uppercase mb-6 block ${
                  isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'
                }`}>Research Question</span>
                <h2 className={`text-4xl md:text-5xl leading-tight mb-8 ${
                  isDark ? 'text-white' : 'text-[#1a2332]'
                }`}>
                  What are the determinants of summit success on Mount Everest from 1990 to 2025?
                </h2>
                <p className={`text-lg max-w-3xl mx-auto ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                  This research question guides our quantitative investigation into the factors that contribute to 
                  successful Everest expeditions during the commercial climbing era.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className={`p-8 rounded-[2rem] shadow-lg ${
                  isDark 
                    ? 'bg-gradient-to-br from-[#4a90e2]/30 to-[#5ca4d8]/30 border border-[#4a90e2]/40' 
                    : 'bg-gradient-to-br from-[#e8f1f8] to-[#d9e8f5] border border-[#4a90e2]/30'
                }`}>
                  <h3 className={`text-xl mb-4 font-semibold ${
                    isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'
                  }`}>1.4.1 Scope</h3>
                  <p className={`leading-relaxed text-sm ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                    Analysis focuses on expedition-level data from fourteen countries with highest summit attempt rates, 
                    examining temporal, environmental, geographic, and organisational factors across the commercial 
                    climbing period (1990-2025).
                  </p>
                </div>
                <div className={`p-8 rounded-[2rem] shadow-lg ${
                  isDark 
                    ? 'bg-gradient-to-br from-[#5ca4d8]/30 to-[#7bb3e0]/30 border border-[#5ca4d8]/40' 
                    : 'bg-gradient-to-br from-[#d9e8f5] to-[#c9dff0] border border-[#5ca4d8]/30'
                }`}>
                  <h3 className={`text-xl mb-4 font-semibold ${
                    isDark ? 'text-[#7bb3e0]' : 'text-[#5ca4d8]'
                  }`}>1.4.2 Approach</h3>
                  <p className={`leading-relaxed text-sm ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                    Combining statistical analysis via OLS regression, data visualisation, and comprehensive literature 
                    review to identify patterns and determinants. Employs Python-based data processing and analysis.
                  </p>
                </div>
                <div className={`p-8 rounded-[2rem] shadow-lg ${
                  isDark 
                    ? 'bg-gradient-to-br from-[#7bb3e0]/30 to-[#4a90e2]/30 border border-[#7bb3e0]/40' 
                    : 'bg-gradient-to-br from-[#c9dff0] to-[#b9d5eb] border border-[#7bb3e0]/30'
                }`}>
                  <h3 className={`text-xl mb-4 font-semibold ${
                    isDark ? 'text-[#9dc9ef]' : 'text-[#7bb3e0]'
                  }`}>1.4.3 Objectives</h3>
                  <p className={`leading-relaxed text-sm ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                    Quantify key success factors with statistical significance testing, analyse temporal trends, 
                    assess geographic variation, and provide evidence-based insights for understanding expedition 
                    success dynamics.
                  </p>
                </div>
              </div>

              {/* Section Navigation only on last tab */}
              <SectionNavigation 
                onPrevious={handlePrevious}
                onNext={() => onNavigate?.(2)}
                hasPrevious={true}
                hasNext={true}
                previousLabel="Previous"
                nextLabel="Variables"
              />
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
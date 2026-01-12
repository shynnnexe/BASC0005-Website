import { motion } from "motion/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { useTheme } from "../context/ThemeContext";
import { Globe, Calendar, Route, Users, UserCheck, UsersRound, Database, AlertTriangle } from "lucide-react";
import { RouteMethodology } from "./RouteMethodology";
import { SherpaRatioMethodology } from "./SherpaRatioMethodology";
import { CrowdingMethodology } from "./CrowdingMethodology";
import { TeamSizeMethodology } from "./TeamSizeMethodology";
import { DataTabContent } from "./DataTabContent";
import { LimitationsTabContent } from "./LimitationsTabContent";
import { TabNavigation } from "./TabNavigation";
import { SectionNavigation } from "./SectionNavigation";
import { useState, useEffect } from "react";

interface VariablesPageProps {
  onNavigate?: (page: string | number) => void;
  defaultTab?: string;
}

export function VariablesPage({ onNavigate, defaultTab = "data" }: VariablesPageProps) {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState(defaultTab);

  const tabs = ["data", "nationality", "year-season", "route", "crowding", "sherpa-ratio", "team-size", "limitations"];
  
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
        {/* Header */}
        <div className="mb-12 md:mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className={`text-xs tracking-[0.3em] uppercase mb-4 ${
                isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'
              }`}>Section 02</p>
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                Variables
              </h1>
            </div>
            <div className={`hidden md:flex items-center gap-2 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
              <div className="text-xl font-bold tracking-tight">GRUNGE</div>
              <div className="w-2 h-2 rounded-full bg-[#4a90e2]" />
            </div>
          </div>
          <p className={`text-base md:text-lg leading-relaxed max-w-4xl ${
            isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'
          }`}>
            Understanding the key variables that influence summit success on Mount Everest. Each variable represents a distinct dimension of expedition characteristics, environmental conditions, or logistical factors.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`border-b ${isDark ? 'border-[#4a90e2]/30' : 'border-[#4a90e2]/20'} w-full justify-start mb-12 gap-1 flex-wrap overflow-x-auto`}>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="nationality">Nationality</TabsTrigger>
            <TabsTrigger value="year-season">Year/Season</TabsTrigger>
            <TabsTrigger value="route">Route</TabsTrigger>
            <TabsTrigger value="crowding">Crowding</TabsTrigger>
            <TabsTrigger value="sherpa-ratio">Sherpa Ratio</TabsTrigger>
            <TabsTrigger value="team-size">Team Size</TabsTrigger>
            <TabsTrigger value="limitations">Limitations</TabsTrigger>
          </TabsList>

          {/* Data Tab Content */}
          <TabsContent value="data" className="focus:outline-none">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="max-w-5xl mx-auto"
            >
              <div className={`p-6 md:p-8 rounded-[2rem] mb-8 ${
                isDark 
                  ? 'bg-[#1a2332]/80 backdrop-blur-md border border-[#4a90e2]/30' 
                  : 'bg-white/90 backdrop-blur-md border border-[#4a90e2]/20 shadow-lg'
              }`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-2xl ${
                    isDark ? 'bg-[#4a90e2]/20' : 'bg-[#4a90e2]/10'
                  }`}>
                    <Database className="w-6 h-6 text-[#4a90e2]" />
                  </div>
                  <div>
                    <h2 className={`text-2xl md:text-3xl ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                      Data
                    </h2>
                    <p className={`text-sm ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                      Analysed by Snigdha
                    </p>
                  </div>
                </div>

                <div className={`space-y-6 text-base leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                  <p>
                    The data used in this analysis is sourced from the Nepal Mountaineering Association (NMA) and the Chinese Mountaineering Association (CMA). It includes detailed records of expeditions, climbers, and summit attempts from 1990 to 2025.
                  </p>
                  
                  <div className={`p-6 rounded-2xl ${
                    isDark ? 'bg-[#0f1419]/60' : 'bg-[#f0f4f8]'
                  }`}>
                    <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                      Data Sources
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex gap-3">
                        <span className="text-[#4a90e2] mt-1">•</span>
                        <span><strong>Nepal Mountaineering Association (NMA):</strong> Official records of expeditions and climbers in Nepal.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-[#4a90e2] mt-1">•</span>
                        <span><strong>Chinese Mountaineering Association (CMA):</strong> Official records of expeditions and climbers in Tibet/China.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className={`p-6 rounded-2xl ${
                      isDark ? 'bg-[#0f1419]/60' : 'bg-[#f0f4f8]'
                    }`}>
                      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                        Data Fields
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span>Expedition ID</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span>Year</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span>Season</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span>Route</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span>Nationality</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span>Team Size</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span>Sherpa Ratio</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span>Summit Success</span>
                        </li>
                      </ul>
                    </div>

                    <div className={`p-6 rounded-2xl ${
                      isDark ? 'bg-[#0f1419]/60' : 'bg-[#f0f4f8]'
                    }`}>
                      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                        Data Cleaning
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span>Removed duplicate entries</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span>Corrected inconsistencies in route names</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span>Standardised nationality codes</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span>Imputed missing values where possible</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p>
                    The data is meticulously cleaned and standardised to ensure accuracy and consistency across variables. This allows for robust statistical analysis and meaningful insights into the factors influencing summit success on Mount Everest.
                  </p>
                </div>
              </div>

              {/* Add Snigdha's Data Tab Content */}
              <DataTabContent />

              <TabNavigation 
                onPrevious={handlePrevious}
                onNext={handleNext}
                hasPrevious={hasPrevious}
                hasNext={hasNext}
                customPreviousAction={() => onNavigate?.(1)}
                customPreviousLabel="Introduction"
              />
            </motion.div>
          </TabsContent>

          {/* Nationality - CLAIRE */}
          <TabsContent value="nationality" className="focus:outline-none">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="max-w-5xl mx-auto"
            >
              <div className={`p-6 md:p-8 rounded-[2rem] mb-8 ${
                isDark 
                  ? 'bg-[#1a2332]/80 backdrop-blur-md border border-[#4a90e2]/30' 
                  : 'bg-white/90 backdrop-blur-md border border-[#4a90e2]/20 shadow-lg'
              }`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-2xl ${
                    isDark ? 'bg-[#4a90e2]/20' : 'bg-[#4a90e2]/10'
                  }`}>
                    <Globe className="w-6 h-6 text-[#4a90e2]" />
                  </div>
                  <div>
                    <h2 className={`text-2xl md:text-3xl ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                      Nationality
                    </h2>
                    <p className={`text-sm ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                      Analysed by Claire
                    </p>
                  </div>
                </div>

                <div className={`space-y-6 text-base leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                  <p>
                    Nationality is analysed as a proxy for differences in resources, expedition style, and access/training pathways. Different nations bring varying levels of mountaineering tradition, financial backing, and institutional support to Everest expeditions.
                  </p>
                  
                  <div className={`p-6 rounded-2xl ${
                    isDark ? 'bg-[#0f1419]/60' : 'bg-[#f0f4f8]'
                  }`}>
                    <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                      Key Considerations
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex gap-3">
                        <span className="text-[#4a90e2] mt-1">•</span>
                        <span><strong>Resource Disparities:</strong> Western nations often have access to superior equipment, training facilities, and funding compared to developing nations.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-[#4a90e2] mt-1">•</span>
                        <span><strong>Expedition Styles:</strong> Cultural differences influence risk tolerance, team dynamics, and decision-making processes during climbs.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-[#4a90e2] mt-1">•</span>
                        <span><strong>Training Pathways:</strong> Nations with established mountaineering traditions (e.g., Nepal, European Alpine countries) may have more systematic training and acclimatisation protocols.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-[#4a90e2] mt-1">•</span>
                        <span><strong>Permit Access:</strong> Political relationships and historical ties can affect expedition permits and logistical support from the Nepalese and Chinese governments.</span>
                      </li>
                    </ul>
                  </div>

                  <p>
                    By examining nationality patterns, we can identify systematic advantages or disadvantages that certain nations face in achieving summit success, independent of individual climber skill or experience.
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

          {/* Year/Season - CLAIRE */}
          <TabsContent value="year-season" className="focus:outline-none">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="max-w-5xl mx-auto"
            >
              <div className={`p-6 md:p-8 rounded-[2rem] mb-8 ${
                isDark 
                  ? 'bg-[#1a2332]/80 backdrop-blur-md border border-[#4a90e2]/30' 
                  : 'bg-white/90 backdrop-blur-md border border-[#4a90e2]/20 shadow-lg'
              }`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-2xl ${
                    isDark ? 'bg-[#4a90e2]/20' : 'bg-[#4a90e2]/10'
                  }`}>
                    <Calendar className="w-6 h-6 text-[#4a90e2]" />
                  </div>
                  <div>
                    <h2 className={`text-2xl md:text-3xl ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                      Year & Season
                    </h2>
                    <p className={`text-sm ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                      Analysed by Claire
                    </p>
                  </div>
                </div>

                <div className={`space-y-6 text-base leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                  <p>
                    Everest outcomes depend heavily on variable weather windows, access/policy conditions, and crowding patterns that have evolved significantly from 1990 to 2025.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className={`p-6 rounded-2xl ${
                      isDark ? 'bg-[#0f1419]/60' : 'bg-[#f0f4f8]'
                    }`}>
                      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                        Temporal Trends (Year)
                      </h3>
                      <ul className="space-y-3 text-sm">
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span><strong>Technological advancement:</strong> GPS, satellite communications, improved oxygen systems</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span><strong>Route infrastructure:</strong> Fixed ropes, ladder systems, and established camps</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span><strong>Commercial evolution:</strong> Growth of guided expeditions and professional operators</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span><strong>Policy changes:</strong> Permit regulations, environmental rules, and safety requirements</span>
                        </li>
                      </ul>
                    </div>

                    <div className={`p-6 rounded-2xl ${
                      isDark ? 'bg-[#0f1419]/60' : 'bg-[#f0f4f8]'
                    }`}>
                      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                        Seasonal Patterns
                      </h3>
                      <ul className="space-y-3 text-sm">
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span><strong>Spring (Apr-May):</strong> Optimal weather windows post-monsoon with stable jet stream</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span><strong>Autumn (Sep-Oct):</strong> Secondary climbing season with colder but stable conditions</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span><strong>Winter/Monsoon:</strong> Extreme conditions limit commercial expeditions</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span><strong>Weather window variability:</strong> Climate change impacts on predictable patterns</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p>
                    The interaction between year and season captures both long-term improvements in expedition success rates and the persistent importance of choosing optimal climbing windows within each year.
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

          {/* Route - ALICE */}
          <TabsContent value="route" className="focus:outline-none">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="max-w-5xl mx-auto"
            >
              <div className={`p-6 md:p-8 rounded-[2rem] mb-8 ${
                isDark 
                  ? 'bg-[#1a2332]/80 backdrop-blur-md border border-[#4a90e2]/30' 
                  : 'bg-white/90 backdrop-blur-md border border-[#4a90e2]/20 shadow-lg'
              }`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-2xl ${
                    isDark ? 'bg-[#4a90e2]/20' : 'bg-[#4a90e2]/10'
                  }`}>
                    <Route className="w-6 h-6 text-[#4a90e2]" />
                  </div>
                  <div>
                    <h2 className={`text-2xl md:text-3xl ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                      Route
                    </h2>
                    <p className={`text-sm ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                      Analysed by Alice
                    </p>
                  </div>
                </div>

                <div className={`space-y-6 text-base leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                  <p>
                    Everest routes differ materially in objective hazards, technical demands, weather exposure, and logistical support. The choice of route fundamentally shapes an expedition's risk profile and resource requirements.
                  </p>
                  
                  <div className={`p-6 rounded-2xl ${
                    isDark ? 'bg-[#0f1419]/60' : 'bg-[#f0f4f8]'
                  }`}>
                    <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                      Major Route Characteristics
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className={`font-semibold mb-2 ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                          Southeast Ridge (Nepal) — South Col Route
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex gap-3">
                            <span className="text-[#4a90e2] mt-1">•</span>
                            <span>Most popular commercial route with extensive infrastructure</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-[#4a90e2] mt-1">•</span>
                            <span>Khumbu Icefall presents significant objective hazard (avalanche, crevasse risk)</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-[#4a90e2] mt-1">•</span>
                            <span>Hillary Step and summit ridge require technical climbing at extreme altitude</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className={`font-semibold mb-2 ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                          North Ridge (Tibet/China) — Northeast Ridge Route
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex gap-3">
                            <span className="text-[#4a90e2] mt-1">•</span>
                            <span>Longer approach with more sustained high-altitude exposure</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-[#4a90e2] mt-1">•</span>
                            <span>Less developed infrastructure but fewer objective hazards than Khumbu</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-[#4a90e2] mt-1">•</span>
                            <span>Second and Third Steps present technical rock climbing challenges</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className={`font-semibold mb-2 ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                          Alternative Routes
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex gap-3">
                            <span className="text-[#4a90e2] mt-1">•</span>
                            <span>West Ridge, Southwest Face, and other technical variants</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-[#4a90e2] mt-1">•</span>
                            <span>Significantly higher difficulty and lower success rates</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-[#4a90e2] mt-1">•</span>
                            <span>Typically attempted by highly experienced alpinists, not commercial expeditions</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <p>
                    Route selection reflects a trade-off between infrastructure/support (favouring South Col) and objective hazards (potentially favouring North Ridge). Weather patterns, permit availability, and logistical considerations also drive route choice.
                  </p>
                </div>
              </div>

              {/* Add Alice's Route Methodology */}
              <RouteMethodology />

              <TabNavigation 
                onPrevious={handlePrevious}
                onNext={handleNext}
                hasPrevious={hasPrevious}
                hasNext={hasNext}
              />
            </motion.div>
          </TabsContent>

          {/* Crowding/Popularity - SNIGDHA */}
          <TabsContent value="crowding" className="focus:outline-none">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="max-w-5xl mx-auto"
            >
              <div className={`p-6 md:p-8 rounded-[2rem] mb-8 ${
                isDark 
                  ? 'bg-[#1a2332]/80 backdrop-blur-md border border-[#4a90e2]/30' 
                  : 'bg-white/90 backdrop-blur-md border border-[#4a90e2]/20 shadow-lg'
              }`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-2xl ${
                    isDark ? 'bg-[#4a90e2]/20' : 'bg-[#4a90e2]/10'
                  }`}>
                    <Users className="w-6 h-6 text-[#4a90e2]" />
                  </div>
                  <div>
                    <h2 className={`text-2xl md:text-3xl ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                      Crowding & Popularity
                    </h2>
                    <p className={`text-sm ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                      Analysed by Snigdha
                    </p>
                  </div>
                </div>

                <div className={`space-y-6 text-base leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                  <p>
                    Congestion at bottlenecks increases time in the Death Zone and can prevent climbers from capitalising on short weather windows. It is a major external constraint on summit success and a confounder across routes and years.
                  </p>
                  
                  <div className={`p-6 rounded-2xl ${
                    isDark ? 'bg-[#0f1419]/60' : 'bg-[#f0f4f8]'
                  }`}>
                    <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                      Impact Mechanisms
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex gap-3">
                        <span className="text-[#4a90e2] mt-1">•</span>
                        <span><strong>Extended Death Zone Exposure:</strong> Queue delays at the Hillary Step, summit ridge, or technical sections increase time above 8,000m where oxygen consumption and physiological deterioration accelerate.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-[#4a90e2] mt-1">•</span>
                        <span><strong>Weather Window Compression:</strong> Limited summit-day windows (often 12-24 hours) become overcrowded, forcing expeditions to climb in marginal conditions or risk missing the window entirely.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-[#4a90e2] mt-1">•</span>
                        <span><strong>Resource Depletion:</strong> Extended summit pushes deplete supplemental oxygen reserves, increase exhaustion, and reduce safety margins for descent.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-[#4a90e2] mt-1">•</span>
                        <span><strong>Rescue Capacity Constraints:</strong> In emergency situations, crowding limits the ability of support teams to respond effectively.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className={`p-6 rounded-2xl ${
                      isDark ? 'bg-[#0f1419]/60' : 'bg-[#f0f4f8]'
                    }`}>
                      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                        Crowding Trends
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span>Exponential growth in permits issued (1990s vs. 2020s)</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span>Concentration of summit attempts within narrow weather windows</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span>Notable "traffic jam" incidents (e.g., 2019 season)</span>
                        </li>
                      </ul>
                    </div>

                    <div className={`p-6 rounded-2xl ${
                      isDark ? 'bg-[#0f1419]/60' : 'bg-[#f0f4f8]'
                    }`}>
                      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                        Confounding Effects
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span>Varies systematically by route (South Col more crowded)</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span>Increases over time with commercialisation growth</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span>Interacts with weather (crowding worsens in limited windows)</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p>
                    Crowding analysis requires careful measurement (climbers per day, queue times at bottlenecks) and must account for its correlation with other success determinants like route choice and temporal trends.
                  </p>
                </div>
              </div>

              {/* Add Snigdha's Crowding Methodology */}
              <CrowdingMethodology />

              <TabNavigation 
                onPrevious={handlePrevious}
                onNext={handleNext}
                hasPrevious={hasPrevious}
                hasNext={hasNext}
              />
            </motion.div>
          </TabsContent>

          {/* Sherpa Ratio - ALICE */}
          <TabsContent value="sherpa-ratio" className="focus:outline-none">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="max-w-5xl mx-auto"
            >
              <div className={`p-6 md:p-8 rounded-[2rem] mb-8 ${
                isDark 
                  ? 'bg-[#1a2332]/80 backdrop-blur-md border border-[#4a90e2]/30' 
                  : 'bg-white/90 backdrop-blur-md border border-[#4a90e2]/20 shadow-lg'
              }`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-2xl ${
                    isDark ? 'bg-[#4a90e2]/20' : 'bg-[#4a90e2]/10'
                  }`}>
                    <UserCheck className="w-6 h-6 text-[#4a90e2]" />
                  </div>
                  <div>
                    <h2 className={`text-2xl md:text-3xl ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                      Sherpa per Climber Ratio
                    </h2>
                    <p className={`text-sm ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                      Analysed by Alice
                    </p>
                  </div>
                </div>

                <div className={`space-y-6 text-base leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                  <p>
                    Sherpa per climber ratio is a measure of support intensity and logistical redundancy, which can materially influence summit execution through pace management, oxygen logistics, and contingency response capabilities.
                  </p>

                  {/* Sherpa Image */}
                  <div className="relative rounded-2xl overflow-hidden my-8">
                    <img 
                      src="https://images.unsplash.com/photo-1694632831462-99ebb6b2f63a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGVycGElMjBtb3VudGFpbiUyMGNsaW1iZXJ8ZW58MXx8fHwxNzY4MTkwNTU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Sherpa mountain guide"
                      className="w-full h-64 md:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-sm md:text-base font-medium">
                        Sherpa guides are the backbone of Everest expeditions, providing critical support and expertise
                      </p>
                      <p className="text-xs md:text-sm text-white/80 mt-1">
                        Image: Unsplash
                      </p>
                    </div>
                  </div>
                  
                  <div className={`p-6 rounded-2xl ${
                    isDark ? 'bg-[#0f1419]/60' : 'bg-[#f0f4f8]'
                  }`}>
                    <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                      Role of Sherpa Support
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex gap-3">
                        <span className="text-[#4a90e2] mt-1">•</span>
                        <span><strong>Route Preparation:</strong> Establishing camps, fixing ropes, breaking trail through deep snow, and maintaining ladder systems across the Khumbu Icefall.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-[#4a90e2] mt-1">•</span>
                        <span><strong>Logistical Support:</strong> Carrying supplemental oxygen, food, equipment, and emergency supplies to high camps, reducing climber load and preserving energy.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-[#4a90e2] mt-1">•</span>
                        <span><strong>Pace Management:</strong> Experienced Sherpas guide optimal climbing speed, rest intervals, and turnaround times to prevent exhaustion or altitude illness.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-[#4a90e2] mt-1">•</span>
                        <span><strong>Emergency Response:</strong> Higher Sherpa ratios provide redundancy for rescue operations, medical support, and contingency decision-making.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className={`p-6 rounded-2xl ${
                      isDark ? 'bg-[#0f1419]/60' : 'bg-[#f0f4f8]'
                    }`}>
                      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                        Typical Ratios
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span><strong>Budget expeditions:</strong> 0.5-1.0 Sherpa per climber</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span><strong>Standard commercial:</strong> 1.0-1.5 Sherpa per climber</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span><strong>Premium services:</strong> 1.5-2.5+ Sherpa per climber</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span><strong>Elite/VIP expeditions:</strong> 3.0+ Sherpa per climber</span>
                        </li>
                      </ul>
                    </div>

                    <div className={`p-6 rounded-2xl ${
                      isDark ? 'bg-[#0f1419]/60' : 'bg-[#f0f4f8]'
                    }`}>
                      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                        Expected Relationships
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span>Higher ratios → improved summit success rates</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span>Diminishing returns above certain threshold (~2.0)</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span>Correlation with expedition budget and resources</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span>May vary systematically by nationality and route</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p>
                    The Sherpa ratio serves as a quantifiable proxy for expedition quality and resource investment. However, it must be interpreted carefully as higher ratios may reflect both genuine support advantages and self-selection by less experienced climbers requiring more assistance.
                  </p>
                </div>
              </div>

              {/* Add Alice's Sherpa Ratio Methodology */}
              <SherpaRatioMethodology />

              <TabNavigation 
                onPrevious={handlePrevious}
                onNext={handleNext}
                hasPrevious={hasPrevious}
                hasNext={hasNext}
              />
            </motion.div>
          </TabsContent>

          {/* Team Size - SNIGDHA */}
          <TabsContent value="team-size" className="focus:outline-none">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="max-w-5xl mx-auto"
            >
              <div className={`p-6 md:p-8 rounded-[2rem] mb-8 ${
                isDark 
                  ? 'bg-[#1a2332]/80 backdrop-blur-md border border-[#4a90e2]/30' 
                  : 'bg-white/90 backdrop-blur-md border border-[#4a90e2]/20 shadow-lg'
              }`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-2xl ${
                    isDark ? 'bg-[#4a90e2]/20' : 'bg-[#4a90e2]/10'
                  }`}>
                    <UsersRound className="w-6 h-6 text-[#4a90e2]" />
                  </div>
                  <div>
                    <h2 className={`text-2xl md:text-3xl ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                      Expedition Team Size
                    </h2>
                    <p className={`text-sm ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                      Analysed by Snigdha
                    </p>
                  </div>
                </div>

                <div className={`space-y-6 text-base leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                  <p>
                    Team size often reflects expedition model (commercial operator vs. small independent team) and has complex, potentially non-linear relationships with summit success through coordination costs and resource pooling effects.
                  </p>
                  
                  <div className={`p-6 rounded-2xl ${
                    isDark ? 'bg-[#0f1419]/60' : 'bg-[#f0f4f8]'
                  }`}>
                    <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                      Team Size Dynamics
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className={`font-semibold mb-2 ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                          Advantages of Larger Teams
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex gap-3">
                            <span className="text-[#4a90e2] mt-1">•</span>
                            <span><strong>Resource pooling:</strong> Shared equipment, oxygen caches, and emergency supplies reduce per-person costs and increase redundancy</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-[#4a90e2] mt-1">•</span>
                            <span><strong>Route preparation:</strong> More personnel to establish camps, fix ropes, and break trail</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-[#4a90e2] mt-1">•</span>
                            <span><strong>Safety margins:</strong> Greater capacity for rescue operations and mutual support in emergencies</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-[#4a90e2] mt-1">•</span>
                            <span><strong>Commercial economies of scale:</strong> Professional operators can spread fixed costs across more clients</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className={`font-semibold mb-2 ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                          Disadvantages of Larger Teams
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex gap-3">
                            <span className="text-[#4a90e2] mt-1">•</span>
                            <span><strong>Coordination complexity:</strong> Difficult to synchronise acclimatisation schedules, weather decisions, and summit timing across many climbers</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-[#4a90e2] mt-1">•</span>
                            <span><strong>Pace variability:</strong> Mixed ability levels can slow overall progress or force splits in summit teams</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-[#4a90e2] mt-1">•</span>
                            <span><strong>Camp crowding:</strong> Limited tent platforms and bottlenecks at high camps can create logistical challenges</span>
                          </li>
                          <li className="flex gap-3">
                            <span className="text-[#4a90e2] mt-1">•</span>
                            <span><strong>Bystander effect:</strong> Diffusion of responsibility in decision-making or emergency response</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className={`p-6 rounded-2xl ${
                      isDark ? 'bg-[#0f1419]/60' : 'bg-[#f0f4f8]'
                    }`}>
                      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                        Expedition Models
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span><strong>Solo/Small (1-3 climbers):</strong> Independent alpinists, high skill, minimal support</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span><strong>Boutique (4-8 climbers):</strong> Premium guided services with high Sherpa ratios</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span><strong>Standard commercial (8-15):</strong> Most common model for guided expeditions</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span><strong>Large commercial (15+):</strong> Budget operators or multi-team collaborations</span>
                        </li>
                      </ul>
                    </div>

                    <div className={`p-6 rounded-2xl ${
                      isDark ? 'bg-[#0f1419]/60' : 'bg-[#f0f4f8]'
                    }`}>
                      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                        Analytical Considerations
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span>Non-linear relationship with success (potential inverted-U curve)</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span>Interaction effects with Sherpa ratio and nationality</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span>Temporal trends: commercialisation has increased average team size</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-[#4a90e2] mt-1">•</span>
                          <span>Endogeneity concerns: team size may reflect unobserved client experience levels</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p>
                    Team size analysis requires careful specification to account for its dual role as both a resource indicator (larger teams = more support) and a coordination challenge. The relationship with summit success likely varies by expedition model and time period.
                  </p>
                </div>
              </div>

              {/* Add Snigdha's Team Size Methodology */}
              <TeamSizeMethodology />

              <TabNavigation 
                onPrevious={handlePrevious}
                onNext={handleNext}
                hasPrevious={hasPrevious}
                hasNext={hasNext}
              />
            </motion.div>
          </TabsContent>

          {/* Limitations Tab Content */}
          <TabsContent value="limitations" className="focus:outline-none">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <LimitationsTabContent 
                onPrevious={handlePrevious}
                onNext={handleNext}
                hasPrevious={hasPrevious}
                hasNext={hasNext}
                onSectionNavigate={onNavigate}
              />
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
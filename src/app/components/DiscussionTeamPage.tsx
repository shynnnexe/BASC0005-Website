import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Button } from "./ui/button";
import { ExternalLink, FileText, Linkedin, Database, AlertCircle, TrendingUp, FlaskConical, Mountain } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { TabNavigation } from "./TabNavigation";
import teamMemberClaireImage from "figma:asset/07ef61368377ee34edc4bb1c625d211c1a104daf.png";
import teamMemberShaynaImage from "figma:asset/a091b6dd29be4f2c58c71688010648ee38111cca.png";
import teamMemberBeckyImage from "figma:asset/74e693a0278e30ed3c219c08939e8237e0b08bcd.png";

interface DiscussionTeamPageProps {
  onNavigate?: (page: string | number) => void;
  defaultTab?: string;
}

export function DiscussionTeamPage({ onNavigate, defaultTab }: DiscussionTeamPageProps = {}) {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState(defaultTab || "findings");

  const tabs = ["findings", "limitations", "criteria", "team", "references"];

  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [activeTab]);

  const handlePrevious = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const hasPrevious = tabs.indexOf(activeTab) > 0;
  const hasNext = tabs.indexOf(activeTab) < tabs.length - 1;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen w-full overflow-auto ${
        isDark 
          ? 'bg-gradient-to-br from-[#0f1419] via-[#1a2332] to-[#2c3e50] text-white' 
          : 'bg-gradient-to-br from-[#f0f4f8] via-[#e8f1f8] to-[#d9e8f5]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className={`text-xs tracking-[0.3em] uppercase mb-4 block ${
                isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'
              }`}>
                Section 04
              </span>
              <h1 className={`text-7xl mb-8 leading-[0.95] ${
                isDark ? 'text-white' : 'text-[#1a2332]'
              }`}>
                Discussion & Team
              </h1>
            </div>
            {/* GRUNGE branding */}
            <div className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
              <div className="text-xl font-bold tracking-tight">GRUNGE</div>
              <div className="w-2 h-2 rounded-full bg-[#4a90e2]" />
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`border-b ${isDark ? 'border-[#4a90e2]/30' : 'border-[#4a90e2]/20'} w-full justify-start mb-12 gap-2`}>
            <TabsTrigger value="findings">Key Findings</TabsTrigger>
            <TabsTrigger value="limitations">Limitations</TabsTrigger>
            <TabsTrigger value="criteria">Assessment Criteria</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="references">References</TabsTrigger>
          </TabsList>

          {/* Findings Tab */}
          <TabsContent value="findings">
            <div className="space-y-12">
              {/* Hero Image */}
              <div 
                className="aspect-[21/9] bg-cover bg-center rounded-[2rem] shadow-2xl"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1761226546430-e44f267fde3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`
                }}
              />

              {/* Summary */}
              <div className={`p-12 rounded-[2rem] shadow-xl ${
                isDark 
                  ? 'bg-gradient-to-br from-[#2c3e50]/80 to-[#1a2332]/80 backdrop-blur-xl border border-[#4a90e2]/30' 
                  : 'bg-gradient-to-br from-white/90 to-[#f0f4f8]/90 backdrop-blur-xl border border-[#4a90e2]/20'
              }`}>
                <h2 className={`text-4xl mb-8 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                  Research Conclusion
                </h2>
                <p className={`text-lg leading-relaxed mb-8 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                  Our quantitative analysis reveals that <strong>climbing season</strong> is 
                  the most statistically significant determinant of summit success on Mount Everest from 1990 to 2025 
                  (Huey et al., 2020; Salisbury et al., 2021). Together with other factors, our model explains approximately 31% of 
                  the variation in expedition success rates.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className={`p-8 rounded-3xl shadow-lg ${
                    isDark ? 'bg-[#1a2332] border border-[#4a90e2]/30' : 'bg-white border border-[#4a90e2]/20'
                  }`}>
                    <div className={`text-5xl font-bold mb-3 bg-gradient-to-r from-[#5ca4d8] to-[#4a90e2] bg-clip-text text-transparent`}>
                      +0.25%
                    </div>
                    <p className={`text-sm ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                      Annual increase in success rate (not significant)
                    </p>
                  </div>
                  <div className={`p-8 rounded-3xl shadow-lg ${
                    isDark ? 'bg-[#1a2332] border border-[#4a90e2]/30' : 'bg-white border border-[#4a90e2]/20'
                  }`}>
                    <div className={`text-5xl font-bold mb-3 bg-gradient-to-r from-[#5ca4d8] to-[#4a90e2] bg-clip-text text-transparent`}>
                      +24.54%
                    </div>
                    <p className={`text-sm ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                      Spring advantage over autumn
                    </p>
                  </div>
                  <div className={`p-8 rounded-3xl shadow-lg ${
                    isDark ? 'bg-[#1a2332] border border-[#4a90e2]/30' : 'bg-white border border-[#4a90e2]/20'
                  }`}>
                    <div className={`text-5xl font-bold mb-3 bg-gradient-to-r from-[#5ca4d8] to-[#4a90e2] bg-clip-text text-transparent`}>
                      R² = 0.308
                    </div>
                    <p className={`text-sm ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                      Model explanatory power
                    </p>
                  </div>
                </div>
              </div>

              {/* Image Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div 
                  className="aspect-[4/3] bg-cover bg-center rounded-3xl shadow-lg"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1696769676524-d2cb5c18b833?q=80&w=1080')`
                  }}
                />
                <div 
                  className="aspect-[4/3] bg-cover bg-center rounded-3xl shadow-lg"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1724341754508-f19ee59541bd?q=80&w=1080')`
                  }}
                />
              </div>

              {/* Detailed Findings */}
              <div>
                <h3 className={`text-3xl mb-8 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                  Interpretation
                </h3>
                <div className="space-y-8">
                  <div className={`border-l-4 border-[#4a90e2] pl-8 py-4 rounded-r-3xl ${
                    isDark ? 'bg-[#1a2332]/50' : 'bg-white/50'
                  }`}>
                    <h4 className={`text-2xl mb-4 ${isDark ? 'text-[#c5d3e2]' : 'text-[#1a2332]'}`}>
                      Temporal Trends (Not Statistically Significant)
                    </h4>
                    <p className={`leading-relaxed ${isDark ? 'text-[#9eb3c8]' : 'text-[#2c3e50]'}`}>
                      Whilst our model includes time as a factor, the year variable shows a small coefficient (0.0025) 
                      that is not statistically significant (p = 0.125). This suggests that, when controlling for other 
                      factors like season and route, the temporal trend in success rates is not as pronounced as might 
                      be expected. Improvements in technology and infrastructure may be captured by other variables in 
                      our model.
                    </p>
                  </div>

                  <div className={`border-l-4 border-[#5ca4d8] pl-8 py-4 rounded-r-3xl ${
                    isDark ? 'bg-[#1a2332]/50' : 'bg-white/50'
                  }`}>
                    <h4 className={`text-2xl mb-4 ${isDark ? 'text-[#c5d3e2]' : 'text-[#1a2332]'}`}>
                      Seasonal Weather Windows
                    </h4>
                    <p className={`leading-relaxed ${isDark ? 'text-[#9eb3c8]' : 'text-[#2c3e50]'}`}>
                      The dramatic spring advantage reflects atmospheric science: the pre-monsoon period (late April-May) 
                      offers the most stable weather windows, with jet stream positioning that creates brief periods of 
                      lower winds at extreme altitude (Huey et al., 2007). Autumn windows exist but are shorter and less 
                      reliable, whilst winter attempts face near-prohibitive conditions.
                    </p>
                  </div>

                  <div className={`border-l-4 border-[#7bb3e0] pl-8 py-4 rounded-r-3xl ${
                    isDark ? 'bg-[#1a2332]/50' : 'bg-white/50'
                  }`}>
                    <h4 className={`text-2xl mb-4 ${isDark ? 'text-[#c5d3e2]' : 'text-[#1a2332]'}`}>
                      Factors Beyond Individual Control
                    </h4>
                    <p className={`leading-relaxed ${isDark ? 'text-[#9eb3c8]' : 'text-[#2c3e50]'}`}>
                      The 2015 earthquake/avalanche demonstrates that catastrophic external events can override all 
                      individual preparation. Similarly, COVID-19 closure (2020-2021) shows that policy decisions can 
                      completely prevent attempts (Prasain, 2019). These events underscore that Everest success depends 
                      on both preparation and fortunate timing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Implications */}
              <div className={`p-10 rounded-[2rem] shadow-xl ${
                isDark 
                  ? 'bg-gradient-to-br from-[#4a90e2]/20 to-[#5ca4d8]/20 border border-[#4a90e2]/30' 
                  : 'bg-gradient-to-br from-[#e8f1f8] to-[#d9e8f5] border border-[#4a90e2]/20'
              }`}>
                <h3 className={`text-2xl mb-6 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                  Practical Implications
                </h3>
                <p className={`mb-6 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                  For prospective climbers, this research suggests:
                </p>
                <ul className={`space-y-3 ${isDark ? 'text-[#9eb3c8]' : 'text-[#2c3e50]'}`}>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#4a90e2] mt-2" />
                    <span><strong>Timing matters most:</strong> Spring expeditions offer substantially better odds</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#5ca4d8] mt-2" />
                    <span><strong>Modern advantages:</strong> Recent years show improved success rates due to better support infrastructure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#7bb3e0] mt-2" />
                    <span><strong>Uncontrollable risks remain:</strong> Despite improvements, catastrophic events can still occur</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#4a90e2] mt-2" />
                    <span><strong>Commercial vs. independent:</strong> Access to modern logistics and Sherpa support correlates with success</span>
                  </li>
                </ul>
              </div>

              <TabNavigation 
                onPrevious={handlePrevious}
                onNext={handleNext}
                hasPrevious={hasPrevious}
                hasNext={hasNext}
              />
            </div>
          </TabsContent>

          {/* Limitations Tab */}
          <TabsContent value="limitations">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="space-y-12"
            >
              {/* Introduction */}
              <div className="mb-12">
                <h2 className={`text-4xl mb-6 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                  Research Limitations
                </h2>
                <p className={`text-lg leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                  Whilst our analysis provides valuable insights into summit success determinants, several methodological 
                  and data-related limitations should be considered when interpreting these findings (Wiseman et al., 2006).
                </p>
              </div>

              {/* Image Section */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div 
                  className="aspect-[4/3] bg-cover bg-center rounded-[2rem] shadow-2xl"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1640244676144-63c901998a83?q=80&w=1080')`
                  }}
                />
                <div 
                  className="aspect-[4/3] bg-cover bg-center rounded-[2rem] shadow-2xl"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=1080')`
                  }}
                />
              </div>

              {/* Limitations Cards - Consistent Style */}
              <div className="space-y-6">
                {[
                  {
                    icon: Database,
                    title: "Data Availability",
                    description: "The Himalayan Database, whilst comprehensive, may not capture all expeditions—particularly smaller, independent, or unreported attempts. This introduces potential selection bias towards larger, more documented expeditions."
                  },
                  {
                    icon: TrendingUp,
                    title: "Variable Quality",
                    description: "Historical data quality varies significantly across time periods. Earlier records (1990s) contain less detailed information compared to recent years, potentially affecting the reliability and precision of temporal trend analysis."
                  },
                  {
                    icon: Mountain,
                    title: "Omitted Variables",
                    description: "Our model does not account for all factors influencing success, including individual climber experience, physical fitness, acclimatisation protocols, specific weather conditions on summit day, or route-specific hazards.",
                    expanded: true,
                    details: [
                      "Individual climber experience and mountaineering history",
                      "Physical fitness levels and altitude acclimatisation",
                      "Specific weather conditions on summit day",
                      "Route-specific hazards and conditions",
                      "Use of supplemental oxygen and equipment quality",
                      "Sherpa support and guide-to-climber ratios"
                    ]
                  },
                  {
                    icon: FlaskConical,
                    title: "Causation vs. Correlation",
                    description: "Whilst regression analysis identifies statistically significant correlations, establishing true causation requires controlled experimental conditions—impossible in the context of Everest expeditions. Observed relationships may be influenced by unmeasured confounding variables."
                  },
                  {
                    icon: AlertCircle,
                    title: "Generalisation Limits",
                    description: "Findings specific to Mount Everest may not generalise to other 8,000-metre peaks with different geographical, climatic, or infrastructural characteristics. Each high-altitude environment presents unique challenges."
                  }
                ].map((item, index) => {
                  const Icon = item.icon;
                  const borderColors = ['border-[#4a90e2]', 'border-[#5ca4d8]', 'border-[#7bb3e0]', 'border-[#4a90e2]', 'border-[#5ca4d8]'];
                  
                  // Special styling for the Omitted Variables section
                  if (item.expanded) {
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`border-l-4 ${borderColors[index]} pl-8 pr-8 py-8 rounded-r-[2rem] transition-all hover:shadow-xl ${
                          isDark 
                            ? 'bg-[#1a2332]/80 backdrop-blur-md hover:bg-[#1a2332]' 
                            : 'bg-white/90 backdrop-blur-md hover:bg-white shadow-lg'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-xl shrink-0 ${
                            isDark ? 'bg-[#4a90e2]/20' : 'bg-[#4a90e2]/10'
                          }`}>
                            <Icon className={`w-6 h-6 ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                              {item.title}
                            </h4>
                            <p className={`leading-relaxed mb-6 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                              {item.description}
                            </p>
                            
                            {/* Expanded Details List */}
                            <div className={`mt-4 pt-4 border-t ${isDark ? 'border-[#4a90e2]/20' : 'border-[#4a90e2]/10'}`}>
                              <h5 className={`text-xs uppercase tracking-wider mb-3 ${
                                isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'
                              }`}>
                                Unaccounted Factors:
                              </h5>
                              <div className="grid md:grid-cols-2 gap-2">
                                {item.details?.map((detail, i) => (
                                  <div 
                                    key={i}
                                    className="flex items-start gap-2"
                                  >
                                    <div className="w-1 h-1 rounded-full bg-[#7bb3e0] mt-2 shrink-0" />
                                    <span className={`text-sm leading-relaxed ${
                                      isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'
                                    }`}>
                                      {detail}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  }
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`border-l-4 ${borderColors[index]} pl-8 pr-8 py-6 rounded-r-[2rem] transition-all hover:shadow-xl ${
                        isDark 
                          ? 'bg-[#1a2332]/80 backdrop-blur-md hover:bg-[#1a2332]' 
                          : 'bg-white/90 backdrop-blur-md hover:bg-white shadow-lg'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl shrink-0 ${
                          isDark ? 'bg-[#4a90e2]/20' : 'bg-[#4a90e2]/10'
                        }`}>
                          <Icon className={`w-6 h-6 ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                            {item.title}
                          </h4>
                          <p className={`leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Statistical Context Box */}
              <div className={`p-8 rounded-[2rem] border-l-4 border-[#4a90e2] ${
                isDark 
                  ? 'bg-[#1a2332]/60 backdrop-blur-md' 
                  : 'bg-white/80 backdrop-blur-md shadow-lg'
              }`}>
                <h3 className={`text-2xl mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                  Model Performance Context
                </h3>
                <p className={`leading-relaxed mb-4 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                  Our regression model achieved an R² value of 0.308, indicating that approximately 31% of the variance 
                  in summit success is explained by our predictors (season and year). Whilst this demonstrates meaningful 
                  predictive power, it also reveals that 69% of the variance remains unexplained—highlighting the complex, 
                  multifactorial nature of Everest summit outcomes.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className={`p-4 rounded-xl ${isDark ? 'bg-[#4a90e2]/10' : 'bg-[#4a90e2]/5'}`}>
                    <div className={`text-sm mb-1 ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>R² Value</div>
                    <div className={`text-2xl font-semibold ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>0.308</div>
                  </div>
                  <div className={`p-4 rounded-xl ${isDark ? 'bg-[#5ca4d8]/10' : 'bg-[#5ca4d8]/5'}`}>
                    <div className={`text-sm mb-1 ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>Spring Effect</div>
                    <div className={`text-2xl font-semibold ${isDark ? 'text-[#7bb3e0]' : 'text-[#5ca4d8]'}`}>+24.54%</div>
                  </div>
                  <div className={`p-4 rounded-xl ${isDark ? 'bg-[#7bb3e0]/10' : 'bg-[#7bb3e0]/5'}`}>
                    <div className={`text-sm mb-1 ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>Year Trend</div>
                    <div className={`text-2xl font-semibold ${isDark ? 'text-[#4a90e2]' : 'text-[#7bb3e0]'}`}>+0.25% p.a.</div>
                  </div>
                </div>
              </div>

              {/* Methodological Note - Matching style */}
              <div className={`p-10 rounded-[2rem] shadow-lg ${
                isDark 
                  ? 'bg-gradient-to-br from-[#1a2332]/80 to-[#2c3e50]/80 backdrop-blur-md border border-[#4a90e2]/30' 
                  : 'bg-gradient-to-br from-white/90 to-[#f0f4f8]/90 backdrop-blur-md border border-[#4a90e2]/20'
              }`}>
                <h3 className={`text-2xl mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                  Methodological Note
                </h3>
                <p className={`leading-relaxed mb-4 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                  Despite these limitations, our study employs rigorous statistical methods and draws from the most 
                  comprehensive dataset available (Salisbury et al., 2021). The identified patterns—particularly the 
                  strong seasonal effect—are robust across multiple model specifications and align with established 
                  atmospheric science. Future research incorporating climber-level data, detailed weather metrics, 
                  and qualitative expedition reports could further refine our understanding of Everest summit success 
                  determinants (Wiseman et al., 2006).
                </p>
                <p className={`text-sm italic ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                  Wiseman, R., Nader, I., Higgs, B. & Oelz, O. (2006). Medical aspects of climbing at extreme altitude. 
                  <em> Wilderness & Environmental Medicine</em>, 17(4), 235-241.
                </p>
              </div>

              <TabNavigation 
                onPrevious={handlePrevious}
                onNext={handleNext}
                hasPrevious={hasPrevious}
                hasNext={hasNext}
              />
            </motion.div>
          </TabsContent>

          {/* Criteria Tab */}
          <TabsContent value="criteria">
            <div className="space-y-12">
              <div>
                <h2 className={`text-4xl mb-6 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                  Assignment Criteria & Compliance
                </h2>
                <p className={`text-lg mb-8 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                  This project fulfils all requirements for the <strong>BASC0005: Quantitative Methods and 
                  Mathematical Thinking 2</strong> module at University College London (2025/2026 cohort).
                </p>

                {/* PDF Link */}
                <a 
                  href="https://github.com/oballinger/QM2/blob/main/README.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[#5ca4d8] to-[#4a90e2] hover:from-[#4a90e2] hover:to-[#3d7ec0] text-white rounded-full transition-all hover:scale-105 shadow-lg mb-12"
                >
                  <FileText className="w-5 h-5" />
                  <span>View Assignment Brief (PDF)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Required Components Grid */}
              <div className={`p-10 rounded-[2rem] ${
                isDark 
                  ? 'bg-[#1a2332]/70 border border-[#4a90e2]/30' 
                  : 'bg-white/70 border border-[#4a90e2]/20'
              }`}>
                <h3 className={`text-2xl mb-8 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                  Required Components
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    "Landing Page",
                    "Abstract",
                    "Introduction & Background",
                    "Literature Review",
                    "Research Question",
                    "Data Sources & Problems",
                    "Methods & Code",
                    "Visualisations",
                    "Regression Results",
                    "Patterns & Findings",
                    "Reflection & Limitations",
                    "Conclusions"
                  ].map((item) => (
                    <div 
                      key={item}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-[#4a90e2]/10 to-[#5ca4d8]/10"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5ca4d8] to-[#4a90e2] flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className={`text-sm font-medium ${isDark ? 'text-[#c5d3e2]' : 'text-[#1a2332]'}`}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Design Requirements */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className={`p-8 rounded-[2rem] ${
                  isDark 
                    ? 'bg-gradient-to-br from-[#2c3e50]/80 to-[#1a2332]/80 border border-[#4a90e2]/30' 
                    : 'bg-gradient-to-br from-white to-[#f0f4f8] border border-[#4a90e2]/20'
                }`}>
                  <h4 className={`text-xl mb-6 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                    Academic Design
                  </h4>
                  <ul className={`space-y-3 text-sm ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4a90e2] mt-2" />
                      <span>Scholarly typography and layout</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#5ca4d8] mt-2" />
                      <span>Numbered sections (1.1, 1.2, 1.3.1, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4a90e2] mt-2" />
                      <span>Harvard citation style throughout</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#5ca4d8] mt-2" />
                      <span>Formal regression tables with statistics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4a90e2] mt-2" />
                      <span>Figure and table captions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#5ca4d8] mt-2" />
                      <span>Professional colour palette</span>
                    </li>
                  </ul>
                </div>

                <div className={`p-8 rounded-[2rem] ${
                  isDark 
                    ? 'bg-gradient-to-br from-[#2c3e50]/80 to-[#1a2332]/80 border border-[#4a90e2]/30' 
                    : 'bg-gradient-to-br from-white to-[#f0f4f8] border border-[#4a90e2]/20'
                }`}>
                  <h4 className={`text-xl mb-6 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                    Engaging Features
                  </h4>
                  <ul className={`space-y-3 text-sm ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4a90e2] mt-2" />
                      <span>Smooth page transitions with Motion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#5ca4d8] mt-2" />
                      <span>Interactive tab navigation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4a90e2] mt-2" />
                      <span>Keyboard-accessible search (⌘K)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#5ca4d8] mt-2" />
                      <span>Everest imagery throughout</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4a90e2] mt-2" />
                      <span>Responsive design (mobile + desktop)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#5ca4d8] mt-2" />
                      <span>Dark mode support</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Quantitative Methods */}
              <div className={`p-10 rounded-[2rem] ${
                isDark 
                  ? 'bg-[#1a2332]/70 border border-[#4a90e2]/30' 
                  : 'bg-white/70 border border-[#4a90e2]/20'
              }`}>
                <h3 className={`text-2xl mb-8 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                  Quantitative Methods Applied
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h4 className={`font-semibold mb-4 text-[#4a90e2]`}>
                      Data Collection
                    </h4>
                    <ul className={`space-y-2 text-sm ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#4a90e2] mt-2" />
                        <span>Web scraping (BeautifulSoup)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#4a90e2] mt-2" />
                        <span>API integration (Himalayan DB)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#4a90e2] mt-2" />
                        <span>Data cleaning (Pandas)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#4a90e2] mt-2" />
                        <span>Variable engineering</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-4 text-[#5ca4d8]`}>
                      Statistical Analysis
                    </h4>
                    <ul className={`space-y-2 text-sm ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#5ca4d8] mt-2" />
                        <span>OLS regression modelling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#5ca4d8] mt-2" />
                        <span>Hypothesis testing (p-values)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#5ca4d8] mt-2" />
                        <span>R² goodness of fit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#5ca4d8] mt-2" />
                        <span>VIF multicollinearity check</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-4 text-[#7bb3e0]`}>
                      Visualisation
                    </h4>
                    <ul className={`space-y-2 text-sm ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#7bb3e0] mt-2" />
                        <span>Time series charts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#7bb3e0] mt-2" />
                        <span>Comparative bar charts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#7bb3e0] mt-2" />
                        <span>Regression tables</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#7bb3e0] mt-2" />
                        <span>Interactive data presentation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <TabNavigation 
                onPrevious={handlePrevious}
                onNext={handleNext}
                hasPrevious={hasPrevious}
                hasNext={hasNext}
              />
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team">
            <div className="space-y-12">
              {/* Mountain-themed hero section */}
              <div className="relative mb-16">
                <div 
                  className="aspect-[21/9] bg-cover bg-center rounded-[2rem] shadow-2xl relative overflow-hidden"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1759404464413-be7fcbfd08ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                  <div className="absolute inset-0 flex items-center px-16">
                    <div>
                      <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
                        Research Expedition Team
                      </h2>
                      <p className="text-xl text-white/90 mb-2">
                        Six Arts and Sciences students from University College London
                      </p>
                      <p className="text-sm text-white/70">
                        BASC0005: Quantitative Methods and Mathematical Thinking 2 (2025/2026)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mountain peaks as section divider */}
              <div className="flex items-center gap-4 mb-12">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#4a90e2] to-transparent" />
                <div className="flex items-center gap-2 text-[#4a90e2]">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"/>
                  </svg>
                  <span className={`text-sm uppercase tracking-widest ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                    The Summit Team
                  </span>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"/>
                  </svg>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#4a90e2] to-transparent" />
              </div>

              {/* Team Members - Mountain-themed cards */}
              <div className="space-y-8">
                {/* Row 1 - Alice & Becky */}
                <div className="grid md:grid-cols-2 gap-8">

                  <div className="group relative">
                    <div 
                      className="absolute inset-0 bg-cover bg-center rounded-[2rem] opacity-15 group-hover:opacity-25 transition-opacity"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1763480005793-501a0cbe1ac9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`
                      }}
                    />
                    <div className={`relative p-10 rounded-[2rem] ${
                      isDark 
                        ? 'bg-gradient-to-br from-[#2c3e50]/95 to-[#1a2332]/95 border-2 border-[#5ca4d8]/40' 
                        : 'bg-gradient-to-br from-white/95 to-[#f0f4f8]/95 border-2 border-[#5ca4d8]/30'
                    } shadow-2xl hover:shadow-[0_20px_60px_rgba(92,164,216,0.3)] transition-all hover:scale-[1.02] backdrop-blur-sm`}>
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-6">
                          <div className="w-40 h-40 bg-gradient-to-br from-[#4a90e2] to-[#3d7ec0] rounded-full flex items-center justify-center text-6xl font-bold text-white shadow-2xl">
                            A
                          </div>
                          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-[#5ca4d8] to-[#4a90e2] rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"/>
                            </svg>
                          </div>
                        </div>
                        <h3 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                          Alice
                        </h3>
                        <p className="text-sm font-semibold mb-6 text-[#5ca4d8] uppercase tracking-wider">
                          Route Analysis & Data Engineering
                        </p>
                        <ul className={`text-sm space-y-2 mb-8 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                          <li className="flex items-center gap-2 justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#5ca4d8]" />
                            Web scraping & data collection
                          </li>
                          <li className="flex items-center gap-2 justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#4a90e2]" />
                            Route cleaning & visualisation
                          </li>
                          <li className="flex items-center gap-2 justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#5ca4d8]" />
                            Member:Hired ratio analysis
                          </li>
                          <li className="flex items-center gap-2 justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#4a90e2]" />
                            Regression modelling
                          </li>
                        </ul>
                        <button 
                          className="text-sm text-white bg-[#4a90e2]/20 backdrop-blur-md border border-[#4a90e2]/40 hover:bg-[#4a90e2]/30 px-6 py-3 rounded-full transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                          onClick={() => window.open("https://linkedin.com/in/alice-profile", "_blank")}
                        >
                          <Linkedin className="w-4 h-4" />
                          Connect on LinkedIn
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="group relative">
                    <div 
                      className="absolute inset-0 bg-cover bg-center rounded-[2rem] opacity-15 group-hover:opacity-25 transition-opacity"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1668828655343-7244e234f81b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`
                      }}
                    />
                    <div className={`relative p-10 rounded-[2rem] ${
                      isDark 
                        ? 'bg-gradient-to-br from-[#2c3e50]/95 to-[#1a2332]/95 border-2 border-[#4a90e2]/40' 
                        : 'bg-gradient-to-br from-white/95 to-[#f0f4f8]/95 border-2 border-[#4a90e2]/30'
                    } shadow-2xl hover:shadow-[0_20px_60px_rgba(74,144,226,0.3)] transition-all hover:scale-[1.02] backdrop-blur-sm`}>
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-6">
                          <img 
                            src={teamMemberBeckyImage} 
                            alt="Becky" 
                            className="w-40 h-40 rounded-full object-cover shadow-2xl"
                            style={{ objectPosition: 'center 30%' }}
                          />
                          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-[#5ca4d8] to-[#4a90e2] rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"/>
                            </svg>
                          </div>
                        </div>
                        <h3 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                          Becky
                        </h3>
                        <p className="text-sm font-semibold mb-6 text-[#4a90e2] uppercase tracking-wider">
                          Results & Limitations
                        </p>
                        <ul className={`text-sm space-y-2 mb-8 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                          <li className="flex items-center gap-2 justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#4a90e2]" />
                            Results analysis
                          </li>
                          <li className="flex items-center gap-2 justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#5ca4d8]" />
                            Limitations documentation
                          </li>
                          <li className="flex items-center gap-2 justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#4a90e2]" />
                            References compilation
                          </li>
                          <li className="flex items-center gap-2 justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#5ca4d8]" />
                            Data quality assessment
                          </li>
                        </ul>
                        <button 
                          className="text-sm text-white bg-[#4a90e2]/20 backdrop-blur-md border border-[#4a90e2]/40 hover:bg-[#4a90e2]/30 px-6 py-3 rounded-full transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                          onClick={() => window.open("https://linkedin.com/in/becky-profile", "_blank")}
                        >
                          <Linkedin className="w-4 h-4" />
                          Connect on LinkedIn
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 2 - Claire & Shayna */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="group relative">
                    <div 
                      className="absolute inset-0 bg-cover bg-center rounded-[2rem] opacity-15 group-hover:opacity-25 transition-opacity"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1724341754508-f19ee59541bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`
                      }}
                    />
                    <div className={`relative p-10 rounded-[2rem] ${
                      isDark 
                        ? 'bg-gradient-to-br from-[#2c3e50]/95 to-[#1a2332]/95 border-2 border-[#7bb3e0]/40' 
                        : 'bg-gradient-to-br from-white/95 to-[#f0f4f8]/95 border-2 border-[#7bb3e0]/30'
                    } shadow-2xl hover:shadow-[0_20px_60px_rgba(123,179,224,0.3)] transition-all hover:scale-[1.02] backdrop-blur-sm`}>
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-6">
                          <img 
                            src={teamMemberClaireImage} 
                            alt="Claire" 
                            className="w-40 h-40 rounded-full object-cover shadow-2xl"
                            style={{ objectPosition: 'center 30%' }}
                          />
                          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-[#9dc9ef] to-[#7bb3e0] rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"/>
                            </svg>
                          </div>
                        </div>
                        <h3 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                          Claire
                        </h3>
                        <p className="text-sm font-semibold mb-6 text-[#7bb3e0] uppercase tracking-wider">
                          Methodology & Temporal Analysis
                        </p>
                        <ul className={`text-sm space-y-2 mb-8 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                          <li className="flex items-center gap-2 justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#7bb3e0]" />
                            Methodology design
                          </li>
                          <li className="flex items-center gap-2 justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#5ca4d8]" />
                            Year/Season data extraction
                          </li>
                          <li className="flex items-center gap-2 justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#7bb3e0]" />
                            Citizenship analysis
                          </li>
                          <li className="flex items-center gap-2 justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#5ca4d8]" />
                            Regression modelling
                          </li>
                        </ul>
                        <button 
                          className="text-sm text-white bg-[#4a90e2]/20 backdrop-blur-md border border-[#4a90e2]/40 hover:bg-[#4a90e2]/30 px-6 py-3 rounded-full transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                          onClick={() => window.open("https://linkedin.com/in/claire-profile", "_blank")}
                        >
                          <Linkedin className="w-4 h-4" />
                          Connect on LinkedIn
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="group relative">
                    <div 
                      className="absolute inset-0 bg-cover bg-center rounded-[2rem] opacity-15 group-hover:opacity-25 transition-opacity"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1652098694798-24be41faecbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`
                      }}
                    />
                    <div className={`relative p-10 rounded-[2rem] ${
                      isDark 
                        ? 'bg-gradient-to-br from-[#2c3e50]/95 to-[#1a2332]/95 border-2 border-[#7bb3e0]/40' 
                        : 'bg-gradient-to-br from-white/95 to-[#f0f4f8]/95 border-2 border-[#7bb3e0]/30'
                    } shadow-2xl hover:shadow-[0_20px_60px_rgba(123,179,224,0.3)] transition-all hover:scale-[1.02] backdrop-blur-sm`}>
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-6">
                          <img 
                            src={teamMemberShaynaImage} 
                            alt="Shayna" 
                            className="w-40 h-40 rounded-full object-cover shadow-2xl"
                          />
                          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-[#9dc9ef] to-[#7bb3e0] rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"/>
                            </svg>
                          </div>
                        </div>
                        <h3 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                          Shayna
                        </h3>
                        <p className="text-sm font-semibold mb-6 text-[#7bb3e0] uppercase tracking-wider">
                          Discussion & Website Development
                        </p>
                        <ul className={`text-sm space-y-2 mb-8 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                          <li className="flex items-center gap-2 justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#7bb3e0]" />
                            Discussion of results
                          </li>
                          <li className="flex items-center gap-2 justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#5ca4d8]" />
                            Conclusion synthesis
                          </li>
                          <li className="flex items-center gap-2 justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#7bb3e0]" />
                            Website design & development
                          </li>
                          <li className="flex items-center gap-2 justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#5ca4d8]" />
                            Data support
                          </li>
                        </ul>
                        <button 
                          className="text-sm text-white bg-[#4a90e2]/20 backdrop-blur-md border border-[#4a90e2]/40 hover:bg-[#4a90e2]/30 px-6 py-3 rounded-full transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                          onClick={() => window.open("https://linkedin.com/in/shayna-profile", "_blank")}
                        >
                          <Linkedin className="w-4 h-4" />
                          Connect on LinkedIn
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 3 - Snigdha & Rania */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="group relative">
                    <div 
                      className="absolute inset-0 bg-cover bg-center rounded-[2rem] opacity-15 group-hover:opacity-25 transition-opacity"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1693865105826-6f3c8d642114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`
                      }}
                    />
                    <div className={`relative p-10 rounded-[2rem] ${
                      isDark 
                        ? 'bg-gradient-to-br from-[#2c3e50]/95 to-[#1a2332]/95 border-2 border-[#4a90e2]/40' 
                        : 'bg-gradient-to-br from-white/95 to-[#f0f4f8]/95 border-2 border-[#4a90e2]/30'
                    } shadow-2xl hover:shadow-[0_20px_60px_rgba(74,144,226,0.3)] transition-all hover:scale-[1.02] backdrop-blur-sm`}>
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-6">
                          <div className="w-40 h-40 bg-gradient-to-br from-[#5ca4d8] to-[#4a90e2] rounded-full flex items-center justify-center text-6xl font-bold text-white shadow-2xl">
                            S
                          </div>
                          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-[#7bb3e0] to-[#5ca4d8] rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"/>
                            </svg>
                          </div>
                        </div>
                        <h3 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                          Snigdha
                        </h3>
                        <p className="text-sm font-semibold mb-6 text-[#5ca4d8] uppercase tracking-wider">
                          Data Analysis & Crowding Metrics
                        </p>
                        <ul className={`text-sm space-y-2 mb-8 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                          <li className="flex items-center gap-2 justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#5ca4d8]" />
                            Data sorting & cleaning
                          </li>
                          <li className="flex items-center gap-2 justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#4a90e2]" />
                            Crowding/popularity metrics
                          </li>
                          <li className="flex items-center gap-2 justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#5ca4d8]" />
                            Expedition size analysis
                          </li>
                          <li className="flex items-center gap-2 justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#4a90e2]" />
                            Regression modelling
                          </li>
                        </ul>
                        <button 
                          className="text-sm text-white bg-[#4a90e2]/20 backdrop-blur-md border border-[#4a90e2]/40 hover:bg-[#4a90e2]/30 px-6 py-3 rounded-full transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                          onClick={() => window.open("https://linkedin.com/in/snigdha-profile", "_blank")}
                        >
                          <Linkedin className="w-4 h-4" />
                          Connect on LinkedIn
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="group relative">
                    <div 
                      className="absolute inset-0 bg-cover bg-center rounded-[2rem] opacity-15 group-hover:opacity-25 transition-opacity"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1652098694798-24be41faecbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`
                      }}
                    />
                    <div className={`relative p-10 rounded-[2rem] ${
                      isDark 
                        ? 'bg-gradient-to-br from-[#2c3e50]/95 to-[#1a2332]/95 border-2 border-[#4a90e2]/40' 
                        : 'bg-gradient-to-br from-white/95 to-[#f0f4f8]/95 border-2 border-[#4a90e2]/30'
                    } shadow-2xl hover:shadow-[0_20px_60px_rgba(74,144,226,0.3)] transition-all hover:scale-[1.02] backdrop-blur-sm`}>
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-6">
                          <div className="w-40 h-40 bg-gradient-to-br from-[#5ca4d8] to-[#4a90e2] rounded-full flex items-center justify-center text-6xl font-bold text-white shadow-2xl">
                            R
                          </div>
                          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-[#7bb3e0] to-[#5ca4d8] rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"/>
                            </svg>
                          </div>
                        </div>
                        <h3 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                          Rania
                        </h3>
                        <p className="text-sm font-semibold mb-6 text-[#4a90e2] uppercase tracking-wider">
                          Literature Review & Background
                        </p>
                        <ul className={`text-sm space-y-2 mb-8 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                          <li className="flex items-center gap-2 justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#4a90e2]" />
                            Background research
                          </li>
                          <li className="flex items-center gap-2 justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#5ca4d8]" />
                            Literature review synthesis
                          </li>
                          <li className="flex items-center gap-2 justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#4a90e2]" />
                            Abstract writing
                          </li>
                          <li className="flex items-center gap-2 justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#5ca4d8]" />
                            Motivation & references
                          </li>
                        </ul>
                        <button 
                          className="text-sm text-white bg-[#4a90e2]/20 backdrop-blur-md border border-[#4a90e2]/40 hover:bg-[#4a90e2]/30 px-6 py-3 rounded-full transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                          onClick={() => window.open("https://linkedin.com/in/rania-profile", "_blank")}
                        >
                          <Linkedin className="w-4 h-4" />
                          Connect on LinkedIn
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <TabNavigation 
                onPrevious={handlePrevious}
                onNext={handleNext}
                hasPrevious={hasPrevious}
                hasNext={hasNext}
              />
            </div>
          </TabsContent>

          {/* References Tab */}
          <TabsContent value="references">
            <div className="max-w-5xl space-y-6">
              <h3 className={`text-4xl mb-12 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
                References
              </h3>
              
              {[
                {
                  citation: "Gallagher, S.A. (2023) Determinants of Summit Success on Mount Everest. Claremont Colleges Thesis.",
                  url: null
                },
                {
                  citation: "Himalayan Database (2025) Expedition archives: Complete records of climbing expeditions to Nepal's peaks.",
                  url: "https://www.himalayandatabase.com"
                },
                {
                  citation: "Huey, R.B., Carroll, C., Salisbury, R. & Wang, J.L. (2020) 'Mountaineers on Mount Everest: Effects of age, sex, experience, and crowding on rates of success and death', PLOS ONE, 15(8), e0236919.",
                  url: "https://doi.org/10.1371/journal.pone.0236919"
                },
                {
                  citation: "Huey, R.B., Eguskitza, X. & Dillon, M. (2007) 'Mountaineering in Thin Air', Integrative and Comparative Biology, 47(1), pp. 121-124.",
                  url: "https://doi.org/10.1093/icb/icm055"
                },
                {
                  citation: "Prasain, S. (2019) 'New rules for Everest climbers as Nepal seeks to reduce deaths', The Guardian, 14 February.",
                  url: "https://www.theguardian.com/world/2019/feb/14/nepal-everest-rules-climbers-deaths"
                },
                {
                  citation: "Rosen, R. (2007) 'Group Dynamics and Success at the Extremes: The Case of Mount Everest', Journal of Business Ethics, 75(2), pp. 107-116.",
                  url: "https://doi.org/10.1007/s10551-006-9237-1"
                },
                {
                  citation: "Salisbury, R., Hawley, E. & Bierling, B. (2021) The Himalaya by the Numbers: A Statistical Analysis of Mountaineering in the Nepal Himalaya. Kathmandu: Vajra Publications.",
                  url: null
                },
                {
                  citation: "Savage, D.A. & Torgler, B. (2013) 'The times they are a changin': The effect of institutional change on cooperative behaviour at 26,000 ft over sixty years', PLOS ONE, 8(12), e83959.",
                  url: "https://doi.org/10.1371/journal.pone.0083959"
                },
                {
                  citation: "Stevens, S.F. (2003) 'Tourism and Deforestation in the Mt Everest Region of Nepal', The Geographical Journal, 169(3), pp. 255-277.",
                  url: "https://doi.org/10.1111/1475-4959.00089"
                },
                {
                  citation: "Wiseman, T., Freer, L. & Hung, E. (2006) 'Prospective cohort study of summit and non-summit climbers on Mount Everest in 2003', British Journal of Sports Medicine, 40(6), pp. 484-490.",
                  url: "https://doi.org/10.1136/bjsm.2005.024547"
                }
              ].map((ref, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-3xl ${
                    isDark 
                      ? 'bg-[#1a2332]/70 border border-[#4a90e2]/30 hover:border-[#4a90e2]/60' 
                      : 'bg-white/70 border border-[#4a90e2]/20 hover:border-[#4a90e2]/40'
                  } transition-all hover:shadow-lg`}
                >
                  <p className={`leading-relaxed mb-3 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                    {ref.citation}
                  </p>
                  {ref.url && (
                    <a 
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-[#4a90e2] hover:text-[#5ca4d8] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="underline">{ref.url}</span>
                    </a>
                  )}
                </div>
              ))}

              <TabNavigation 
                onPrevious={handlePrevious}
                onNext={handleNext}
                hasPrevious={hasPrevious}
                hasNext={hasNext}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Image Credits Footer */}
        <div className={`mt-20 pt-8 border-t text-center ${isDark ? 'border-[#4a90e2]/20' : 'border-[#4a90e2]/15'}`}>
          <p className={`text-xs italic ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
            All images sourced from Unsplash
          </p>
        </div>
      </div>
    </motion.div>
  );
}

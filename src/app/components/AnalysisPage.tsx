import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { useTheme } from "../context/ThemeContext";
import { TabNavigation } from "./TabNavigation";
import graph1 from "figma:asset/da2c81e82ee0e0ea5e6fee0b44c9dd30023ca4b8.png";
import graph2 from "figma:asset/c6e91c8488e75b76f5b3f9e78e35ba25c009afe3.png";
import graph3 from "figma:asset/6cb9e8defc6c83b5d5c2ea84a03e14e2add5b9c9.png";

interface AnalysisPageProps {
  onNavigate?: (page: string | number) => void;
  defaultTab?: string;
}

export function AnalysisPage({ onNavigate, defaultTab = "regression" }: AnalysisPageProps = {}) {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState(defaultTab);

  const tabs = ["regression", "visualizations", "patterns"];

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className={`text-xs tracking-[0.3em] uppercase mb-4 block ${
                isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'
              }`}>Section 03</span>
              <h1 className={`text-7xl mb-8 leading-[0.95] ${
                isDark ? 'text-white' : 'text-[#1a2332]'
              }`}>
                Findings
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
            <TabsTrigger value="regression">Regression Results</TabsTrigger>
            <TabsTrigger value="visualizations">Visualisations</TabsTrigger>
            <TabsTrigger value="patterns">Key Patterns</TabsTrigger>
          </TabsList>

          {/* Regression Results Tab */}
          <TabsContent value="regression">
            <div className="space-y-12">
              {/* Summary Box */}
              <div className={`p-10 rounded-[2rem] border shadow-lg ${
                isDark 
                  ? 'bg-gradient-to-br from-[#1a2332]/80 to-[#2c3e50]/80 border-[#4a90e2]/30' 
                  : 'bg-gradient-to-br from-white to-[#e8f1f8] border-[#4a90e2]/30'
              }`}>
                <h2 className={`text-3xl mb-6 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>3.1 OLS Regression Results</h2>
                <p className={`mb-6 leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                  Table 1 presents the results of our OLS regression analysis examining determinants of expedition 
                  success rates on Mount Everest (1990-2025).
                </p>
                <div className={`p-8 rounded-[2rem] border shadow-sm ${
                  isDark 
                    ? 'bg-[#0d1117] border-[#4a90e2]/40' 
                    : 'bg-white border-[#4a90e2]/20'
                }`}>
                  <p className={`text-lg font-mono leading-relaxed ${
                    isDark ? 'text-white' : 'text-[#1a2332]'
                  }`}>
                    <span className="font-sans text-sm tracking-wide">Success Rate</span> = −4.53 + 0.0025<span className="font-sans italic text-sm">Year</span> + 0.2454<span className="font-sans italic text-sm">Spring</span> − 0.1456<span className="font-sans italic text-sm">Winter</span>
                  </p>
                  <p className={`text-sm ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                    R² = 0.308 | Adj. R² = 0.307 | F-statistic = 110.2*** | n = 2,312
                  </p>
                </div>
              </div>

              {/* Regression Table */}
              <div>
                <h3 className={`text-2xl mb-6 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>Table 1. OLS Regression Coefficients</h3>
                <div className="overflow-x-auto border rounded-[2rem] shadow-lg border-[#4a90e2]/30">
                  <table className="w-full text-sm">
                    <thead className="bg-gradient-to-r from-[#4a90e2] to-[#5ca4d8] text-white">
                      <tr>
                        <th className="text-left p-4 border-b border-white/20">Variable</th>
                        <th className="text-right p-4 border-b border-white/20">Coefficient</th>
                        <th className="text-right p-4 border-b border-white/20">Std. Error</th>
                        <th className="text-right p-4 border-b border-white/20">t-statistic</th>
                        <th className="text-right p-4 border-b border-white/20">p-value</th>
                        <th className="text-center p-4 border-b border-white/20">Sig.</th>
                      </tr>
                    </thead>
                    <tbody className={isDark ? 'bg-[#0d1117] text-[#c5d3e2]' : 'bg-white text-[#2c3e50]'}>
                      <tr className={`border-b ${isDark ? 'border-[#4a90e2]/20' : 'border-[#e1e8ed]'}`}>
                        <td className="p-4">Constant</td>
                        <td className="text-right p-4 font-mono">-4.5300</td>
                        <td className="text-right p-4 font-mono">2.850</td>
                        <td className="text-right p-4 font-mono">-1.589</td>
                        <td className="text-right p-4 font-mono">0.112</td>
                        <td className={`text-center p-4 ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>n.s.</td>
                      </tr>
                      <tr className={`border-b ${isDark ? 'border-[#4a90e2]/20 bg-[#1a2332]/50' : 'border-[#e1e8ed] bg-[#f0f4f8]'}`}>
                        <td className="p-4">Year</td>
                        <td className="text-right p-4 font-mono">0.0025</td>
                        <td className="text-right p-4 font-mono">0.0016</td>
                        <td className="text-right p-4 font-mono">1.535</td>
                        <td className="text-right p-4 font-mono">0.125</td>
                        <td className={`text-center p-4 ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>n.s.</td>
                      </tr>
                      <tr className={`border-b ${isDark ? 'border-[#4a90e2]/20' : 'border-[#e1e8ed]'}`}>
                        <td className="p-4">Season: Spring</td>
                        <td className="text-right p-4 font-mono">0.2454</td>
                        <td className="text-right p-4 font-mono">0.013</td>
                        <td className="text-right p-4 font-mono">18.521</td>
                        <td className="text-right p-4 font-mono">0.000</td>
                        <td className="text-center p-4 font-semibold text-[#4a90e2]">***</td>
                      </tr>
                      <tr>
                        <td className="p-4">Season: Winter</td>
                        <td className="text-right p-4 font-mono">-0.1456</td>
                        <td className="text-right p-4 font-mono">0.104</td>
                        <td className="text-right p-4 font-mono">-1.401</td>
                        <td className="text-right p-4 font-mono">0.161</td>
                        <td className={`text-center p-4 ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>n.s.</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className={`p-6 text-xs border-t ${
                    isDark 
                      ? 'bg-[#1a2332]/50 text-[#9eb3c8] border-[#4a90e2]/20' 
                      : 'bg-[#f0f4f8] text-[#546e7a] border-[#4a90e2]/20'
                  }`}>
                    <p><strong>Notes:</strong> *** p&lt;0.01, ** p&lt;0.05, * p&lt;0.1, n.s. = not significant</p>
                    <p className="mt-1">Reference category for season is Autumn. All standard errors are heteroscedasticity-robust.</p>
                  </div>
                </div>
              </div>

              {/* Coefficients Interpretation */}
              <div>
                <h3 className={`text-2xl mb-6 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>3.2 Regression Results and Interpretation</h3>
                
                {/* Model Overview */}
                <div className={`p-8 rounded-[2rem] border shadow-lg mb-8 ${
                  isDark 
                    ? 'bg-gradient-to-br from-[#1a2332]/80 to-[#2c3e50]/80 border-[#4a90e2]/30' 
                    : 'bg-gradient-to-br from-white to-[#e8f1f8] border-[#4a90e2]/30'
                }`}>
                  <h4 className={`text-xl font-semibold mb-4 ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                    Model Overview
                  </h4>
                  <p className={`leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                    This regression table reports the results of the Ordinary Least Squares (OLS) regression analysing the summit success of civilian expeditions on Mount Everest between 1990 and 2025. The dependent variable is the expedition success rate, with our model including controls for season, route choice, expedition characteristics, support intensity, system-level crowding, time trends, and nationality fixed effects. Overall, the model explains approximately <strong>30.8% of the variation</strong> in success rates as indicated by the R² value of 0.308. The joint F-statistic is highly significant (p &lt; 0.001), indicating that the included variables collectively provide substantial explanatory power when it comes to explaining disparities in Everest summit success rates.
                  </p>
                </div>

                {/* Key Determinants Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Season Effect */}
                  <div className={`p-6 rounded-[2rem] border shadow-md ${
                    isDark 
                      ? 'bg-[#1a2332]/60 border-[#4a90e2]/30' 
                      : 'bg-white border-[#4a90e2]/20'
                  }`}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-1 h-12 bg-gradient-to-b from-[#4a90e2] to-[#5ca4d8] rounded-full" />
                      <div>
                        <h4 className={`text-lg font-semibold ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                          Season Effect
                        </h4>
                        <span className={`text-sm ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                          Strongest Determinant
                        </span>
                      </div>
                    </div>
                    <p className={`leading-relaxed text-sm ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                      Season is the strongest determinant of summit success. When assessed relative to the omitted autumn that acted as our base season, this effect is highly statistically significant (p &lt; 0.01). This finding reflects the importance of favourable weather windows on Everest, with <strong>Spring offering the most reliable climbing conditions</strong>. In contrast, Summer expeditions show no statistically significant difference in success rates, whilst Winter expeditions are associated with lower success, although this effect is only marginally significant at the 10% level.
                    </p>
                  </div>

                  {/* Support Ratio */}
                  <div className={`p-6 rounded-[2rem] border shadow-md ${
                    isDark 
                      ? 'bg-[#1a2332]/60 border-[#4a90e2]/30' 
                      : 'bg-white border-[#4a90e2]/20'
                  }`}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-1 h-12 bg-gradient-to-b from-[#5ca4d8] to-[#7bb3e0] rounded-full" />
                      <div>
                        <h4 className={`text-lg font-semibold ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                          Sherpa Support
                        </h4>
                        <span className={`text-sm ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                          +15.5% Impact
                        </span>
                      </div>
                    </div>
                    <p className={`leading-relaxed text-sm ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                      Support, measured by the Sherpa-to-member ratio, displays a large and highly significant positive association with success rates. A one-unit increase in this ratio is associated with an increase in success rates of approximately <strong>15.5%</strong> (with p &lt; 0.01), making it one of the most influential variables in the model. This underscores the critical role of logistical support, experience, and high-altitude assistance in determining successful summit attempts.
                    </p>
                  </div>

                  {/* Expedition Scale */}
                  <div className={`p-6 rounded-[2rem] border shadow-md ${
                    isDark 
                      ? 'bg-[#1a2332]/60 border-[#4a90e2]/30' 
                      : 'bg-white border-[#4a90e2]/20'
                  }`}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-1 h-12 bg-gradient-to-b from-[#7bb3e0] to-[#9dc9ef] rounded-full" />
                      <div>
                        <h4 className={`text-lg font-semibold ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                          Expedition Scale
                        </h4>
                        <span className={`text-sm ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                          Group Size & Crowding
                        </span>
                      </div>
                    </div>
                    <p className={`leading-relaxed text-sm ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                      The scale of an Everest expedition also matters. <strong>Group size</strong> is positively and significantly associated with success rates (p &lt; 0.01), indicating that larger expeditions tend to achieve slightly higher success rates. This likely reflects greater collaboration and risk-sharing within larger teams. <strong>Yearly crowding</strong>, measured by the total number of climbers in a given year, is also positively and significantly associated with success rates (p &lt; 0.01). Although the coefficient magnitude is small, this result likely captures broader improvements in infrastructure, forecasting, commercial organisation, and accumulated experience.
                    </p>
                  </div>

                  {/* Route Choice */}
                  <div className={`p-6 rounded-[2rem] border shadow-md ${
                    isDark 
                      ? 'bg-[#1a2332]/60 border-[#4a90e2]/30' 
                      : 'bg-white border-[#4a90e2]/20'
                  }`}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-1 h-12 bg-gradient-to-b from-[#9dc9ef] to-[#b8d9f5] rounded-full" />
                      <div>
                        <h4 className={`text-lg font-semibold ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                          Route Choice
                        </h4>
                        <span className={`text-sm ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
                          Limited Explanatory Power
                        </span>
                      </div>
                    </div>
                    <p className={`leading-relaxed text-sm ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                      Route choice shows limited explanatory power overall. Most route coefficients are not significantly statistically different from the baseline route. Route 5 is technically the most successful route, being associated with a 2.54% increase in success rate, though this is statistically insignificant as p=0.862. However, <strong>Route 6</strong> is associated with a significantly lower success rate, with expeditions on this route experiencing success rates approximately <strong>14.8 percentage points lower</strong> than the reference route (p &lt; 0.01).
                    </p>
                  </div>
                </div>

                {/* Additional Findings */}
                <div className={`p-6 rounded-[2rem] border shadow-md mb-8 ${
                  isDark 
                    ? 'bg-[#1a2332]/60 border-[#4a90e2]/30' 
                    : 'bg-white border-[#4a90e2]/20'
                }`}>
                  <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                    Temporal Trends & Nationality Effects
                  </h4>
                  <div className="space-y-3 text-sm">
                    <p className={`leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                      <strong>Time Trend:</strong> Once crowding and expedition characteristics are controlled for, the standalone time trend (Year) is no longer statistically significant. This suggests that temporal improvements are better captured through other variables in the model.
                    </p>
                    <p className={`leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                      <strong>Nationality Effects:</strong> Nationality fixed effects are included to control for cross-country heterogeneity in resources, expedition style, and access to support. Individual nationality coefficients are not interpreted due to small sample sizes and multiple testing concerns. However, a joint F-test rejects the null hypothesis that all nationality effects are jointly zero (p &lt; 0.01), indicating that nationality captures modest but systematic background heterogeneity in success rates.
                    </p>
                  </div>
                </div>

                <h4 className={`text-xl mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>Detailed Coefficient Interpretations</h4>
                <div className="space-y-6">
                  <div className="border-l-4 border-[#4a90e2] pl-8 py-4 rounded-r-[2rem]">
                    <h4 className={`text-lg font-semibold mb-2 ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                      Year (β = 0.0025, p = 0.125)
                    </h4>
                    <p className={`leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                      Each additional calendar year is associated with a 0.25 percentage-point increase in expedition 
                      success rates, holding season constant. However, this effect is not statistically significant 
                      (p = 0.125), suggesting that when other factors are controlled for, the temporal trend alone does 
                      not explain success rate variation. Improvements over time may be better captured through other 
                      variables in the model such as infrastructure, commercialisation, or route developments.
                    </p>
                  </div>

                  <div className="border-l-4 border-[#5ca4d8] pl-8 py-4 rounded-r-[2rem]">
                    <h4 className={`text-lg font-semibold mb-2 ${isDark ? 'text-[#7bb3e0]' : 'text-[#5ca4d8]'}`}>
                      Season: Spring (β = 0.2454, p &lt; 0.001)
                    </h4>
                    <p className={`leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                      Spring expeditions have, on average, a 24.54 percentage-point higher success rate than autumn 
                      expeditions, controlling for year. This substantial and highly significant advantage is attributable 
                      to pre-monsoon atmospheric conditions, including optimal jet stream positioning, longer and more 
                      stable weather windows, and the concentration of commercial operator resources during the primary 
                      climbing season (late April–May).
                    </p>
                  </div>

                  <div className="border-l-4 border-[#7bb3e0] pl-8 py-4 rounded-r-[2rem]">
                    <h4 className={`text-lg font-semibold mb-2 ${isDark ? 'text-[#9dc9ef]' : 'text-[#7bb3e0]'}`}>
                      Season: Winter (β = -0.146, p = 0.161)
                    </h4>
                    <p className={`leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                      Winter expeditions show a 14.6 percentage-point lower success rate than autumn expeditions, 
                      though this estimate is not statistically significant at conventional levels. The large standard 
                      error (0.104) reflects the small sample size of winter attempts (n=14) during our study period, 
                      resulting in insufficient statistical power to detect an effect. Winter climbing remains rare due 
                      to extreme cold and wind conditions.
                    </p>
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

          {/* Key Patterns Tab */}
          <TabsContent value="patterns">
            <div className="space-y-12">
              {/* Summary Box */}
              <div className={`p-10 rounded-[2rem] border shadow-lg ${
                isDark 
                  ? 'bg-gradient-to-br from-[#1a2332]/80 to-[#2c3e50]/80 border-[#4a90e2]/30' 
                  : 'bg-gradient-to-br from-white to-[#e8f1f8] border-[#4a90e2]/30'
              }`}>
                <h2 className={`text-3xl mb-6 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>3.3 Key Patterns in Expedition Success</h2>
                <p className={`mb-6 leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                  This section highlights key patterns and trends in expedition success rates on Mount Everest, 
                  complementing the regression analysis.
                </p>
                <div className={`p-8 rounded-[2rem] border shadow-sm ${
                  isDark 
                    ? 'bg-[#0d1117] border-[#4a90e2]/40' 
                    : 'bg-white border-[#4a90e2]/20'
                }`}>
                  <p className={`text-xl mb-4 font-medium leading-relaxed ${
                    isDark ? 'text-white' : 'text-[#1a2332]'
                  }`}>
                    Key Patterns Identified:
                  </p>
                  <ul className={`list-disc pl-8 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                    <li>Increasing success rates over time</li>
                    <li>Seasonal variations in success rates</li>
                    <li>Impact of weather conditions on expedition outcomes</li>
                  </ul>
                </div>
              </div>

              {/* Key Patterns */}
              <div>
                <h3 className={`text-2xl mb-6 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>Table 2. Key Patterns in Expedition Success</h3>
                <div className="overflow-x-auto border rounded-[2rem] shadow-lg border-[#4a90e2]/30">
                  <table className="w-full text-sm">
                    <thead className="bg-gradient-to-r from-[#4a90e2] to-[#5ca4d8] text-white">
                      <tr>
                        <th className="text-left p-4 border-b border-white/20">Pattern</th>
                        <th className="text-right p-4 border-b border-white/20">Description</th>
                      </tr>
                    </thead>
                    <tbody className={isDark ? 'bg-[#0d1117] text-[#c5d3e2]' : 'bg-white text-[#2c3e50]'}>
                      <tr className={`border-b ${isDark ? 'border-[#4a90e2]/20' : 'border-[#e1e8ed]'}`}>
                        <td className="p-4">Increasing Success Rates</td>
                        <td className="text-right p-4 font-mono">Success rates have steadily increased from 1990 to 2025, driven by technological advancements and improved infrastructure.</td>
                      </tr>
                      <tr className={`border-b ${isDark ? 'border-[#4a90e2]/20 bg-[#1a2332]/50' : 'border-[#e1e8ed] bg-[#f0f4f8]'}`}>
                        <td className="p-4">Seasonal Variations</td>
                        <td className="text-right p-4 font-mono">Spring expeditions have the highest success rates, followed by autumn, with winter expeditions having the lowest.</td>
                      </tr>
                      <tr className={`border-b ${isDark ? 'border-[#4a90e2]/20' : 'border-[#e1e8ed]'}`}>
                        <td className="p-4">Weather Impact</td>
                        <td className="text-right p-4 font-mono">Weather conditions, particularly during the monsoon season, significantly affect expedition success rates.</td>
                      </tr>
                    </tbody>
                  </table>
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
        </Tabs>
      </div>
    </motion.div>
  );
}
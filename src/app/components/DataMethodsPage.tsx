import { motion } from "motion/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { AliceMethodologyTab } from "./AliceMethodologyTab";
import { SnigdhaMethodologyTab } from "./SnigdhaMethodologyTab";
import { TabNavigation } from "./TabNavigation";
import { useState, useEffect } from "react";

interface DataMethodsPageProps {
  onNavigate?: (page: string | number, tab?: string) => void;
  defaultTab?: string;
}

export function DataMethodsPage({ onNavigate, defaultTab = "sources" }: DataMethodsPageProps = {}) {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState(defaultTab);

  const tabs = ["sources", "processing", "dataset", "methods", "limitations"];
  
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
  
  const datasets = [
    {
      name: "The Himalayan Database",
      description: "Comprehensive expedition records compiled by Elizabeth Hawley and Richard Salisbury, containing detailed information on all climbing expeditions to Nepal's peaks from 1905 to 2025.",
      records: "10,000+",
      url: "https://www.himalayandatabase.com"
    },
    {
      name: "Weather & Climate Data",
      description: "Historical meteorological data from high-altitude weather stations and satellite observations.",
      records: "35 years",
      url: "https://www.ncei.noaa.gov/products/land-based-station/integrated-surface-database"
    },
    {
      name: "Incident & Accident Reports",
      description: "Documentation of significant events including avalanches, serac collapses, storms, and the COVID-19 pandemic closure.",
      records: "200+",
      url: "https://explorersweb.com/everest/"
    },
    {
      name: "Geographic & Route Data",
      description: "Spatial data on climbing routes, camps, and geographical features.",
      records: "15 routes",
      url: "https://www.openstreetmap.org/#map=13/27.9881/86.9250"
    },
  ];

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
              }`}>Section 02</span>
              <h1 className={`text-7xl mb-8 leading-[0.95] ${
                isDark ? 'text-white' : 'text-[#1a2332]'
              }`}>
                Data & Methods
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
          <TabsList className={`border-b ${isDark ? 'border-[#4a90e2]/30' : 'border-[#4a90e2]/20'} w-full justify-start mb-12 gap-1 flex-wrap overflow-x-auto`}>
            <TabsTrigger value="sources">Sources</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="dataset">Dataset</TabsTrigger>
            <TabsTrigger value="methods">Methods</TabsTrigger>
            <TabsTrigger value="limitations">Limitations</TabsTrigger>
          </TabsList>

          {/* Data Sources Tab */}
          <TabsContent value="sources">
            {/* Image Grid Section */}
            <div className="grid grid-cols-2 gap-4 mb-16">
              <div 
                className="aspect-[4/3] bg-cover bg-center rounded-[2rem] shadow-xl"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=2070')`
                }}
              />
              <div 
                className="aspect-[4/3] bg-cover bg-center rounded-[2rem] shadow-xl"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070')`
                }}
              />
            </div>
            <p className={`text-xs text-center mt-4 italic ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
              Images source: Unsplash
            </p>
            
            <h2 className={`text-4xl mb-8 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>Data Sources</h2>
            
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {datasets.map((dataset, index) => (
                <div
                  key={dataset.name}
                  className={`border p-8 hover:border-[#4a90e2] transition-colors rounded-[2rem] shadow-lg relative group overflow-hidden ${
                    isDark 
                      ? 'border-[#4a90e2]/30 bg-gradient-to-br from-[#1a2332]/80 to-[#2c3e50]/80' 
                      : 'border-[#4a90e2]/30 bg-gradient-to-br from-white to-[#e8f1f8]'
                  }`}
                >
                  {/* Hover overlay with View Dataset button */}
                  <div className="absolute inset-0 bg-[#4a90e2]/90 backdrop-blur-md rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <Button
                      className="bg-white/20 border-2 border-white/50 text-white hover:bg-white/30 backdrop-blur-sm px-8 py-6 rounded-full text-base font-semibold shadow-xl"
                      onClick={() => window.open(dataset.url, '_blank')}
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      View Dataset
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-xs tracking-widest uppercase ${
                      isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'
                    }`}>
                      Dataset {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-white bg-[#4a90e2] px-4 py-1.5 rounded-full">
                      {dataset.records}
                    </span>
                  </div>
                  <h3 className={`text-2xl mb-3 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>{dataset.name}</h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>{dataset.description}</p>
                </div>
              ))}
            </div>

            <div className={`mt-16 p-10 border rounded-[2rem] shadow-lg ${
              isDark 
                ? 'bg-gradient-to-br from-[#1a2332]/80 to-[#2c3e50]/80 border-[#4a90e2]/20' 
                : 'bg-gradient-to-br from-white to-[#e8f1f8] border-[#4a90e2]/20'
            }`}>
              <h3 className={`text-2xl mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>Primary Dataset: Expeditions3.csv</h3>
              <p className={`mb-6 leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                The main dataset was constructed from the Himalayan Database, filtered for 1990-2025 expeditions. 
                Variables include:
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4a90e2]" />
                    <span className={isDark ? 'text-[#c5d3e2]' : 'text-[#1a2332]'}>Year & Season</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4a90e2]" />
                    <span className={isDark ? 'text-[#c5d3e2]' : 'text-[#1a2332]'}>Route taken</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4a90e2]" />
                    <span className={isDark ? 'text-[#c5d3e2]' : 'text-[#1a2332]'}>Expedition size</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4a90e2]" />
                    <span className={isDark ? 'text-[#c5d3e2]' : 'text-[#1a2332]'}>Total members</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#5ca4d8]" />
                    <span className={isDark ? 'text-[#c5d3e2]' : 'text-[#1a2332]'}>Member: Hired ratio</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#5ca4d8]" />
                    <span className={isDark ? 'text-[#c5d3e2]' : 'text-[#1a2332]'}>Success rate</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#5ca4d8]" />
                    <span className={isDark ? 'text-[#c5d3e2]' : 'text-[#1a2332]'}>Death rate</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#5ca4d8]" />
                    <span className={isDark ? 'text-[#c5d3e2]' : 'text-[#1a2332]'}>Nationality composition</span>
                  </li>
                </ul>
              </div>
            </div>

            <TabNavigation 
              onPrevious={handlePrevious}
              onNext={handleNext}
              hasPrevious={hasPrevious}
              hasNext={hasNext}
            />
          </TabsContent>

          {/* Data Processing Tab */}
          <TabsContent value="processing">
            <div className="space-y-12">
              {/* Web Scraping */}
              <div>
                <h3 className={`text-2xl mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>Data Collection via Web Scraping</h3>
                <p className={`mb-6 leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                  The Himalayan Database provided extensive data, but expedition-level details required individual 
                  page scraping. We wrote a Python function to extract missing variables.
                </p>
                <div className={`p-8 rounded-[2rem] overflow-x-auto shadow-lg ${
                  isDark 
                    ? 'bg-[#0d1117] border-2 border-[#4a90e2]/40' 
                    : 'bg-[#1e1e1e] border-2 border-[#4a90e2]/20'
                }`}>
                  <pre className={`text-sm leading-relaxed ${isDark ? 'text-[#58a6ff]' : 'text-[#9cdcfe]'}`}>
{`# Scraping function for expedition details
def fetch_expedition_data(expedition_id):
    url = f"https://himalayandatabase.com/expedition/{expedition_id}"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    return {
        'group_size': soup.find(id='group-size').text,
        'total_members': soup.find(id='total-members').text,
        'hired_count': soup.find(id='hired-count').text,
        'member_deaths': soup.find(id='member-deaths').text,
        'hired_deaths': soup.find(id='hired-deaths').text
    }`}
                  </pre>
                </div>
              </div>

              {/* Data Cleaning */}
              <div>
                <h3 className={`text-2xl mb-6 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>Data Cleaning & Standardisation</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className={`text-lg mb-4 font-semibold ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                      Result Column Cleaning
                    </h4>
                    <div className={`p-6 rounded-[2rem] shadow-lg ${
                      isDark 
                        ? 'bg-[#0d1117] border-2 border-[#5ca4d8]/40' 
                        : 'bg-[#1e1e1e] border-2 border-[#5ca4d8]/20'
                    }`}>
                      <pre className={`text-sm leading-loose ${isDark ? 'text-[#79c0ff]' : 'text-[#9cdcfe]'}`}>
{`df['result_clean'] = (
    df['Result']
    .astype(str)
    .str.lower()
    .str.replace(
        r'\\(.*?\\)', 
        '', 
        regex=True
    )
    .str.replace(
        r'\\s+', 
        ' ', 
        regex=True
    )
    .str.strip()
)`}
                      </pre>
                    </div>
                  </div>
                  <div>
                    <h4 className={`text-lg mb-4 font-semibold ${isDark ? 'text-[#7bb3e0]' : 'text-[#5ca4d8]'}`}>
                      Route Column Cleaning
                    </h4>
                    <div className={`p-6 rounded-[2rem] shadow-lg ${
                      isDark 
                        ? 'bg-[#0d1117] border-2 border-[#7bb3e0]/40' 
                        : 'bg-[#1e1e1e] border-2 border-[#7bb3e0]/20'
                    }`}>
                      <pre className={`text-sm leading-loose ${isDark ? 'text-[#a5d6ff]' : 'text-[#9cdcfe]'}`}>
{`df['clean_routes'] = (
    df['Route']
    .str.lower()
    .str.replace(
        ',', 
        '/', 
        regex=False
    )
    .str.split('/')
    .str[0]  
    # Keep main route
)`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Variable Creation */}
              <div>
                <h3 className={`text-2xl mb-6 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>Engineered Variables</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-[#4a90e2] pl-8 py-4 rounded-r-[2rem]">
                    <h4 className={`text-lg mb-2 font-semibold ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                      Member: Hired Ratio
                    </h4>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                      Ratio = total_members ÷ hired_count (Sherpa support intensity)
                    </p>
                  </div>
                  <div className="border-l-4 border-[#5ca4d8] pl-8 py-4 rounded-r-[2rem]">
                    <h4 className={`text-lg mb-2 font-semibold ${isDark ? 'text-[#7bb3e0]' : 'text-[#5ca4d8]'}`}>
                      Success Rate
                    </h4>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                      Success Rate = summiters ÷ group_size (decimal 0-1)
                    </p>
                  </div>
                  <div className="border-l-4 border-[#7bb3e0] pl-8 py-4 rounded-r-[2rem]">
                    <h4 className={`text-lg mb-2 font-semibold ${isDark ? 'text-[#9dc9ef]' : 'text-[#7bb3e0]'}`}>
                      Death Rate
                    </h4>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                      Death Rate = (member_deaths + hired_deaths) ÷ group_size
                    </p>
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
          </TabsContent>

          {/* Dataset Tab */}
          <TabsContent value="dataset">
            <div className="space-y-12">
              <div>
                <h3 className={`text-2xl mb-6 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>Expeditions Dataset</h3>
                <p className={`mb-8 leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                  The primary dataset, Expeditions3.csv, was constructed from the Himalayan Database, filtered for 
                  1990-2025 expeditions. Variables include:
                </p>

                <div className={`p-8 rounded-[2rem] shadow-lg ${
                  isDark 
                    ? 'bg-[#0d1117] border-2 border-[#4a90e2]/40' 
                    : 'bg-[#1e1e1e] border-2 border-[#4a90e2]/20'
                }`}>
                  <pre className={`text-sm leading-relaxed overflow-x-auto ${isDark ? 'text-[#58a6ff]' : 'text-[#9cdcfe]'}`}>
{`# Sample of the dataset
import pandas as pd

# Load the dataset
df = pd.read_csv('Expeditions3.csv')

# Display the first few rows
df.head()`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className={`text-2xl mb-6 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>Variables Explained</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className={`p-8 rounded-[2rem] shadow-lg ${
                    isDark 
                      ? 'bg-gradient-to-br from-[#4a90e2]/20 to-[#5ca4d8]/20 border border-[#4a90e2]/40' 
                      : 'bg-gradient-to-br from-[#e8f1f8] to-[#d9e8f5] border border-[#4a90e2]/30'
                  }`}>
                    <h4 className={`text-lg mb-4 font-semibold ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                      Temporal Factors
                    </h4>
                    <ul className={`text-sm space-y-2 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                      <li>• Year (1990-2025)</li>
                      <li>• Season (Spring/Autumn/Winter)</li>
                    </ul>
                  </div>
                  <div className={`p-8 rounded-[2rem] shadow-lg ${
                    isDark 
                      ? 'bg-gradient-to-br from-[#5ca4d8]/20 to-[#7bb3e0]/20 border border-[#5ca4d8]/40' 
                      : 'bg-gradient-to-br from-[#d9e8f5] to-[#c9dff0] border border-[#5ca4d8]/30'
                  }`}>
                    <h4 className={`text-lg mb-4 font-semibold ${isDark ? 'text-[#7bb3e0]' : 'text-[#5ca4d8]'}`}>
                      Expedition Characteristics
                    </h4>
                    <ul className={`text-sm space-y-2 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                      <li>• Route taken</li>
                      <li>• Expedition size</li>
                      <li>• Sherpa support ratio</li>
                      <li>• Multinational composition</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-8">
                <Button
                  size="lg"
                  className={`gap-3 px-8 rounded-full bg-[#4a90e2]/20 backdrop-blur-md border border-[#4a90e2]/40 hover:bg-[#4a90e2]/30 transition-all shadow-lg hover:shadow-xl ${
                    isDark ? 'text-white' : 'text-[#1a2332]'
                  }`}
                  onClick={() => window.open('https://www.himalayandatabase.com', '_blank')}
                >
                  <ExternalLink className="w-5 h-5" />
                  Visit Himalayan Database
                </Button>
              </div>
            </div>

            <TabNavigation 
              onPrevious={handlePrevious}
              onNext={handleNext}
              hasPrevious={hasPrevious}
              hasNext={hasNext}
              customPreviousAction={() => onNavigate?.(2, 'limitations')}
              customPreviousLabel="Variables"
            />
          </TabsContent>

          {/* Methods Tab */}
          <TabsContent value="methods">
            <div className="space-y-12">
              <div>
                <h3 className={`text-2xl mb-6 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>OLS Regression Analysis</h3>
                <p className={`mb-8 leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                  We used Ordinary Least Squares (OLS) regression to identify determinants of expedition success rate. 
                  Success rate (0-1 decimal) was used instead of binary outcomes to enable OLS rather than logistic 
                  regression.
                </p>

                <div className={`p-8 rounded-[2rem] shadow-lg ${
                  isDark 
                    ? 'bg-[#0d1117] border-2 border-[#4a90e2]/40' 
                    : 'bg-[#1e1e1e] border-2 border-[#4a90e2]/20'
                }`}>
                  <pre className={`text-sm leading-relaxed overflow-x-auto ${isDark ? 'text-[#58a6ff]' : 'text-[#9cdcfe]'}`}>
{`# OLS Regression Model
import statsmodels.api as sm

# Prepare variables
X = df[['Year', 'Season_Spring', 'Season_Winter', 
        'route_codes', 'group_size', 'mbr_hired_ratio', 
        'MultiNational']]
X = sm.add_constant(X)
y = df['success_rate']

# Fit model
model = sm.OLS(y, X).fit()
print(model.summary())`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className={`text-2xl mb-6 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>Factors Analysed</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className={`p-8 rounded-[2rem] shadow-lg ${
                    isDark 
                      ? 'bg-gradient-to-br from-[#4a90e2]/20 to-[#5ca4d8]/20 border border-[#4a90e2]/40' 
                      : 'bg-gradient-to-br from-[#e8f1f8] to-[#d9e8f5] border border-[#4a90e2]/30'
                  }`}>
                    <h4 className={`text-lg mb-4 font-semibold ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                      Temporal Factors
                    </h4>
                    <ul className={`text-sm space-y-2 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                      <li>• Year (1990-2025)</li>
                      <li>• Season (Spring/Autumn/Winter)</li>
                    </ul>
                  </div>
                  <div className={`p-8 rounded-[2rem] shadow-lg ${
                    isDark 
                      ? 'bg-gradient-to-br from-[#5ca4d8]/20 to-[#7bb3e0]/20 border border-[#5ca4d8]/40' 
                      : 'bg-gradient-to-br from-[#d9e8f5] to-[#c9dff0] border border-[#5ca4d8]/30'
                  }`}>
                    <h4 className={`text-lg mb-4 font-semibold ${isDark ? 'text-[#7bb3e0]' : 'text-[#5ca4d8]'}`}>
                      Expedition Characteristics
                    </h4>
                    <ul className={`text-sm space-y-2 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                      <li>• Route taken</li>
                      <li>• Expedition size</li>
                      <li>• Sherpa support ratio</li>
                      <li>• Multinational composition</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-8">
                <Button
                  size="lg"
                  className={`gap-3 px-8 rounded-full bg-[#4a90e2]/20 backdrop-blur-md border border-[#4a90e2]/40 hover:bg-[#4a90e2]/30 transition-all shadow-lg hover:shadow-xl ${
                    isDark ? 'text-white' : 'text-[#1a2332]'
                  }`}
                  onClick={() => window.open('https://www.himalayandatabase.com', '_blank')}
                >
                  <ExternalLink className="w-5 h-5" />
                  Visit Himalayan Database
                </Button>
              </div>
            </div>

            <TabNavigation 
              onPrevious={handlePrevious}
              onNext={handleNext}
              hasPrevious={hasPrevious}
              hasNext={hasNext}
            />
          </TabsContent>

          {/* Limitations Tab */}
          <TabsContent value="limitations">
            <div className="space-y-10 max-w-4xl">
              <p className={`text-lg leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                Whilst we were able to produce a largely comprehensive regression equation assessing the factors of 
                Everest summit success, there were some factors we were unable to obtain suitable data for.
              </p>

              <div className="space-y-8">
                <div className="border-l-4 border-[#4a90e2] pl-8 py-4 rounded-r-[2rem]">
                  <h3 className={`text-xl mb-3 font-semibold ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                    Missing Age Data
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                    Age is a factor that we predict would have a significant impact on climbing success, but the only 
                    data available was for climbers who had died on their expeditions, and was thus not suitable for 
                    our use. Age could influence factors like health, athleticism, and income, all of which could 
                    provide advantages (or disadvantages) to climbers.
                  </p>
                </div>

                <div className="border-l-4 border-[#5ca4d8] pl-8 py-4 rounded-r-[2rem]">
                  <h3 className={`text-xl mb-3 font-semibold ${isDark ? 'text-[#7bb3e0]' : 'text-[#5ca4d8]'}`}>
                    Health Data Unavailable
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                    We made the assumption that all climbers had a baseline of good health. Since 2019, it has been a 
                    legal requirement for potential climbers to provide health reports (Prasain, 2019). However, before 
                    this date, there is no available data for climber medical histories, which likely had an impact on 
                    their success rates.
                  </p>
                </div>

                <div className="border-l-4 border-[#7bb3e0] pl-8 py-4 rounded-r-[2rem]">
                  <h3 className={`text-xl mb-3 font-semibold ${isDark ? 'text-[#9dc9ef]' : 'text-[#7bb3e0]'}`}>
                    Sherpa Data Inconsistencies
                  </h3>
                  <p className={`text-sm leading-relaxed mb-3 ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                    When looking through the data regarding expedition member to hired Sherpa ratio, we noticed an 
                    overrepresentation of expeditions noting 0 sherpas for every expedition member. The fact of the 
                    matter is that very few expeditions leave for Everest without Sherpa support, and yet around a 
                    quarter of expeditions did not record Sherpa presence in our dataset.
                  </p>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                    We believe this to be due to the frequent erasure of recorded Sherpa attendance, particularly in 
                    the 1990s but still present in later decades. We have decided to keep these data points in our 
                    regression as it is not possible to tell which groups had sherpas and which did not, but we do 
                    note the potential discrepancy between recorded ratios and real ones.
                  </p>
                </div>

                <div className="border-l-4 border-[#4a90e2] pl-8 py-4 rounded-r-[2rem]">
                  <h3 className={`text-xl mb-3 font-semibold ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
                    Uncontrollable External Events
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                    Freak accidents and global events are difficult to factor into the data analysis process. Avalanches 
                    are a constant threat on Everest, and the COVID-19 pandemic greatly reduced climber numbers. As this 
                    is research into how personal decisions or characteristics affected success rates, we chose to document 
                    these events but focus on controllable factors.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <BackToTop />
    </motion.div>
  );
}
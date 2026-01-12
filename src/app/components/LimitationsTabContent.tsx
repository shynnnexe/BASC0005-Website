import { useTheme } from "../context/ThemeContext";
import { AlertTriangle } from "lucide-react";
import { TabNavigation } from "./TabNavigation";
import { SectionNavigation } from "./SectionNavigation";

interface LimitationsTabContentProps {
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
  onSectionNavigate?: (page: string | number) => void;
}

export function LimitationsTabContent({ 
  onPrevious, 
  onNext, 
  hasPrevious = true, 
  hasNext = true,
  onSectionNavigate 
}: LimitationsTabContentProps) {
  const { isDark } = useTheme();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className={`p-6 md:p-8 rounded-[2rem] ${ 
        isDark 
          ? 'bg-[#1a2332]/80 backdrop-blur-md border border-[#4a90e2]/30' 
          : 'bg-white/90 backdrop-blur-md border border-[#4a90e2]/20 shadow-lg'
      }`}>
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-3 rounded-2xl ${
            isDark ? 'bg-[#4a90e2]/20' : 'bg-[#4a90e2]/10'
          }`}>
            <AlertTriangle className="w-6 h-6 text-[#4a90e2]" />
          </div>
          <h2 className={`text-3xl ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
            Limitations & Considerations
          </h2>
        </div>

        <div className={`space-y-6 text-base leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
          <p>
            While our analysis provides valuable insights into the determinants of summit success on Mount Everest, several limitations and methodological considerations should be acknowledged when interpreting the findings.
          </p>
        </div>
      </div>

      {/* Data Quality Limitations */}
      <div className={`p-8 rounded-[2rem] ${
        isDark 
          ? 'bg-[#1a2332]/60 border border-[#4a90e2]/30' 
          : 'bg-[#e8f1f8] border border-[#4a90e2]/20'
      }`}>
        <h3 className={`text-xl mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
          Data Quality & Coverage
        </h3>
        <ul className={`space-y-3 text-base leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
          <li className="flex gap-3">
            <span className="text-[#4a90e2] mt-1">•</span>
            <span><strong>Inconsistent recording:</strong> Approximately a quarter of expeditions showed 0 member:hired ratio, likely due to data recording errors or research expeditions, which could not be systematically filtered out.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#4a90e2] mt-1">•</span>
            <span><strong>Missing variables:</strong> Economic indicators such as expedition price, sherpa revenue, and client expenditure were not available across the 1990-2025 time period, requiring the use of proxy variables.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#4a90e2] mt-1">•</span>
            <span><strong>Route consolidation:</strong> Only the 5 most common routes were analysed, with approximately 60 other routes excluded due to low frequencies (fewer than 3 uses each).</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#4a90e2] mt-1">•</span>
            <span><strong>Web scraping time constraints:</strong> The data extraction process took 30-40 minutes for ~2300 rows, limiting the ability to re-run or validate data pulls efficiently.</span>
          </li>
        </ul>
      </div>

      {/* Methodological Limitations */}
      <div className={`p-8 rounded-[2rem] ${
        isDark 
          ? 'bg-[#1a2332]/60 border border-[#5ca4d8]/30' 
          : 'bg-[#e8f1f8] border border-[#5ca4d8]/20'
      }`}>
        <h3 className={`text-xl mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
          Methodological Considerations
        </h3>
        <ul className={`space-y-3 text-base leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
          <li className="flex gap-3">
            <span className="text-[#5ca4d8] mt-1">•</span>
            <span><strong>Proxy variables:</strong> Expedition group size was used as a proxy for commercialisation due to unavailability of direct economic measures, which may not fully capture the commercialisation phenomenon.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#5ca4d8] mt-1">•</span>
            <span><strong>Visualisation trade-offs:</strong> Initial route success rate graphs were misleading when frequency of use was ignored (routes used once or twice showed up to 100% success rates), requiring conversion to histograms with sum of success rate instead.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#5ca4d8] mt-1">•</span>
            <span><strong>Transparency settings:</strong> Alpha = 0.3-0.5 transparency was essential for scatter plots with 2000+ data points to show density patterns, but this introduces subjective visualisation choices.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#5ca4d8] mt-1">•</span>
            <span><strong>Temporal aggregation:</strong> Seasonal data was aggregated to annual measures, which may obscure important within-year variations in weather windows and crowding patterns.</span>
          </li>
        </ul>
      </div>

      {/* Confounding & Causality */}
      <div className={`p-8 rounded-[2rem] ${
        isDark 
          ? 'bg-[#1a2332]/60 border border-[#4a90e2]/30' 
          : 'bg-[#e8f1f8] border border-[#4a90e2]/20'
      }`}>
        <h3 className={`text-xl mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
          Confounding Factors & Causal Inference
        </h3>
        <ul className={`space-y-3 text-base leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
          <li className="flex gap-3">
            <span className="text-[#4a90e2] mt-1">•</span>
            <span><strong>Self-selection bias:</strong> Higher sherpa ratios may reflect both genuine support advantages and self-selection by less experienced climbers requiring more assistance.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#4a90e2] mt-1">•</span>
            <span><strong>Endogeneity concerns:</strong> Team size may reflect unobserved client experience levels, making it difficult to isolate the causal effect of team size on success.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#4a90e2] mt-1">•</span>
            <span><strong>Crowding correlation:</strong> Crowding varies systematically by route (South Col more crowded) and increases over time with commercialisation, making it difficult to separate crowding effects from route and temporal trends.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#4a90e2] mt-1">•</span>
            <span><strong>Omitted variables:</strong> Individual climber characteristics (experience, fitness, altitude acclimatisation capacity) and real-time weather conditions are not fully captured in the dataset.</span>
          </li>
        </ul>
      </div>

      {/* Scope Limitations */}
      <div className={`p-8 rounded-[2rem] ${
        isDark 
          ? 'bg-[#1a2332]/60 border border-[#5ca4d8]/30' 
          : 'bg-[#e8f1f8] border border-[#5ca4d8]/20'
      }`}>
        <h3 className={`text-xl mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
          Scope & Generalisability
        </h3>
        <ul className={`space-y-3 text-base leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
          <li className="flex gap-3">
            <span className="text-[#5ca4d8] mt-1">•</span>
            <span><strong>Temporal scope:</strong> Analysis restricted to 1990 onwards when expedition frequency rose significantly, excluding earlier pioneering expeditions with different risk profiles.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#5ca4d8] mt-1">•</span>
            <span><strong>Route exclusion:</strong> Alternative technical routes (West Ridge, Southwest Face) were excluded or underrepresented, limiting generalisability to highly experienced alpinist attempts.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#5ca4d8] mt-1">•</span>
            <span><strong>Sherpa perspective:</strong> Sherpa counts were excluded from crowding measures to avoid conflating crowding with support staffing, but this may underestimate total human traffic on the mountain.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#5ca4d8] mt-1">•</span>
            <span><strong>Death Zone specificity:</strong> The analysis focuses on expedition-level outcomes rather than individual-level Death Zone exposure and bottleneck queue times, which are critical for understanding mortality risk.</span>
          </li>
        </ul>
      </div>

      {/* Future Research Directions */}
      <div className={`p-8 rounded-[2rem] ${
        isDark 
          ? 'bg-[#1a2332]/80 backdrop-blur-md border border-[#4a90e2]/30' 
          : 'bg-transparent border border-[#4a90e2]/20'
      }`}>
        <h3 className={`text-xl mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
          Future Research Directions
        </h3>
        <div className={`space-y-3 text-base leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
          <p>
            Future research could address these limitations by incorporating individual-level climber data (experience, previous high-altitude attempts, medical screening results), real-time weather and bottleneck conditions, economic variables (expedition pricing, insurance costs), and longitudinal tracking of climbers across multiple attempts to better isolate causal mechanisms.
          </p>
          <p>
            Additionally, qualitative research through climber interviews and expedition leader perspectives would provide valuable context for interpreting quantitative patterns and understanding decision-making processes under extreme conditions.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <TabNavigation
        onPrevious={onPrevious}
        onNext={onNext}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
        customNextAction={() => onSectionNavigate?.(3)}
        customNextLabel="Data & Methods"
      />
    </div>
  );
}
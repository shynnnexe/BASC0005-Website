import { useTheme } from "../context/ThemeContext";

export function CrowdingMethodology() {
  const { isDark } = useTheme();

  return (
    <div className={`mt-12 p-8 rounded-[2rem] ${
      isDark 
        ? 'bg-[#1a2332]/60 border border-[#5ca4d8]/30' 
        : 'bg-[#e8f1f8] border border-[#5ca4d8]/20'
    }`}>
      <div className={`inline-block px-4 py-2 rounded-full mb-4 ${
        isDark ? 'bg-[#5ca4d8]/20 text-[#7bb3e0]' : 'bg-[#5ca4d8]/10 text-[#5ca4d8]'
      }`}>
        Methodology by Snigdha
      </div>
      
      <h3 className={`text-2xl mb-6 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
        Crowding and Popularity Factor:
      </h3>
      
      <div className={`space-y-4 text-base leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
        <p>
          To determine crowding and popularity on Mount Everest, several  metrics were considered. The analysis ultimately focused on annual counts of climbing members and annual expedition counts as primary proxies for participation intensity. Importantly, Sherpa counts were excluded from the crowding measure to avoid conflating crowding with support staffing, which is largely dependent on  member participation (i.e., the number of hired personnel typically scales with the number of members attempting to summit).
        </p>
        <p>
          Given that the dataset recorded participation at the seasonal level, I constructed annual aggregates using the 'group-by' method. Specifically, seasonal observations were aggregated by Year (implemented via groupby('Year') with .agg()), yielding the total number of members per year. To visualise longer-run growth in participation, cumulative participation  was computed using total_members.cumsum() (W3Schools, 2026), so we could visualise the slope of the cumulative curve as an indicator of the rate of increase in Everest participation over time.
        </p>
        <p>
          In parallel, the number of expeditions per year was computed and plotted as a complementary indicator of popularity and crowding dynamics. As anticipated, expedition counts displayed a broadly similar upward trajectory to member participation, consistent with increasing popularity of Everest.
        </p>
        <p>
          To explore the potential relationship between crowding/popularity and outcomes, these annual participation measures were plotted against the summit success rate. A line of best fit was added to evaluate the direction of association. The best fit line in our case suggested a weak positive trend, indicating that years with higher expedition volumes were associated with higher success rates.
        </p>
      </div>

      <div className={`mt-8 p-6 rounded-2xl ${
        isDark ? 'bg-[#0f1419]/60' : 'bg-[#f0f4f8]'
      }`}>
        <p className={`text-sm italic ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
          Reference: W3Schools (2026) <em>Python cumsum() Method.</em> (Accessed: 5 January 2026)
        </p>
      </div>
    </div>
  );
}

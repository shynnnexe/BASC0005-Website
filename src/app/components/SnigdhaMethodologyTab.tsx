import { useTheme } from "../context/ThemeContext";

export function SnigdhaMethodologyTab() {
  const { isDark } = useTheme();

  return (
    <div className="space-y-12 max-w-5xl">
      {/* Header */}
      <div>
        <div className={`inline-block px-4 py-2 rounded-full mb-4 ${
          isDark ? 'bg-[#5ca4d8]/20 text-[#7bb3e0]' : 'bg-[#5ca4d8]/10 text-[#5ca4d8]'
        }`}>
          Analysed by Snigdha
        </div>
        <h2 className={`text-4xl mb-6 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
          Snigdha's Methodology
        </h2>
      </div>

      {/* Crowding and Popularity Factor */}
      <div>
        <h3 className={`text-2xl mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
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
      </div>

      {/* Expedition Size Factor */}
      <div>
        <h3 className={`text-2xl mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
          Expedition Size Factor:
        </h3>
        <div className={`space-y-4 text-base leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
          <p>
            To examine how Everest expeditions have evolved over time, we wanted to incorporate economic indicators of expedition demand and commercialisation. However, because  economic variables (e.g., price, sherpa revenue, client expenditure) were not  available across the 1990 to present time period, expedition group size was used as a proxy for commercialisation. The underlying rationale being that increasing commercial operations may be reflected in operators' scaling capacity (hosting larger numbers of members per expedition) thereby shifting the value of expedition size over time.
          </p>
          <p>
            Group size was available in the dataset. An initial visualisation was produced using a scatter plot of group size against year, however because the dataset contained substantial overlapping points (multiple expeditions with identical or similar sizes within the same year), we  introduced transparency by (setting α = 0.3) (Matplotlib, 2025) to reduce overplotting and make density patterns more interpretable.
          </p>
          <p>
            The scatter plot indicated that year-specific density and shifts in the distribution of group sizes were central to interpretation. Accordingly, a heat map was generated to more clearly identify periods characterised by rapid growth in expedition size and/or increased concentration of larger groups.
          </p>
          <p>
            Finally, to assess whether increasing expedition size is associated with different outcomes, expedition group size was examined in relation to summit success. Specifically, the analysis tested whether larger groups exhibited different success probabilities (i.e., whether larger expedition sizes are associated with greater operational risk, reduced efficiency, or conversely improved success through greater support capacity).
          </p>
        </div>
      </div>

      {/* References */}
      <div className={`mt-12 p-8 rounded-[2rem] ${ isDark 
          ? 'bg-[#1a2332]/60 border border-[#5ca4d8]/30' 
          : 'bg-[#e8f1f8] border border-[#5ca4d8]/20'
      }`}>
        <h4 className={`text-lg mb-4 font-semibold ${isDark ? 'text-[#7bb3e0]' : 'text-[#5ca4d8]'}`}>
          References
        </h4>
        <div className={`space-y-2 text-sm ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
          <p>
            Matplotlib (2025) <em>matplotlib.pyplot.scatter — Matplotlib API reference.</em> Available at: https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.scatter.html (Accessed: 5 January 2026)
          </p>
          <p>
            W3Schools (2026) <em>Python cumsum() Method.</em> (Accessed: 5 January 2026)
          </p>
        </div>
      </div>
    </div>
  );
}

import { useTheme } from "../context/ThemeContext";

export function TeamSizeMethodology() {
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

      <div className={`mt-8 p-6 rounded-2xl ${
        isDark ? 'bg-[#0f1419]/60' : 'bg-[#f0f4f8]'
      }`}>
        <p className={`text-xs md:text-sm italic break-words ${isDark ? 'text-[#9eb3c8]' : 'text-[#546e7a]'}`}>
          Reference: Matplotlib (2025) <em>matplotlib.pyplot.scatter — Matplotlib API reference.</em> Available at: https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.scatter.html (Accessed: 5 January 2026)
        </p>
      </div>
    </div>
  );
}
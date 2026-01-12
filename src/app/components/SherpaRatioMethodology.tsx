import { useTheme } from "../context/ThemeContext";

export function SherpaRatioMethodology() {
  const { isDark } = useTheme();

  return (
    <div className={`mt-12 p-8 rounded-[2rem] ${
      isDark 
        ? 'bg-[#1a2332]/60 border border-[#4a90e2]/30' 
        : 'bg-[#e8f1f8] border border-[#4a90e2]/20'
    }`}>
      <div className={`inline-block px-4 py-2 rounded-full mb-4 ${
        isDark ? 'bg-[#4a90e2]/20 text-[#5ca4d8]' : 'bg-[#4a90e2]/10 text-[#4a90e2]'
      }`}>
        Methodology by Alice
      </div>
      
      <h3 className={`text-2xl mb-6 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
        Member: Hired Ratio Factor:
      </h3>
      
      <div className={`space-y-4 text-base leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
        <p>
          Firstly we made sure the data was seen by python as numerical (pd.to_numerical), and sorted chronologically (df.sort_values(by='Year', ascending=True)). An initial scatter plot showed that a significant number of expeditions had member: hired ratio of 0, which seemed unlikely. A quick look through the actual data revealed some expeditions of only Sherpas – for example expeditions for rope-fixing (such as this expedition in 2021: EVER-211-01). These were called 'Sherpa Rope-Fixing' and so were simple to filter out:
        </p>
      </div>

      <div className={`mt-4 p-6 rounded-[2rem] shadow-lg ${
        isDark 
          ? 'bg-[#0d1117] border-2 border-[#4a90e2]/40' 
          : 'bg-[#1e1e1e] border-2 border-[#4a90e2]/20'
      }`}>
        <pre className={`text-sm leading-relaxed overflow-x-auto ${isDark ? 'text-[#58a6ff]' : 'text-[#9cdcfe]'}`}>
{`df2 = df[~df['Leader(s)'].astype(str).str.contains('Sherpa Rope-Fixing', case=False, na=False)]`}</pre>
      </div>

      <div className={`mt-6 space-y-4 text-base leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
        <p>
          However, the data frame still had approximately a quarter of all expeditions shown with a 0 member: hired ratio. Upon inspection of some of these expeditions they proved to be research trips, however there was no way to filter these out. We decided to continue with the full dataset rather than remove such a significant number of data points, with an awareness that it may not be an entirely accurate depiction of the expeditions. It is likely a problem with the data being recorded incorrectly.
        </p>
        <p>
          A small but important detail with the scatter graphs for this factor was the inclusion of the "alpha = 0.5" argument; having over 2000 data points in one scatter graph can make them difficult to read and understand where the high frequencies are – so using a lower transparency proved vital.
        </p>
        <p>
          Similarly, lines of best fit were added to the graphs to visualise the overall trends.
        </p>
        <p>
          As well as the scatter plots comparing year or success rate with member: hired ratio, we looked at the average ratios for different expedition results:
        </p>
      </div>

      <div className={`mt-4 p-6 rounded-[2rem] shadow-lg ${
        isDark 
          ? 'bg-[#0d1117] border-2 border-[#5ca4d8]/40' 
          : 'bg-[#1e1e1e] border-2 border-[#5ca4d8]/20'
      }`}>
        <pre className={`text-xs md:text-sm leading-relaxed overflow-x-auto ${isDark ? 'text-[#79c0ff]' : 'text-[#9cdcfe]'}`}>
{`df2.groupby('result_code')['mbr_hired_ratio'].mean()`}</pre>
      </div>
    </div>
  );
}
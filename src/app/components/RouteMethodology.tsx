import { useTheme } from "../context/ThemeContext";

export function RouteMethodology() {
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
        The Routes Factor:
      </h3>
      
      <div className={`space-y-4 text-base leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
        <p>
          With the Route column already cleaned, initial visualisations were created. The aim was to show any changes in route popularity since 1990. A stacked bar graph was created using Matplotlib but a 35-year timeframe called for a different format to show changes more clearly. Given our final format of a website, an animated bar graph was an appropriate visualisation. This was done using Plotly (https://plotly.com/python/animations/, https://plotly.com/python/bar-charts/#bar-chart-with-plotly-express)
        </p>
        <p>
          Next, we wanted to compare routes to success rate. Grouping the data frame by Year and Route codes created a yearly success rate of each route. This was visualised simply using Matplotlib to create line graphs using average success rate of all years. For comparison by year, another animated bar graph was used (again using Plotly). The first version of this graph was misleading – when frequency of use for routes is ignored the visualisations can appear deceptive. For example, a route that is used once or twice in a year, but with very successful expeditions appears on the graph as having unusually high success rates – up to 100%. To avoid this issue, a histogram was used instead, on which the Y-axis was sum of success rate instead.
        </p>
        <p>
          Similarly route death rate was considered, allowing us to consider the most fatal route. This was done as an average since 1990 on a simple Matplotlib line graph.
        </p>
      </div>
    </div>
  );
}

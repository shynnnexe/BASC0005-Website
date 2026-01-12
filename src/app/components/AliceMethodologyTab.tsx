import { useTheme } from "../context/ThemeContext";

export function AliceMethodologyTab() {
  const { isDark } = useTheme();

  return (
    <div className="space-y-12 max-w-5xl">
      {/* Header */}
      <div>
        <div className={`inline-block px-4 py-2 rounded-full mb-4 ${
          isDark ? 'bg-[#4a90e2]/20 text-[#5ca4d8]' : 'bg-[#4a90e2]/10 text-[#4a90e2]'
        }`}>
          Analysed by Alice
        </div>
        <h2 className={`text-4xl mb-6 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
          Alice's Methodology
        </h2>
      </div>

      {/* The Expeditions Dataset */}
      <div>
        <h3 className={`text-2xl mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
          The Expeditions Dataset:
        </h3>
        <div className={`space-y-4 text-base leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
          <p>
            The Himalayan Database provided an extensive amount of data on summit attempts since records began in 1921. However we chose to filter this dataset to 1990 onwards – this was when frequency of expeditions rose significantly. (See Climbers over time image) We chose to use a dataset (Peak Expeditions Report, Peak ID: EVER) that used each expedition as each row as it allowed for analysis of variables such as paid climber to hired ratio and expedition size. However this dataset lacked information that the individual expedition pages held – so we wrote a function in python to extract the information we wanted using the expedition ID.
          </p>
          <p>
            The function sent an HTTP request to the URL and we used Beautiful Soup to parse the content of the response, which allowed us to access to page elements. Using "soup.find(..)" the function found the desired information (found with element ID) and returns the results in a list. We extracted the expedition size, paid climber count, sherpa count, paid climber deaths and sherpa deaths, and created 5 new columns in the expeditions dataset with this information. The size of the dataset (~2300 rows) meant this function took approximately 30-40 minutes to complete, but the result was a dataset with all the information needed.
          </p>
          <p>
            Both the Result and Route(s) columns contained entries that were inconsistently formatted, with variation in punctuation and capitalisation, as well as other notes (particularly in the route column). Therefore cleaning was required to allow semantically identical entries with small differences to be treated as the same category. This was the cleaning process used for both Result and Route columns:
          </p>
        </div>

        <div className={`mt-6 p-8 rounded-[2rem] shadow-lg ${
          isDark 
            ? 'bg-[#0d1117] border-2 border-[#4a90e2]/40' 
            : 'bg-[#1e1e1e] border-2 border-[#4a90e2]/20'
        }`}>
          <pre className={`text-sm leading-relaxed overflow-x-auto ${isDark ? 'text-[#58a6ff]' : 'text-[#9cdcfe]'}`}>
{`df['result_clean'] = (
    df ['Result']
    .astype(str)
    .str.lower()
    .str.replace(r'\\(.*?\\)', '', regex=True)
    .str.replace(r'\\s+', ' ', regex=True)
    .str.strip()
)`}</pre>
        </div>

        <p className={`mt-6 leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
          The Route column cleaning process contained an extra few lines:
        </p>

        <div className={`mt-4 p-8 rounded-[2rem] shadow-lg ${
          isDark 
            ? 'bg-[#0d1117] border-2 border-[#5ca4d8]/40' 
            : 'bg-[#1e1e1e] border-2 border-[#5ca4d8]/20'
        }`}>
          <pre className={`text-sm leading-relaxed overflow-x-auto ${isDark ? 'text-[#79c0ff]' : 'text-[#9cdcfe]'}`}>
{`.str.replace(',', '/', regex=False)
.str.replace(';', '/', regex=False)       
.str.split('/')                           
.str[0]`}</pre>
        </div>

        <p className={`mt-6 leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
          This meant only the first route was kept as it referred to the main route used, with other minor diversions noted afterwards.
          Both of these columns were then mapped to numerical values to make graphing and regression processes simpler. Only the most common 5 routes were kept, which accounted for the majority; the remaining routes were excluded due to their low individual frequencies (approximately 60 other routes each used fewer than 3 times).
        </p>

        <p className={`mt-6 leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
          The mapping code used:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className={`p-6 rounded-[2rem] shadow-lg ${
            isDark 
              ? 'bg-[#0d1117] border-2 border-[#7bb3e0]/40' 
              : 'bg-[#1e1e1e] border-2 border-[#7bb3e0]/20'
          }`}>
            <h4 className={`text-lg mb-4 font-semibold ${isDark ? 'text-[#7bb3e0]' : 'text-[#9cdcfe]'}`}>
              Result
            </h4>
            <pre className={`text-xs leading-relaxed overflow-x-auto ${isDark ? 'text-[#79c0ff]' : 'text-[#9cdcfe]'}`}>
{`df['result_code'] = (
    df['result_clean']
    .map({
        'success': 1,
        'accident': 2,
        'route difficulty': 3,
        'illness, ams': 4,
        'lack of supplies': 5,
        'bad weather': 6,
        'bad conditions': 6,
        'other': 7,
        'lack of time': 8,
        'did not climb': 9,
        'unknown': 10
    })
    .fillna(11)
    .astype(int)
)`}</pre>
          </div>

          <div className={`p-6 rounded-[2rem] shadow-lg ${
            isDark 
              ? 'bg-[#0d1117] border-2 border-[#9dc9ef]/40' 
              : 'bg-[#1e1e1e] border-2 border-[#9dc9ef]/20'
          }`}>
            <h4 className={`text-lg mb-4 font-semibold ${isDark ? 'text-[#9dc9ef]' : 'text-[#9cdcfe]'}`}>
              Route
            </h4>
            <pre className={`text-xs leading-relaxed overflow-x-auto ${isDark ? 'text-[#a5d6ff]' : 'text-[#9cdcfe]'}`}>
{`df ['route_codes'] = (
    df ['clean_routes']
    .map({
        's col-se ridge': 1,
        'n col-ne ridge': 2,
        'n face': 3,
        'sw face': 4,
        's pillar-se ridge': 5,
    })
    .fillna(6)
)`}</pre>
          </div>
        </div>
      </div>

      {/* Success Rate Variables */}
      <div>
        <h3 className={`text-2xl mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
          For success rate we had two variables:
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className={`text-lg mb-4 font-semibold ${isDark ? 'text-[#5ca4d8]' : 'text-[#4a90e2]'}`}>
              Expedition Success
            </h4>
            <div className={`p-6 rounded-[2rem] shadow-lg ${
              isDark 
                ? 'bg-[#0d1117] border-2 border-[#4a90e2]/40' 
                : 'bg-[#1e1e1e] border-2 border-[#4a90e2]/20'
            }`}>
              <pre className={`text-sm leading-relaxed ${isDark ? 'text-[#58a6ff]' : 'text-[#9cdcfe]'}`}>
{`df['grp_success']= np.where(
    df['result_clean'] == 'success', 
    1, 
    0
)`}</pre>
            </div>
          </div>

          <div>
            <h4 className={`text-lg mb-4 font-semibold ${isDark ? 'text-[#7bb3e0]' : 'text-[#5ca4d8]'}`}>
              Individual Success
            </h4>
            <div className={`p-6 rounded-[2rem] shadow-lg ${
              isDark 
                ? 'bg-[#1a2332]/80 backdrop-blur-md border border-[#5ca4d8]/30' 
                : 'bg-white/90 backdrop-blur-md border border-[#5ca4d8]/20'
            }`}>
              <div className={`text-sm leading-relaxed ${isDark ? 'text-[#c5d3e2]' : 'text-[#2c3e50]'}`}>
                <p className="mb-4">Using Excel, we created the Member: Hired Ratio variable via the equation:</p>
                <div className={`p-4 rounded-xl mb-4 ${isDark ? 'bg-[#0d1117]/60' : 'bg-[#f0f4f8]'}`}>
                  <p className="font-mono text-center text-base">
                    Member: Hired Ratio = total_members ÷ hired_count
                  </p>
                </div>
                <p className="mb-2">Finally, we combined the member and sherpa death counts to create a death rate variable:</p>
                <div className={`p-4 rounded-xl ${isDark ? 'bg-[#0d1117]/60' : 'bg-[#f0f4f8]'}`}>
                  <p className="font-mono text-center text-base">
                    Death Rate = (member_deaths + sherpa_deaths) ÷ group_size
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Routes Factor */}
      <div>
        <h3 className={`text-2xl mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
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

      {/* Member:Hired Ratio Factor */}
      <div>
        <h3 className={`text-2xl mb-4 ${isDark ? 'text-white' : 'text-[#1a2332]'}`}>
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
          <pre className={`text-sm leading-relaxed ${isDark ? 'text-[#79c0ff]' : 'text-[#9cdcfe]'}`}>
{`df2.groupby('result_code')['mbr_hired_ratio'].mean()`}</pre>
        </div>
      </div>
    </div>
  );
}

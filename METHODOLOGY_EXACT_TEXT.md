# Exact Methodology Text for Academic Work

## Alice's Methodology

### The Expeditions Dataset:

The Himalayan Database provided an extensive amount of data on summit attempts since records began in 1921. However we chose to filter this dataset to 1990 onwards – this was when frequency of expeditions rose significantly. (See Climbers over time image) We chose to use a dataset (Peak Expeditions Report, Peak ID: EVER) that used each expedition as each row as it allowed for analysis of variables such as paid climber to hired ratio and expedition size. However this dataset lacked information that the individual expedition pages held – so we wrote a function in python to extract the information we wanted using the expedition ID.

The function sent an HTTP request to the URL and we used Beautiful Soup to parse the content of the response, which allowed us to access to page elements. Using "soup.find(..)" the function found the desired information (found with element ID) and returns the results in a list. We extracted the expedition size, paid climber count, sherpa count, paid climber deaths and sherpa deaths, and created 5 new columns in the expeditions dataset with this information. The size of the dataset (~2300 rows) meant this function took approximately 30-40 minutes to complete, but the result was a dataset with all the information needed.

Both the Result and Route(s) columns contained entries that were inconsistently formatted, with variation in punctuation and capitalisation, as well as other notes (particularly in the route column). Therefore cleaning was required to allow semantically identical entries with small differences to be treated as the same category. This was the cleaning process used for both Result and Route columns:

```python
df['result_clean'] = (
df ['Result']
.astype(str)
.str.lower()
.str.replace(r'\(.*?\)', '', regex=True)
.str.replace(r'\s+', ' ', regex=True)
.str.strip()
)
```

The Route column cleaning process contained an extra few lines:

```python
.str.replace(',', '/', regex=False)
.str.replace(';', '/', regex=False)       
.str.split('/')                           
.str[0]  
```

This meant only the first route was kept as it referred to the main route used, with other minor diversions noted afterwards.
Both of these columns were then mapped to numerical values to make graphing and regression processes simpler. Only the most common 5 routes were kept, which accounted for the majority; the remaining routes were excluded due to their low individual frequencies (approximately 60 other routes each used fewer than 3 times).

The mapping code used:

**Result:**
```python
df['result_code'] = (
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
)
```

**Route:**
```python
df ['route_codes'] = (
	df ['clean_routes']
	.map({
    	's col-se ridge': 1,
    	'n col-ne ridge': 2,
    	'n face': 3,
    	'sw face': 4,
    	's pillar-se ridge': 5,
	})
	.fillna(6)
)
```

For success rate we had two variables:

**Expedition Success:**
```python
df['grp_success']= np.where(df['result_clean'] == 'success', 1, 0)
```

**Individual Success:**

Using Excel, we created the Member: Hired Ratio variable via the equation:
- Member:Hired Ratio = total_members ÷ hired_count

Finally, we combined the member and sherpa death counts to create a death rate variable:
- Death Rate = (member_deaths + sherpa_deaths) ÷ group_size

### The Routes Factor:

With the Route column already cleaned, initial visualisations were created. The aim was to show any changes in route popularity since 1990. A stacked bar graph was created using Matplotlib but a 35-year timeframe called for a different format to show changes more clearly. Given our final format of a website, an animated bar graph was an appropriate visualisation. This was done using Plotly (https://plotly.com/python/animations/, https://plotly.com/python/bar-charts/#bar-chart-with-plotly-express)

Next, we wanted to compare routes to success rate. Grouping the data frame by Year and Route codes created a yearly success rate of each route. This was visualised simply using Matplotlib to create line graphs using average success rate of all years. For comparison by year, another animated bar graph was used (again using Plotly). The first version of this graph was misleading – when frequency of use for routes is ignored the visualisations can appear deceptive. For example, a route that is used once or twice in a year, but with very successful expeditions appears on the graph as having unusually high success rates – up to 100%. To avoid this issue, a histogram was used instead, on which the Y-axis was sum of success rate instead.

Similarly route death rate was considered, allowing us to consider the most fatal route. This was done as an average since 1990 on a simple Matplotlib line graph.

### Member: Hired Ratio Factor:

Firstly we made sure the data was seen by python as numerical (pd.to_numerical), and sorted chronologically (df.sort_values(by='Year', ascending=True)). An initial scatter plot showed that a significant number of expeditions had member: hired ratio of 0, which seemed unlikely. A quick look through the actual data revealed some expeditions of only Sherpas – for example expeditions for rope-fixing (such as this expedition in 2021: EVER-211-01). These were called 'Sherpa Rope-Fixing' and so were simple to filter out:

```python
df2 = df[~df['Leader(s)'].astype(str).str.contains('Sherpa Rope-Fixing', case=False, na=False)]
```

However, the data frame still had approximately a quarter of all expeditions shown with a 0 member: hired ratio. Upon inspection of some of these expeditions they proved to be research trips, however there was no way to filter these out. We decided to continue with the full dataset rather than remove such a significant number of data points, with an awareness that it may not be an entirely accurate depiction of the expeditions. It is likely a problem with the data being recorded incorrectly.

A small but important detail with the scatter graphs for this factor was the inclusion of the "alpha = 0.5" argument; having over 2000 data points in one scatter graph can make them difficult to read and understand where the high frequencies are – so using a lower transparency proved vital.

Similarly, lines of best fit were added to the graphs to visualise the overall trends.

As well as the scatter plots comparing year or success rate with member: hired ratio, we looked at the average ratios for different expedition results:

```python
df2.groupby('result_code')['mbr_hired_ratio'].mean()
```

---

## Snigdha's Methodology

### Crowding and Popularity Factor:

To determine crowding and popularity on Mount Everest, several  metrics were considered. The analysis ultimately focused on annual counts of climbing members and annual expedition counts as primary proxies for participation intensity. Importantly, Sherpa counts were excluded from the crowding measure to avoid conflating crowding with support staffing, which is largely dependent on  member participation (i.e., the number of hired personnel typically scales with the number of members attempting to summit).

Given that the dataset recorded participation at the seasonal level, I constructed annual aggregates using the 'group-by' method. Specifically, seasonal observations were aggregated by Year (implemented via groupby('Year') with .agg()), yielding the total number of members per year. To visualise longer-run growth in participation, cumulative participation  was computed using total_members.cumsum() (W3Schools, 2026), so we could visualise the slope of the cumulative curve as an indicator of the rate of increase in Everest participation over time.

In parallel, the number of expeditions per year was computed and plotted as a complementary indicator of popularity and crowding dynamics. As anticipated, expedition counts displayed a broadly similar upward trajectory to member participation, consistent with increasing popularity of Everest.

To explore the potential relationship between crowding/popularity and outcomes, these annual participation measures were plotted against the summit success rate. A line of best fit was added to evaluate the direction of association. The best fit line in our case suggested a weak positive trend, indicating that years with higher expedition volumes were associated with higher success rates. 

### Expedition Size Factor:

To examine how Everest expeditions have evolved over time, we wanted to incorporate economic indicators of expedition demand and commercialisation. However, because  economic variables (e.g., price, sherpa revenue, client expenditure) were not  available across the 1990 to present time period, expedition group size was used as a proxy for commercialisation. The underlying rationale being that increasing commercial operations may be reflected in operators' scaling capacity (hosting larger numbers of members per expedition) thereby shifting the value of expedition size over time.

Group size was available in the dataset. An initial visualisation was produced using a scatter plot of group size against year, however because the dataset contained substantial overlapping points (multiple expeditions with identical or similar sizes within the same year), we  introduced transparency by (setting α = 0.3) (Matplotlib, 2025) to reduce overplotting and make density patterns more interpretable. 

The scatter plot indicated that year-specific density and shifts in the distribution of group sizes were central to interpretation. Accordingly, a heat map was generated to more clearly identify periods characterised by rapid growth in expedition size and/or increased concentration of larger groups. 

Finally, to assess whether increasing expedition size is associated with different outcomes, expedition group size was examined in relation to summit success. Specifically, the analysis tested whether larger groups exhibited different success probabilities (i.e., whether larger expedition sizes are associated with greater operational risk, reduced efficiency, or conversely improved success through greater support capacity).

### References:

Matplotlib (2025) matplotlib.pyplot.scatter — Matplotlib API reference. Available at: https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.scatter.html (Accessed: 5 January 2026)

W3Schools (2026) Python cumsum() Method. (Accessed: 5 January 2026)

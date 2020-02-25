# Project002_Diabetes
UCD Data Analytics Bootcamp Project #002

Data and Diabetes Prevention

Project Overview:
National data from the Centers for Disease Control show that diabetes has been on an upward trend since the 1980s. This project brings together data from the CDC and the US Census Bureau to explore what diabetes looks like closer to home, and to help map out a story of prevention for policy makers and public health stakeholders. 

Diabetes is not only costly for those suffering poor health outcomes of the disease; people with diabetes are counted among the sickest and most expensive 5% of patients consuming 50% of U.S. health care spending (50% of $3.5 trillion is a lot) .

For the first data visualization, the team used Leaflet to create an interactive choropleth map showing the rate of diabetes for each county in California. The second view presents rates of diabetes compared against multiple population characteristics – economic, education, and health – for each county in California. These interactive scatter plots and line charts were developed using JavaScript and D3.

For the third view, we zoom in on one county to map out specific census tracts. The purpose is to identify areas where investments in preventative programs may have high potential benefit for improving long-term health outcomes and managing public health care costs. 
CDC data shows that individuals with less than a high school education have a greater incidence rate of diabetes than those who have more than a high school education (13% vs. 7% in 2017). People with low levels of educational attainment are also more likely to suffer poverty and have a need for subsidized health care. Therefore, educational attainment as chosen as the factor to map at the census tract level. This interactive choropleth map was also created using Leaflet.

Challenges
One of the biggest challenges was finding the geodata needed for the choropleth maps based on Census division (e.g., Census tracts). Fortunately, we found the loganpowell GitHub gold mine, making Census cartography files available in GeoJSON format. Because the GeoJSON file size is quite large, the team explored the use of TopoJSON to compress files and speed processing.


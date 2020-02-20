// Create plot orientation setup for Diabetes vs. Education (Bachelor Degree)  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
var svgWidth = 960;
var svgHeight = 500;
var margin = { top: 20, right: 40, bottom: 60, left: 120 };
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG WRAPPER, append it to a group and adjust margins
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append the SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

// Import the data and format numbers to integers
d3.csv("counties.csv", function(error, censusData) {
  if (error) throw error;
console.log(censusData)

censusData.forEach(function(data) {
  data.diabetes = +data.DIABETES_CASES;
  data.compFactor = +data.EDUCATION_bachelor; // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  console.log(data.DIABETES_CASES)
  console.log(data.EDUCATION_bachelor) // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
});

// Define the scale for x and y axis
var xLinearScale = d3.scaleLinear().range([0, width]);
var yLinearScale = d3.scaleLinear().range([height, 0]);

// Define the DATA functions for x and y axis
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

var xMin = d3.min(censusData, function(data) {
  return data.diabetes;
});
var xMax =  d3.max(censusData, function(data) {
  return data.diabetes;
});
var yMin = d3.min(censusData, function(data) {
  return data.compFactor;
});
var yMax = d3.max(censusData, function(data) {
  return data.compFactor;
});

xLinearScale.domain([xMin, xMax +25000]);
yLinearScale.domain([yMin, yMax +25000]);
console.log(xMin);
console.log(xMax);
console.log(yMin);
console.log(yMax);

// Append x and y axis to the plot
chartGroup.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);
chartGroup.append("g")
  .call(leftAxis);

// Draw the circles for the bubble plot
var circlesGroup = chartGroup.selectAll("circle")
  .data(censusData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.diabetes))
  .attr("cy", d => yLinearScale(d.compFactor))
  .attr("r", "12")
  .attr("fill", "dodgerblue")
  .attr("opacity", .7)
  .style("stroke", "black")

//Additional formatting and create the labels for the x and y axis
chartGroup.append("text")
  .style("font-size", "12px")
  .selectAll("tspan")
  .data(censusData)
  .enter()
  .append("tspan")
    .attr("x", function(data) {
      return xLinearScale(data.diabetes);
    })
    .attr("y", function(data) {
      return yLinearScale(data.compFactor);
    })
    .text(function(data) {
      return data.abbr
    });

// Build the TOOLTIPS and call it into the chart
var toolTip = d3.tip()
  .attr("class", "tooltip")
  .offset([45, -30])
  .html(function(d) {
    return (d.Geographic_Area_Name + " DC:" +d.DIABETES_CASES+ " HS:" +d.EDUCATION_bachelor) // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  });

chartGroup.call(toolTip);

// Event listener for tooltips on and off
circlesGroup.on("mouseover", function(data) {
  toolTip.show(data, this);
})

.on("mouseout", function(data, index) {
    toolTip.hide(data);
});

  chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - 75)
  .attr("x", 0 - 195)
  .attr("text-anchor", "middle")  
  .attr("dy", "1em")
  .attr("class", "axisText")
  .text("College Degree"); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

chartGroup.append("text")
  .attr("x", 0 + 430)
  .attr("y", 0 + 460)
  .style("text-anchor", "middle")
  .attr("class", "axisText")
  .text("Diabetes Cases");

  chartGroup.append("text")
  .attr("x", 0 + 450)
  .attr("y", 0 +10)
  .attr("text-anchor", "middle")  
  .style("font-size", "16px") 
  .style("text-decoration", "underline")  
  .text("EDUCATION VS. DIABETES 2"); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

return circlesGroup;
});

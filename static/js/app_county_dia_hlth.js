// Chart Parameters
var svgWidth = 960;
var svgHeight = 500;
var margin = { top: 20, right: 40, bottom: 60, left: 50 };
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data from an external CSV file
d3.csv("counties.csv").then(function(censusData) {
console.log(censusData);

// Format the data
censusData.forEach(function(data) {
    data.DIABETES_CASES = +data.DIABETES_CASES;
    data.HEALTH_NoInsurance = +data.HEALTH_NoInsurance; // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    data.HEALTH_Insurance = +data.HEALTH_Insurance; // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  });

  // Create scaling functions
  var xLinearScale = d3.scaleLinear()
    .domain([20, d3.max(censusData, d => d.DIABETES_CASES)])
    .range([0, width]);  

  var yLinearScale1 = d3.scaleLinear()
    .domain([0, d3.max(censusData, d => d.HEALTH_NoInsurance)]) // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    .range([height, 0]);

  var yLinearScale2 = d3.scaleLinear()
    .domain([0, d3.max(censusData, d => d.HEALTH_Insurance)]) // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    .range([height, 0]);

  // Create axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale1);
  var rightAxis = d3.axisRight(yLinearScale2);

  // Add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Add y1-axis to the left side of the display
  chartGroup.append("g")
    .classed("green", true)
    .call(leftAxis);

  // Add y2-axis to the right side of the display
  chartGroup.append("g")
    .classed("blue", true)
    .attr("transform", `translate(${width}, 0)`)
    .call(rightAxis);

  // Line generators for each line
  var line1 = d3.line()
    .x(d => xLinearScale(d.DIABETES_CASES))
    .y(d => yLinearScale1(d.HEALTH_NoInsurance)); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  var line2 = d3.line()
    .x(d => xLinearScale(d.DIABETES_CASES))
    .y(d => yLinearScale2(d.HEALTH_Insurance)); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  // Append a path for line1
  chartGroup.append("path")
    .data([censusData])
    .attr("d", line1)
    .classed("line green", true);

  // Append a path for line2
  chartGroup.append("path")
    .data([censusData])
    .attr("d", line2)
    .classed("line blue", true);

  // Append axes titles
chartGroup.append("text")
  .attr("x", 0 + 450)
  .attr("y", 0 + 470)
  .style("text-anchor", "middle")
  .attr("class", "axisText")
  .text("Diabetes Cases");

chartGroup.append("text")
  .attr("x", 0 + 450)
  .attr("y", 0 +10)
  .attr("text-anchor", "middle")  
  .style("font-size", "16px") 
  .style("text-decoration", "underline")  
  .text("HEALTH VS. DIABETES"); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  chartGroup.append("text")
  .attr("transform", `translate(${-40}, ${height + margin.top + 20})`)
    .classed("y1_text", true)
    .text("No Health Insurance"); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  chartGroup.append("text")
  .attr("transform", `translate(${width - 80}, ${height + margin.top + 20})`)
    .classed("y2_text", true)
    .text("Health Insurance"); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
});
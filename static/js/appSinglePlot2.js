

$(document).ready(function(){

  plotGraph(1)
  $("#graphSelector").on("change",function(){
    console.log(this.value + "test");

    plotGraph(this.value);
  })
});


function plotGraph(num){
  $(".plottedGraph").hide();
option = parseInt(num);
switch(option) {
  case 1:
  console.log("INCOME VS. DIABETES");
    // Create plot orientation setup for Diabetes vs. Economic (Median Household Income)
plotCountryDiabetesGraph("INCOME VS. DIABETES", "DIABETES", "Median Income", "Mean Income", "ECONOMIC_medianincome", "ECONOMIC_meanincome");
  break;
  
  case 2:
  console.log("Education vs Diabetes 2");
    // Create plot orientation setup for Diabetes vs. Economic (Mean Household Income)  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
plotCountryDiabetesGraph("EDUCATION VS. DIABETES", "DIABETES", "No High School", "Bachelor Degree", "EDUCATION_hsdropout", "EDUCATION_bachelor");
    break;
  
   case 3:
    // Create plot orientation setup for Diabetes vs. Education (Bachelor Degree)  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
plotCountryDiabetesGraph("HEALTH VS. DIABETES", "DIABETES", "No Health Insurance", "Health Insurance", "HEALTH_NoInsurance", "HEALTH_Insurance");
    break;

  default:
    // code block
}

}

function plotCountryDiabetesGraph(displayText,x_axis_name,y1_axis_name, y2_axis_name, datapoint1, datapoint2){
  // Chart Parameters
var svgWidth = 960;
var svgHeight = 500;
var margin = { top: 20, right: 40, bottom: 60, left: 60 };
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("class","plottedGraph");

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

// Import data from an external CSV file
d3.csv("counties.csv", function(error, censusData) {
  if (error) throw error;
console.log(censusData);

// Format the data
censusData.forEach(function(data) {
    data.DIABETES_CASES = +data.DIABETES_CASES;
    data[datapoint1] = +data[datapoint1]; // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    data[datapoint2] = +data[datapoint2]; // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  });

  // Create scaling functions
  var xLinearScale = d3.scaleLinear()
    .domain([20, d3.max(censusData, d => d.DIABETES_CASES)])
    .range([0, width]);  

  var yLinearScale1 = d3.scaleLinear()
    .domain([0, d3.max(censusData, d => d[datapoint1])]) // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    .range([height, 0]);

  var yLinearScale2 = d3.scaleLinear()
    .domain([0, d3.max(censusData, d => d[datapoint2])]) // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
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
    .y(d => yLinearScale1(d[datapoint1])); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  var line2 = d3.line()
    .x(d => xLinearScale(d.DIABETES_CASES))
    .y(d => yLinearScale2(d[datapoint2])); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

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
  .text(x_axis_name);

chartGroup.append("text")
  .attr("x", 0 + 450)
  .attr("y", 0 +10)
  .attr("text-anchor", "middle")  
  .style("font-size", "16px") 
  .style("text-decoration", "underline")  
  .text(displayText); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  chartGroup.append("text")
  .attr("transform", `translate(${-40}, ${height + margin.top + 20})`)
    .classed("y1_text", true)
    .text(y1_axis_name); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  chartGroup.append("text")
  .attr("transform", `translate(${width - 80}, ${height + margin.top + 20})`)
    .classed("y2_text", true)
    .text(y2_axis_name); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    
    var initChartGroup = chartGroup.selectAll("circle");

    // Calling functions to create Tooltip on charts
    createToolTipforFirstChart(chartGroup, censusData, xLinearScale, yLinearScale1, datapoint1, y1_axis_name);
    createToolTipforSecondChart(chartGroup, censusData, xLinearScale, yLinearScale2, initChartGroup, datapoint2, y2_axis_name);



});

}

function createToolTipforFirstChart(chartGroup, censusData, xLinearScale, yLinearScale1, datapoint1, y1_axis_name){
  // append circles
    let circlesGroup = chartGroup.selectAll("circle")
      .data(censusData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.DIABETES_CASES))
      .attr("cy", d => yLinearScale1(d[datapoint1]))
      .attr("r", "5")
      .attr("fill", "gold")
      .attr("stroke-width", "1")
      .attr("stroke", "black");


  // Step 1: Append tooltip div
    let toolTip = d3.select("body")
      .append("div")
      .classed("tooltip", true);

      // Step 2: Create "mouseover" event listener to display tooltip
    circlesGroup.on("mouseover", function(d) {
      toolTip.style("display", "block")
          .html(
            `<strong>${d.DIABETES_CASES} Cases<strong><hr>${d[datapoint1]}
         ${y1_axis_name}`)
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY + "px");
    })
      // Step 3: Create "mouseout" event listener to hide tooltip
      .on("mouseout", function() {
        toolTip.style("display", "none");
      });

}

function createToolTipforSecondChart(chartGroup, censusData, xLinearScale, yLinearScale2, initChartGroup, datapoint2, y2_axis_name){

  // append circles
    let circlesGroup1 = initChartGroup
      .data(censusData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.DIABETES_CASES))
      .attr("cy", d => yLinearScale2(d[datapoint2]))
      .attr("r", "5")
      .attr("fill", "orange")
      .attr("stroke-width", "1")
      .attr("stroke", "black");


    // Step 1: Append tooltip div
    let toolTip = d3.select(".chart")
      .append("div")
      .classed("tooltip", true);

      // Step 2: Create "mouseover" event listener to display tooltip
    circlesGroup1.on("mouseover", function(d) {
      toolTip.style("display", "block")
          .html(
            `<strong>${d.DIABETES_CASES} Cases<strong><hr>${d[datapoint2]}
         ${y2_axis_name}`)
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY + "px");
    })
      // Step 3: Create "mouseout" event listener to hide tooltip
      .on("mouseout", function() {
        toolTip.style("display", "none");
      });

}
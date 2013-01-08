(function(){

function init() {
    var svg = d3.select("#messages").append("svg")
        .attr("width", 960)
        .attr("height", 200)
      .append("g")
        .attr("transform", "translate(0, 0)");
    return svg;
}

d3.csv("data/txt_messages.csv", function(allData) {

  var timeFormat = d3.time.format.utc('%b')
  var messageTypes = d3.keys(allData[0]).filter(function(key) { return key !== "ts" && key !== "sent"; });
  allData.forEach(function(d, i) {
    if (+d.ts > 24) {
      d.date = timeFormat(new Date(d.ts * 1000));
    } else {
      d.hr = +d.ts
    }
    d.messages = messageTypes.map(function(name) { return {name: name, value: +d[name]}; });
  });

  var nestBySent = d3.nest()
    .key(function(d) { return parseInt(d.sent); })
    .map(allData);


var margin = {top: 5, right: 1, bottom: 20, left: 30},
    width = 960 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;
    
var svg = init().append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);


var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();
// var color = d3.scale.ordinal()
//     .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format("s"));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")

  svg.append("g")
      .attr("class", "y axis")
    // .append("text")
    //   .attr("transform", "rotate(-90)")
    //   .attr("y", 6)
    //   .attr("dy", ".71em")
    //   .style("text-anchor", "end")

var legend = svg.selectAll(".legend")
    .data(messageTypes.slice().reverse())
  .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 15 + ")"; });

  legend.append("rect")
      .attr("x", width - 9)
      .attr("width", 9)
      .attr("height", 9)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 15)
      .attr("y", 5)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

  // shunt
  x0.domain(nestBySent[0].map(function(d) { return d.date; }));
  y.domain([0, d3.max(nestBySent, function(d) { return d3.max(d.messages, function(d) { return d.value; }); })]).nice();
  svg.select(".x.axis").call(xAxis);
  svg.select(".y.axis").call(yAxis);

function hrTickFormatter(hr){
  if (hr == 24 || hr == 0 ) {
    return "12a"
  }
  if (hr < 12 ) {
    return hr + "a"
  }
  if (hr === 12) {
    return hr + "p"
  }
  return (hr % 12) + "p"
}

var lastData;
var displayMode = 0;
function update(data) {
  lastData = data;
  data = data.filter(function(d){return displayMode == 0 ? d.hr === undefined : d.hr !== undefined})
  x0.domain(data.map(function(d) { return displayMode == 0 ? d.date : d.hr; }));
  var x1 = d3.scale.ordinal();
  x1.domain(messageTypes).rangeRoundBands([0, x0.rangeBand()], .1);
  y.domain([0, d3.max(data, function(d) { return d3.max(d.messages, function(d) { return d.value; }); })]).nice();

  xAxis.tickFormat( displayMode === 0 ? null : hrTickFormatter)

  var t = svg.transition()
  t.select(".x.axis").call(xAxis);
  t.select(".y.axis").call(yAxis);

  var msgCount = svg.selectAll(".g")
      .data(data)

    msgCount
      .transition()
      .attr("transform", function(d) { return "translate(" + x0(displayMode === 0 ? d.date : d.hr) + ",0)"; });
    msgCount.enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x0(displayMode === 0 ? d.date : d.hr) + ",0)"; });
    msgCount.exit().remove()

  var rect = msgCount.selectAll("rect")
      .data(function(d, i) { return d.messages; })
    rect.transition()
      .attr("width", x1.rangeBand())
      .attr("x", function(d) { return x1(d.name); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
    rect.enter().append("rect")
      .attr("class", "msgcount")
      .attr("width", x1.rangeBand())
      .attr("x", function(d) {return x1(d.name); })
      .style("fill", function(d) { return color(d.name); })
      .attr("height", 0)
      .attr("y", height)
      .transition()
      .attr("y", function(d) {return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
    rect.exit().transition()
      .attr("height", 0)
      .remove()

}
update(nestBySent[1])

d3.select("#messages-types")
  .selectAll("a")
  .data(["Sent", "Received"])
  .enter().append("a")
  .attr("class", function(d, i){return "btn btn-small" + (i == 0 ? ' active' : '')})
  .text(function(d){return d;})
  .on("click", function(d, i) {
      d3.select("#messages-types").selectAll("a").classed("active", function(dd, ii){
        return i == ii;
      })
      update(nestBySent[i == 0 ? 1 : 0])
  });

d3.select("#messages-display-mode")
  .selectAll("a")
  .data(["Month", "Hour"])
  .enter().append("a")
  .attr("class", function(d, i){return "btn btn-small" + (i == 0 ? ' active' : '')})
  .text(function(d){return d;})
  .on("click", function(d, i) {
      d3.select("#messages-display-mode").selectAll("a").classed("active", function(dd, ii){
        return i == ii;
      })
      displayMode = i;
      update(lastData)
  });

})


})();
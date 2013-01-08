(function(){




function init() {
    var svg = d3.select("#coffee").append("svg")
        .attr("width", 960)
        .attr("height", 340)
      .append("g")
        .attr("transform", "translate(0, 0)");
    return svg;
}

function hrTickFormatter(d){
  hr = d.getUTCHours()
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

d3.csv("data/coffee.csv", function(data) {

  data.forEach(function(d, i) {
      d.date = new Date(d.ts * 1000);
      var h = d.date.getUTCHours();
      d.hr = new Date(2012, 1, 0)
      d.hr.setUTCHours(d.date.getUTCHours())
      d.hr.setUTCMinutes(d.date.getUTCMinutes());
      d.amount = +d.amount;
  });

var margin = {top: 55, right: 1, bottom: 20, left: 40},
    width = 960 - margin.left - margin.right,
    height = 340 - margin.top - margin.bottom;

var x = d3.time.scale()
    .range([0, width-2])
    .domain([new Date(2012,0,1), new Date(2012,11,31)])

var y = d3.time.scale()
    .range([height, 0]);

var coffee_colors = [
  "#8DD3C7",
  "#FFFFB3",
  "#BEBADA",
  "#FB8072",
  "#80B1D3",
  "#FDB462",
  "#B3DE69",
  "#FCCDE5",
  "#c0c0c0"
]
coffee_colors = [
  "#E41A1C",
  "#377EB8",
  "#4DAF4A",
  "#984EA3",
  "#FF7F00",
  "#FFFF33",
  "#A65628",
  "#F781BF",
  "#999999"
]

var color = d3.scale.ordinal().range(coffee_colors);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format.utc("%B"));

  var svgBase = init();

var legendContainer = svgBase.append("g").attr("class","legendContainer")

legendContainer.append("text")
  .attr("class", "heading")
  .attr("dy", "1em")
  .text("Coffee")
  
var svg = svgBase.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  y.domain(d3.extent(data, function(d) { return d3.time.hour(d.hr); })).nice();

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)

  svg.selectAll(".x.axis text")
      .style("text-anchor", "middle")
      .attr("x", 36)
      .attr("y", 7)

  var bands = svg.append("g")
    .attr("class", "bands")
    .selectAll(".band")
    .data(y.ticks(9, d3.time.hour))
      .enter();
    bands.append("rect")
      .attr("class", function(d, i){return i % 2 == 0 ? "band band-even" : "band band-odd";})
      .attr("x", 0 - margin.left)
      .attr("width", width + margin.left)
      .attr("y", function(d){return y(d) - (height / 9);})
      .attr("height", height/9);
    bands.append("text")
      .attr("x", -12)
      .attr("y", function(d){return y(d) - ((height / 9) / 2)})
      .attr("dy", ".5em")
      .style("text-anchor", "end")
      .text(hrTickFormatter)


  var dots = svg.append("g").attr("class","dots");
    dots.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.15)
      .attr("cx", function(d) { return x(d3.time.day(d.date)); })
      .attr("cy", function(d) { return y(d.hr); })
      .style("fill", function(d) { return color(d.location); })
      .on("mouseover", function(d) {
        dots.selectAll(".dot").classed("hover", function(dd){return dd.location == d.location})
        updateLegend(d)
      })
      .on("mouseout", function(d) {
        dots.selectAll(".dot").classed("hover", false);
        updateLegend()
      });

  var defaultLegend = {
    text:data.length + ' trips'
  }

  var nestByLocation = d3.nest()
    .key(function(d) { return d.location; })
    .map(data);
  
  var number_format = d3.format("0,.2f");
  function updateLegend(record) {
    var colorData = [], textData = [];
    if (record != undefined) {
      colorData = [color(record.location)] 
      var l = nestByLocation[record.location].length
      var amt = d3.sum(nestByLocation[record.location], function(d){return d.amount});
      var text = record.location + ' - ' + l + ' trip' + (l != 1 ? 's, ' : ', ') + ' $' + number_format(amt)
      textData = [text]
    } else {
      var extra_amt = 358.16; // not counted for in displayed data; no time data
      var amt = d3.sum(data, function(d){return d.amount});
      textData = [data.length + ' trips, $' + number_format(amt + extra_amt) ]
    }

    var e = legendContainer.selectAll("circle.legend")
      .data(colorData, function(d){return d})
    e.enter()
      .append("circle")
        .attr("class", "legend")
        .attr("r", "3.5")
        .attr("cx", 55)
        .attr("cy", 12)
        .style("fill", function(d){return d});
    e.exit().remove();

    e = legendContainer.selectAll("text.legend")
      .data(textData, function(d){return d})
    
    e.enter()
      .append("text")
        .attr("class", "legend")
        .attr("x", colorData.length == 0 ? 55 : 63)
        .attr("y", 12)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .transition()
        .text(function(d) { return d; });
    e.exit().remove();
  }

  updateLegend();


});    
    
})();
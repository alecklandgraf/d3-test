(function(){

function init() {
    var svg = d3.select("#transit").append("svg")
        .attr("width", 960)
        .attr("height", 135)
      .append("g")
        .attr("transform", "translate(0, 0)");
    return svg;
}

d3.csv("data/transit.csv", function(data) {

  // use a min amount (60) as the calculation for sizes so even small slices display
  var total_amount = 0;
  data.forEach(function(d) {
      d.amount = +d.amount;
      d.size_amount = d.amount < 90 ? 90 : d.amount
      d.start = total_amount
      total_amount += d.size_amount;
      d.trips = +d.trips
  });

  var nestByType = d3.entries(d3.nest()
    .key(function(d) { return d.type; })
    .map(data));

  var margin = {top: 25, right: 0, bottom: 25, left: 0},
      width = 960 - margin.left - margin.right,
      height = 110 - margin.top - margin.bottom;


  var sum_amount = d3.sum(data, function(d) { return d.size_amount;});
  var x = d3.scale.linear()
      .rangeRound([0, width])
      .domain([0, sum_amount])


var oh_nine_colors = [
  "#BF0000",
  "#BF5600",
  "#BFAC00",
  "#7CBF00",
  "#26BF00"
]

  var color = d3.scale.ordinal().range(oh_nine_colors);

  var number_format = d3.format("0,.2f");
  var percent = d3.format('0.1%');

  var svg = init()
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  svg.selectAll("text.legend")
    .data(nestByType)
    .enter().append("text")
      .attr("class", "legend")
      .style("text-anchor", "middle")
      .style("fill", function(d){return color(d.key)})
      .attr("y", -margin.top/2)
      .text(function(d){return d.key})
      .attr("x", function(d){
          var start = d3.min(d.value, function(d){return d.start;})
          var size = d3.sum(d.value, function(d){return d.size_amount;})
          var desired_x = x(start) + ((x(size) -3) / 2)
          return desired_x;
      })
      
  
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .style("fill", function(d){return color(d.type);})
      .style("stroke", function(d){return color(d.type);})
      .attr("x", function(d) { return x(d.start); })
      .attr("width", function(d) { return x(d.size_amount) - 3; })
      .attr("y", 0)
      .attr("height", height)
      .on("mouseover", function(d){
          d3.select(this).attr("class", "bar hover")
          var t= d.sub_type + ' – $' + number_format(d.amount) + ' · ' + percent(d.amount / sum_amount)
          var desired_x = x(d.start) + ((x(d.size_amount) -3) / 2)
          
          var node = svg.selectAll("text.title")
            .text(t)
          
          var max_x = width - (node.node().getBBox().width / 2)
          node.transition()
            .attr("x", d3.min([desired_x, max_x]))
            
      })
      .on("mouseout", function(){
          d3.select(this).attr("class", "bar")
          svg.selectAll("text.title").text("")
      });

  svg.selectAll("text.title")
    .data([{}])
    .enter().append("text")
      .attr("class", "title")
      .attr("x", width/2)
      .attr("y", height + (margin.bottom/2))
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text("")

});

})();
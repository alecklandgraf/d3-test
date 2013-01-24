//beChart.circle-histogram.js

//=============================================================================
// BE header: get access to Models and register chart
//-----------------------------------------------------------------------------
var BEModels = BEModels || {};
BEModels.main = BEModels.main || {};
BEModels.circle_histogram = BEModels.circle_histogram || {};


// register circle-histogram as plot type
BEModels.plot_types = BEModels.plot_types || [];
if (BEModels.plot_types.indexOf('circle_histogram') < 0) {
  BEModels.plot_types.push('circle_histogram');
}

BEModels.circle_histogram.setType = function (old_type) {
  // awesome transition here
  


  if (old_type === 'scatter') {
    var circle = BEModels.svg.selectAll("circle")
      .data(BEModels.data, String);
    // update current circles
    circle
      .transition()
      .duration(BEModels.scatter.options.timing)
      .delay(function (d,i) { return i / BEModels.scatter.data_length * BEModels.scatter.options.timing; })
      .attr("cx", function(d) {
            return BEModels.scatter.xScale(d[1]);
       })
      .attr("cy", function(d) {
            return BEModels.scatter.yScale(5);
       })
      .attr("r", BEModels.scatter.options.circleRadius);
  

    // circle = BEModels.svg.selectAll("circle")
    //   .data(BEModels.circle_histogram.data);
    // circle.exit()
    // .transition()
    //   .duration(1000)
    //   .delay(1000)
    // .remove();
    
    BEModels.circle_histogram.data = d3.layout.histogram()
      .value(function (d) { return d[1]; })
      .bins(BEModels.circle_histogram.xScale.ticks(15))
      (BEModels.data);

    var bar = BEModels.svg.selectAll(".bar")
        .data(BEModels.circle_histogram.data)
      .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) { return "translate(" + BEModels.circle_histogram.xScale(d.x) + "," + (BEModels.height - BEModels.padding) + ")"; });

    var circle_radius_scale = d3.scale.sqrt()
      .domain([0, d3.max(BEModels.circle_histogram.data, function (d) { return d.y; })])
      .range([0, 17]);

    bar.append("circle")
      .transition()
      .duration(500)
      .delay(500)
        .attr("cx", 1)
        .attr("cy", 1)
        .attr("r", function(d) { return circle_radius_scale(d.y); });


    
  }

};
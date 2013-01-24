//beChart.circle-histogram.js

//=============================================================================
// BE header: get access to Models and register chart
//-----------------------------------------------------------------------------
var BEModels = BEModels || {};
BEModels.main = BEModels.main || {};
BEModels.circle_histogram = BEModels.circle_histogram || {};


// register circle-histogram as plot type
BEModels.plot_types = BEModels.plot_type || [];
if (BEModels.plot_types.indexOf('circle_histogram') < 0) {
  BEModels.plot_types.push('circle_histogram');
}

BEModels.circle_histogram.setType = function (old_type) {
  // awesome transition here
  


  if (old_type === 'scatter') {
    var circle = BEModels.svg.selectAll("circle")
      .data(data, String);
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
  }


  BEModels.circle_histogram.data = d3.layout.histogram()
    .value(function (d) { return d[1]; })
    .bins(BEModels.circle_histogram.xScale.ticks(15))
    (BEModels.data);
};
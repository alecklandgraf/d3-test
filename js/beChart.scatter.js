//beChart.scatter.js
// todo get options into BEModels as BEModels.options and use instead of _options

var BEModels = BEModels || {};
BEModels.main = BEModels.main || {};
BEModels.scatter = BEModels.scatter || {};

// register scatter as plot type
BEModels.plot_types = BEModels.plot_types || [];
if (BEModels.plot_types.indexOf('scatter') < 0) {
  BEModels.plot_types.push('scatter');
}

BEModels.scatter.setData = function (data, svg) {
  // bind circle to data
  var circle = svg.selectAll("circle")
     .data(data, String);

  // enter new circles
  circle.enter().append("circle")
     .style('opacity', 0.8)
     .attr("cx", function(d) {
          return BEModels.scatter.xScale(d[0]);
     })
     .attr("cy", function(d) {
          return BEModels.scatter.yScale(d[1]);
     })
     .transition()
     .duration(BEModels.scatter.options.timing)
     .delay(function (d,i) { return i / BEModels.scatter.data_length * BEModels.scatter.options.timing; })
     .attr("r", function(d) {
          return BEModels.scatter.options.circleRadius;
          // return rScale(d[1]);
     });

  // update current circles
  circle
    .attr("cx", function(d) {
          return BEModels.scatter.xScale(d[0]);
     })
    .attr("cy", function(d) {
          return BEModels.scatter.yScale(d[1]);
     })
    .transition()
    .duration(BEModels.scatter.options.timing)
    .delay(function (d,i) { return i / BEModels.scatter.data_length * BEModels.scatter.options.timing; })
    .attr("r", BEModels.scatter.options.circleRadius);

    // exit remove data
    circle.exit().remove();
};

BEModels.scatter.setType = function (old_type) {
  // awesome transition here
  if(old_type === 'circle_histogram') {
    var circle = BEModels.svg.selectAll("circle")
      .data(BEModels.data, String);
    // update current circles
    circle
      .transition()
      .duration(BEModels.scatter.options.timing)
      .delay(function (d,i) { return i / BEModels.scatter.data_length * BEModels.scatter.options.timing; })
      .attr("cx", function(d) {
            return BEModels.scatter.xScale(d[0]);
       })
      .attr("cy", function(d) {
            return BEModels.scatter.yScale(d[1]);
       })
      
      .attr("r", BEModels.scatter.options.circleRadius);
  }
};
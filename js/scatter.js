/**
 * scatter xCharts extension 
 * requires: jQuery 1.8+, xCharts
 * see: http://github.com/tenxer/xCharts for details
 * usage: 
        var data = {
          "xScale": "linear",
          "yScale": "linear",
          "main": [
            {
              "className": ".pizza",
              "data": [
                {
                  "x": 4.5,
                  "y": 1
                },
                {
                  "x": 4.0,
                  "y": 2
                },
                {
                  "x": 4.65,
                  "y": 7,
                  "fill_color": "orange"
                },
                {
                  "x": 4.9,
                  "y": 10,
                  "fill_color": "black"
                },
                {
                  "x": 5.0,
                  "y": 5
                },
                {
                  "x": 4.8,
                  "y": 20
                }
              ]
            }
          ]
        };
        var myChart = new xChart('scatter-2D', data, '#example');

 */
$(function() {
  var line = xChart.getVis('line-dotted');

  var scatter1DVis = {
    enter: function (self, storage, className, data, callbacks) {
      line.enter.apply(this, arguments);
      // Do your custom actions here
      circles = storage.lineContainers.selectAll('circle')
      .data(function (d) {
        return d.data;
      }, function (d) {
        return d.x;
      });

    circles.enter().append('circle')
      .style('opacity', 0)
      .attr('cx', storage.lineX)
      .attr('cy', storage.lineY)
      .attr('r', 10);
      // .on('mouseover', callbacks.mouseover)
      // .on('mouseout', callbacks.mouseout)
      // .on('click', callbacks.click);

      storage.lineCircles = circles;
      

    },
    update: function (self, storage, timing) {
      line.update.apply(this, arguments);
      // Do your custom actions here
      storage.lineFills.transition().duration(timing)
        .style('opacity', 0)
        .attr('d', storage.lineA.y0(storage.lineY));

      storage.linePaths.transition().duration(timing)
        .style('opacity', 0)
        .attr('d', storage.line.y(storage.lineY));

      storage.lineCircles.transition().duration(timing)
        .style('opacity', 1)
        .style('fill', function (d) { 
          if (d.fill_color !== undefined) {
            return d.fill_color;
          }
        })
        .attr('cx', storage.lineX)
        .attr('cy', function (d) { return self.yScale(0); })
        // .attr('cy', storage.lineY)
        .attr('r', 10);


    },
    exit: function (self, storage, timing) {
      line.exit.apply(this, arguments);
      // Do your custom actions here
    },
    destroy: function (self, storage, timing) {
      line.destroy.apply(this, arguments);
      // Do your custom actions here
    }
  };
  xChart.setVis('scatter-1D', scatter1DVis);

  var line2 = xChart.getVis('line-dotted');
  var scatter2DVis = {
    enter: function (self, storage, className, data, callbacks) {
      line2.enter.apply(this, arguments);
      // Do your custom actions here
      circles = storage.lineContainers.selectAll('circle')
      .data(function (d) {
        return d.data;
      }, function (d) {
        return d.x;
      });

    circles.enter().append('circle')
      .style('opacity', 0)
      .attr('cx', storage.lineX)
      .attr('cy', storage.lineY)
      .attr('r', 10);
      // .on('mouseover', callbacks.mouseover)
      // .on('mouseout', callbacks.mouseout)
      // .on('click', callbacks.click);

      storage.lineCircles = circles;
      

    },
    update: function (self, storage, timing) {
      line2.update.apply(this, arguments);
      // Do your custom actions here
      storage.lineFills.transition().duration(timing)
        .style('opacity', 0)
        .attr('d', storage.lineA.y0(storage.lineY));

      storage.linePaths.transition().duration(timing)
        .style('opacity', 0)
        .attr('d', storage.line.y(storage.lineY));

      storage.lineCircles.transition().duration(timing)
        .style('opacity', 1)
        .style('fill', function (d) { 
          if (d.fill_color !== undefined) {
            return d.fill_color;
          }
        })
        .attr('cx', storage.lineX)
        // .attr('cy', function (d) { return self.yScale(0); })
        .attr('cy', storage.lineY)
        .attr('r', 5);


    },
    exit: function (self, storage, timing) {
      line2.exit.apply(this, arguments);
      // Do your custom actions here
    },
    destroy: function (self, storage, timing) {
      line2.destroy.apply(this, arguments);
      // Do your custom actions here
    }
  };
  xChart.setVis('scatter-2D', scatter2DVis);
}());
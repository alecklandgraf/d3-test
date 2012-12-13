/**
 * scatter xCharts extension 
 * requires: jQuery 1.8+, xCharts
 * see: http://github.com/tenxer/xCharts for details
 * usage: var myChart = new xChart('scatter-1D', data, '#example');
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
          if (d.your_building) {
            return d.your_building;
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


  var scatter2DVis = {
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
          if (d.your_building) {
            return d.your_building;
          }
        })
        .attr('cx', storage.lineX)
        // .attr('cy', function (d) { return self.yScale(0); })
        .attr('cy', storage.lineY)
        .attr('r', 5);


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
  xChart.setVis('scatter-2D', scatter2DVis);
}());
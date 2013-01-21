/*
BE Chart
copyright 2013 Building Energy
*/
(function () {
// skip to beChart for the good parts

var _version = "0.1.0";

function svgEnabled() {
  var d = document;
  return (!!d.createElementNS &&
    !!d.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect);
}

var _selector;

var defaults = {
  // User interaction callbacks
  mouseover: function (data, i) {},
  mouseout: function (data, i) {},
  click: function (data, i) {},

  // Padding between the axes and the contents of the chart
  axisPaddingTop: 0,
  axisPaddingRight: 0,
  axisPaddingBottom: 5,
  axisPaddingLeft: 20,

  // Padding around the edge of the chart (space for axis labels, etc)
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 20,
  paddingLeft: 60,

  // Axis tick formatting
  tickHintX: 10,
  tickFormatX: function (x) { return x; },
  tickHintY: 10,
  tickFormatY: function (y) { return y; },

  // Pre-format input data
  dataFormatX: function (x) { return x; },
  dataFormatY: function (y) { return y; },

  unsupported: function (selector) {
    d3.select(selector).text('SVG is not supported on your browser');
  },

  // Callback functions if no data
  empty: function (self, selector, d) {},
  notempty: function (self, selector) {},

  timing: 750,

  // Line interpolation
  interpolation: 'monotone'
};

// var _scales = {
//   linear: linear,
//   ordinal: ordinal,
//   log: log,
//   time: time
// };

var beChart = function (type, data, selector, options) {
  var self = this,
    resizeLock;

  self._options = options || {};

  if (svgEnabled() === false) {
    return options.unsupported(selector);
  }

  _selector = selector;
  self._container = d3.select(selector);
  // self._drawSvg();

  // data = _.clone(data);
  // if (type && !data.type) {
  //   data.type = type;
  // }

  beChart.setData(data);

  d3.select(window).on('resize.for.' + selector, function () {
    if (resizeLock) {
      clearTimeout(resizeLock);
    }
    resizeLock = setTimeout(function () {
      resizeLock = null;
      self._resize();
    }, 500);
  });
};






beChart.version = _version;

beChart.setData = function (data) {
            var w = 500;
            var h = 300;
            var padding = 30;
            var dataset = data;

            //Create scale functions
            var xScale = d3.scale.linear()
                                 .domain([0, d3.max(dataset, function(d) { return d[0]; })])
                                 .range([padding, w - padding * 2]);

            var yScale = d3.scale.linear()
                                 .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                                 .range([h - padding, padding]);

            var rScale = d3.scale.linear()
                                 .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                                 .range([2, 5]);

            //Define X axis
            var xAxis = d3.svg.axis()
                              .scale(xScale)
                              .orient("bottom")
                              .ticks(5);

            //Define Y axis
            var yAxis = d3.svg.axis()
                              .scale(yScale)
                              .orient("left")
                              .ticks(5);

            //Create SVG element
            var svg = d3.select(_selector)
                        .append("svg")
                        .attr("width", w)
                        .attr("height", h);

            //Create circles
            svg.selectAll("circle")
               .data(dataset)
               .enter()
               .append("circle")
               .attr("cx", function(d) {
                    return xScale(d[0]);
               })
               .attr("cy", function(d) {
                    return yScale(d[1]);
               })
               .transition()
               .duration(750)
               .delay(function (d,i) { return i / 11 * 750; })
               .attr("r", function(d) {
                    return 8;
                    // return rScale(d[1]);
               });

            /*
            //Create labels
            svg.selectAll("text")
               .data(dataset)
               .enter()
               .append("text")
               .text(function(d) {
                    return d[0] + "," + d[1];
               })
               .attr("x", function(d) {
                    return xScale(d[0]);
               })
               .attr("y", function(d) {
                    return yScale(d[1]);
               })
               .attr("font-family", "sans-serif")
               .attr("font-size", "11px")
               .attr("fill", "red");
            */
            
            //Create X axis
            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + (h - padding) + ")")
                .call(xAxis);
            
            //Create Y axis
            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(" + padding + ",0)")
                .call(yAxis);
  };


if (typeof define === 'function' && define.amd && typeof define.amd === 'object') {
  define(function () {
    return beChart;
  });
  return;
}

window.beChart = beChart;

}()); // the end
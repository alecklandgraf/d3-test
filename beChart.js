/*
BE Chart
copyright 2013 Building Energy
*/
(function () {
// skip to beChart for the good parts

//=============================================================================
// private functions
//-----------------------------------------------------------------------------
function svgEnabled() {
  var d = document;
  return (!!d.createElementNS &&
    !!d.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect);
}

function override_defaults(options) {
  // this should be add to options
  for (var o in defaults) {
    _options[o] = options[o] === undefined ? defaults[o] : options[o];
  }
}



//=============================================================================
// private global vars (private to BE Chart, global to functions whithin)
//-----------------------------------------------------------------------------
var chart = {},  // object to tie funcs onto
    _xAxis,
    _yAxis,
    _xScale,
    _yScale,
    _svg;

var _version = "0.1.0",
    _authors = ["Aleck Landgraf"],
    _selector,
    _data_length,
    _options = {},
    _data;

var defaults = {
  // User interaction callbacks
  mouseover: function (data, i) {},
  mouseout: function (data, i) {},
  click: function (data, i) {},
  drag: function (data, i) {},

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

  // circle properties
  circleRadius: 3,

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


//=============================================================================
// public chart
//-----------------------------------------------------------------------------
var beChart = function (type, data, selector, options) {
  var self = this,
    resizeLock;

  self._options = options || {};
  override_defaults(self._options);
  // need to override defaults with options

  if (svgEnabled() === false) {
    return options.unsupported(selector);
  }

  // set globals
  _selector = selector;
  _data_length = data.length;
  _data = data;


  // set public objects and functions
  self.version = _version;
  self._container = d3.select(selector);
  self._data = _data; // convience for those who need it
  self.setData = chart.setData;
  self.updateTransitionSpeed = chart.updateTransitionSpeed;
  self.updateRadius = chart.updateRadius;

  // intial plot
  chart._drawSVG(data);
  self.setData(data);


  d3.select(window).on('resize.for.' + selector, function () {
    if (resizeLock) {
      clearTimeout(resizeLock);
    }
    resizeLock = setTimeout(function () {
      resizeLock = null;
      self._resize();
    }, 500);
  });
};  // end beChart


//=============================================================================
// public chart functions
//-----------------------------------------------------------------------------
chart.updateTransitionSpeed = function (timing) {
  _options.timing = timing;
};

chart.setData = function (data) {

  _data = data;

  // bind circle to data
  var circle = _svg.selectAll("circle")
     .data(data, String);

  // enter new circles
  circle.enter().append("circle")
     .style('opacity', 0.8)
     .attr("cx", function(d) {
          return _xScale(d[0]);
     })
     .attr("cy", function(d) {
          return _yScale(d[1]);
     })
     .transition()
     .duration(_options.timing)
     .delay(function (d,i) { return i / _data_length * _options.timing; })
     .attr("r", function(d) {
          return _options.circleRadius;
          // return rScale(d[1]);
     });

  // update current circles
  circle
    .attr("cx", function(d) {
          return _xScale(d[0]);
     })
    .attr("cy", function(d) {
          return _yScale(d[1]);
     })
    .transition()
    .duration(_options.timing)
    .delay(function (d,i) { return i / _data_length * _options.timing; })
    .attr("r", _options.circleRadius);

    // exit remove data
    circle.exit().remove();
}; // end setData

chart.updateRadius = function (r) {
  _options.circleRadius = r;

  var circle = _svg.selectAll("circle")
     .data(_data, String);
  circle
    .attr("cx", function(d) {
          return _xScale(d[0]);
     })
    .attr("cy", function(d) {
          return _yScale(d[1]);
     })
    .transition()
    .duration(_options.timing)
    .delay(function (d,i) { return i / _data_length * _options.timing; })
    .attr("r", _options.circleRadius);
};


//=============================================================================
// private chart functions
//-----------------------------------------------------------------------------
chart._drawSVG = function () {
  var w = 800;
  var h = 800;
  var padding = 30;

  //Create scale functions
  _xScale = d3.scale.linear()
                       .domain([0, d3.max(_data, function(d) { return d[0]; })])
                       .range([padding, w - padding * 2]);

  _yScale = d3.scale.linear()
                       .domain([0, d3.max(_data, function(d) { return d[1]; })])
                       .range([h - padding, padding]);

  _rScale = d3.scale.linear()
                       .domain([0, d3.max(_data, function(d) { return d[1]; })])
                       .range([2, 5]);

  //Define X axis
  _xAxis = d3.svg.axis()
                    .scale(_xScale)
                    .orient("bottom")
                    .ticks(5);

  //Define Y axis
  _yAxis = d3.svg.axis()
                    .scale(_yScale)
                    .orient("left")
                    .ticks(5);

  //Create SVG element
  _svg = d3.select(_selector)
              .append("svg")
              .attr("width", w)
              .attr("height", h);

    //Create X axis
  _svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + (h - padding) + ")")
      .call(_xAxis);

  //Create Y axis
  _svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + padding + ",0)")
      .call(_yAxis);
};

if (typeof define === 'function' && define.amd && typeof define.amd === 'object') {
  define(function () {
    return beChart;
  });
  return;
}

window.beChart = beChart;

}()); // the end
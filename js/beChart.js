/*
BE Chart
copyright 2013 Building Energy

usage : myChart = new beChart(plot_type, data, selector, options);
  @param plot_type: string ['scatter', 'circle_histogram']
  @param data: object or array
  @param selector: d3 selector (css/jQuery)
  @param options: object (overrides defaults object)

future layout: all plots in their own js file, with common methods. Might make a plot prototype
               to inherit from and overload. drawAxes, drawBackground, drawAxisLabels, drawLegend,
               setData, appendData, resize, transition

*/
var BEModels = BEModels || {};
BEModels.main = BEModels.main  || {};
BEModels.plot_types = BEModels.plot_types || [];

(function () {
// skip to beChart for the good parts

//=============================================================================
// private functions
//-----------------------------------------------------------------------------
registerKeyboardHandler = function(callback) {
  d3.select(window).on("keydown", callback);
};

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

function endall(transition, callback) {
    var n = 0;
    transition
        .each(function() { ++n; })
        .each("end", function() { if (!--n) callback.apply(this, arguments); });
}

//=============================================================================
// private global vars (private to BE Chart, global to functions whithin)
//-----------------------------------------------------------------------------
var chart = {},  // object to tie funcs onto
    _type,
    _xAxis,
    _yAxis,
    _xScale,
    _yScale,
    _svg;

var _version = "0.1.0",
    _authors = ["Aleck Landgraf"],
    _selector,
    _container,
    _data_length,
    _options = {},
    _datasets = {},
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
  xMax: undefined,
  yMax: undefined,


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


// future scale options
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
  _container = d3.select(selector);
  _data_length = data.length;
  _data = data;
  _type = type;


  // set public objects and functions
  self.version = _version;
  self._type = _type;
  self._container = _container;
  self._data = _data; // convience for those who need it
  self.setData = chart.setData;
  self.updateTransitionSpeed = chart.updateTransitionSpeed;
  self.updateRadius = chart.updateRadius;
  self.appendData = chart.appendData;
  self.appendDatasets = chart.appendDatasets;
  self.setType = chart.setType;

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
  // todo: add way to call custom user set type like xCharts
  _data = BEModels.data = data;
  BEModels[_type].setData(_data, _svg);
  
};

chart.setType = function (type) {
  // todo: add way to call custom user set type like xCharts
  if (BEModels.plot_types.indexOf(type) < 0) {
    throw 'Plot type "' + type + '" does not exist.';
  }
  else {
    var old_type = _type;
    _type = type;
    BEModels[type].setType(old_type);
  }
  
};

chart.appendData = function (data, data_class) {
  // data_class = data_class === undefined ? 'main' : data_class;
  _data = _data.concat(data);
  var circle = _svg.selectAll("circle")
    .data(_data, String);

  circle.enter().append("circle")
      // .attr("class", data_class)  // need to tie this to the data since it'll not remember its class
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

// for debug
nn=0;
// end debug

// this should be refactored into a private function and the binning of data into
// a couple datasets should become a feature that is called if a large data option
// is set. If set, a threshold of the data length would determine if the data
// requires this function.
chart.appendDatasets = function (data_array) {
  if(data_array.length > 0) {
    nn += 1;
    var current_data_set = data_array.pop();
    var circle = _svg.selectAll("circle")
    .data(current_data_set, String);


    circle.enter().append("circle")
        .attr("cx", function(d) {
            return _xScale(d[0]);
        })
        .attr("cy", function(d) {
            return _yScale(d[1]);
        })
        .transition().call(endall, function() {
          d3.select(".appended_points").html(nn * 1000);
          chart.appendDatasets(data_array);
        })
        .duration(_options.timing)
        .delay(function (d,i) { return i / _data_length * _options.timing; })
        .attr("r", _options.circleRadius);
    }
};

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
  // need to grab these from element
  var w = parseInt(_container.style('width').replace('px', ''), 10),
      h = parseInt(_container.style('height').replace('px', ''), 10),
      padding = 30;
  var xMax = _options.xMax === undefined ? d3.max(_data, function(d) { return d[0]; }) : _options.xMax;
  var yMax = _options.yMax === undefined ? d3.max(_data, function(d) { return d[1]; }) : _options.yMax;
  BEModels.width = w;
  BEModels.height = h;

  //Create scale functions
  _xScale = d3.scale.linear()
                       // .domain([0, d3.max(_data, function(d) { return d[0]; })])
                       .domain([0, xMax])
                       .range([padding, w - padding * 2]);

  _yScale = d3.scale.linear()
                       .domain([0, yMax])
                       // .domain([0, d3.max(_data, function(d) { return d[1]; })])
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
      .attr("height", h)
      .attr("pointer-events", "all")
    .append('svg:g')
      // .call(d3.behavior.zoom().x(_xScale).y(_yScale).on("zoom", chart.redraw))
    .append('svg:g');
  BEModels.svg = _svg;

  //Draw background and give area for mouse to zoom in and pan on
  _svg.append("svg:rect")
      .attr("width", w)
      .attr("height", h)
      .attr("fill", "white");

  _svg.append("rect")
      .attr("width", w - padding * 3)
      .attr("height", h / 3)
      .attr("transform", "translate(" + padding + "," + (h - padding - h / 3) + ")")
      .style("opacity", 0.1)
      .attr("fill", "green");
  _svg.append("rect")
      .attr("width", w - padding * 3)
      .attr("height", h / 3)
      .attr("transform", "translate(" + padding + "," + (h - padding - (h / 3)*2) + ")")
      .style("opacity", 0.1)
      .attr("fill", "yellow");
  _svg.append("rect")
      .attr("width", w - padding * 3)
      .attr("height", h / 3)
      .attr("transform", "translate(" + padding + "," + (h - padding - (h / 3)*3) + ")")
      .style("opacity", 0.1)
      .attr("fill", "red");



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

  // total hack for proof of concept of scatter lib
  BEModels.scatter.xScale = _xScale;
  BEModels.scatter.yScale = _yScale;
  BEModels.scatter.data_length = _data_length;
  BEModels.scatter.options = _options;
  BEModels.circle_histogram.xScale = _xScale;
  BEModels.circle_histogram.yScale = _yScale;
  BEModels.circle_histogram.data_length = _data_length;
  BEModels.circle_histogram.options = _options;
  BEModels.padding = padding;
};

chart.redraw = function () {
  _svg.attr("transform",
        "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
};

//=============================================================================
// return beChart to the caller
//-----------------------------------------------------------------------------
if (typeof define === 'function' && define.amd && typeof define.amd === 'object') {
  define(function () {
    return beChart;
  });
  return;
}

window.beChart = beChart;

}()); // the end
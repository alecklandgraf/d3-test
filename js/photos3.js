
var select_photo;
var select_photo_px;

(function(){


function init() {
    var svg = d3.select("#photos").append("svg")
        .attr("width", 960)
        .attr("height", 245)
      .append("g")
        .attr("transform", "translate(0, 0)");
    return svg;
}

d3.csv("data/photos.csv", function(data) {

var margin = {top: 20, right: 0, bottom: 0, left: 0},
    width = 960 - margin.left - margin.right,
    height = 245 - margin.top - margin.bottom;

  data.forEach(function(d, i) {
      d.date = new Date(d.ts * 1000);
  });
  
  var svgBase = init();
  var svg = svgBase.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var timeX = d3.time.scale()
    .range([1, width-2])
    .domain([new Date(2012,0,1), new Date(2012, 11, 31)]);

var xAxis = d3.svg.axis()
    .scale(timeX)
    .orient("top")
    .tickFormat(d3.time.format.utc("%B"))

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0,-1)")
      .call(xAxis)
  // move the month labels to between the ticks
  svg.selectAll(".x.axis text")
      .style("text-anchor", "middle")
      .attr("x", 41)

  var x = d3.scale.linear()
      .range([0, width])
      .domain([0,data.length - (width/data.length)]);

var imageWidth = 300;
var totalImageWidth = imageWidth * data.length;

var offsetLookup = d3.scale.linear()
    .range([0,imageWidth])
    .domain([0, width]);

var touchPosLookup = d3.scale.linear()
    .range([0, width])
    .domain([0, data.length]);

var touchPosResLookup = d3.scale.linear()
    .range([0, data.length])
    .domain([0, width]);

var absPosLookup = d3.scale.linear()
    .range([0, totalImageWidth - imageWidth])
    .domain([0, data.length]);

var imgOffset = d3.scale.linear()
    .range([0, imageWidth])
    .domain([0, x(1)])

var imgPos = d3.scale.linear()
    .range([0,totalImageWidth - imageWidth])
    .domain([0,data.length]);

    function mouseMoveImage(d, i) {
        var pos = d3.mouse(this);
        moveImage(i, pos[0]);
        scrobbler(d.date)
    }
    function moveImage(i, xpx) {
      // offset for image
      var deltapx = imgOffset(xpx - x(i))
      var offset = absPosLookup(i) + deltapx
      // console.log("moveImage", i, xpx, "offset", d3.format('0.1f')(offset), "imgoffset", absPosLookup(i), "deltapx", deltapx);
      imgPos.range([-offset, totalImageWidth - imageWidth - offset])

      // linear + 400ms is also a good ratio
        images.data(data)
            .attr("xlink:href", imageSrc)
            .transition().duration(600)
            .ease(Math.sqrt)
            // .ease("linear")
            .attr("x", function(d, i){return imgPos(i);})
    }

    select_photo = function(i) {
      var xpx = touchPosLookup(i)
      moveImage(i, xpx)
    }
    select_photo_px = function(xpx) {
      var i = touchPosResLookup(xpx)
      moveImage(Math.floor(i), xpx)
    }

    function imageSrc(d, i){
        if (supportsWebP === 1) {
            return cdn_prefix + d.src + '.webp';
        }
        return cdn_prefix + d.src + '.png';
        // var p = imgPos(i);
        // if (p > -900 && p < width + 900) {
        //     return d.src
        // }
        // var pixel = "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
        // if this.getAttribute("href") == nil
        // if (src === null || src.indexOf("data:") == 0) {
        //     return pixel
        // }
        // return src
    }

    var images = svg.selectAll("image")
    .data(data)
    .enter().append("image")
        .attr("width", 300)
        .attr("height", 225)
        .attr("class", "photo")
        .attr("x", function(d, i){return imgPos(i);})
        .attr("xlink:href", imageSrc)
    
    // add the touch layer
    var touchRect = svg.selectAll(".touch")
      .data(data)
      .enter().append("rect")
      .attr("class", "touch")
      .attr("x", function(d, i){return x(i);})
      .attr("width", width/data.length)
      .attr("height", height)
      .on("mousemove", mouseMoveImage)

    
    function scrobbler(dt) {
      var scrobble = svg.selectAll("line.scrobble")
        .data([dt])
      
      scrobble
        // this has to match the image transition
        .transition().duration(600)
        .ease(Math.sqrt)
        .attr("x1", function(d){return timeX(d)})
        .attr("x2", function(d){return timeX(d)})
      
      scrobble.enter()
        .append("line")
        .attr("class", "scrobble")
        .attr("y1", 0)
        .attr("y2", -9)
        .attr("x1", function(d){return timeX(d)})
        .attr("x2", function(d){return timeX(d)})
      scrobble.exit().remove()
    }
    scrobbler(data[0].date)


});
  

})();
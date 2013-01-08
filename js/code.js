(function(){

function init() {
    var svg = d3.select("#code").append("svg")
        .attr("width", 960)
        .attr("height", 235)
      .append("g")
        .attr("transform", "translate(0, 0)");
    return svg;
}

d3.csv("data/code.csv", function(allData) {
  var margin = {top: 10, right: 200, bottom: 0, left: 65},
    width = 960 - margin.left - margin.right,
    height = 235 - margin.top - margin.bottom;
  
  var squareSize = 25;
  var squarePadding = 4;
  var y = d3.scale.linear()
      .range([1, (7 * (squareSize + squarePadding)) + 1])
      .domain([0, 7])

  var x = d3.scale.linear()
      .range([1, (24*(squareSize + squarePadding)) + 1])
      .domain([0, 24]);

  allData.forEach(function(d){
    d.dayofweek = +d.dayofweek;
    d.hour = +d.hour
    d.count = +d.count
  });

  var allCommits = allData.filter(function(d){return d.type === 'commits'})
  var allMerges = allData.filter(function(d){return d.type === 'merges'})
  
  var topCommits = d3.entries(d3.nest()
    .key(function(d){return d.repo})
    .map(allCommits))
  var topMerges = d3.entries(d3.nest()
    .key(function(d){return d.repo})
    .map(allMerges))
  
  topCommits.forEach(function(d){
      d.repo = d.key;
      d.count = d3.sum(d.value, function(d) {return d.count})
  })
  topMerges.forEach(function(d){
      d.repo = d.key;
      d.count = d3.sum(d.value, function(d) {return d.count})
  })
  
  // group each section by hour/dayofweek
  var commits = d3.entries(d3.nest()
    .key(function(d){ return d.hour + '.' + d.dayofweek})
    .map(allCommits))
  var merges = d3.entries(d3.nest()
    .key(function(d){ return d.hour + '.' + d.dayofweek})
    .map(allMerges))
  commits.forEach(function(d){
    d.hour = d.value[0].hour
    d.dayofweek = d.value[0].dayofweek
    d.count = d3.sum(d.value, function(d) {return d.count})
  })
  merges.forEach(function(d){
    d.hour = d.value[0].hour
    d.dayofweek = d.value[0].dayofweek
    d.count = d3.sum(d.value, function(d) {return d.count})
  })
  topCommits = topCommits.filter(function(d){return d.count > 0})
  topMerges = topMerges.filter(function(d){return d.count > 0})
  
  var empty_color = "#fff"
  var colors = ["rgb(255,255,229)", "rgb(247,252,185)","rgb(217,240,163)","rgb(173,221,142)","rgb(120,198,121)","rgb(65,171,93)","rgb(35,132,67)","rgb(0,104,55)","rgb(0,69,41)"];

  var color = d3.scale.quantize()
    .range(colors)
  
  var svg = init()
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  var legendContainer = svg.append("g")
      .attr("transform", "translate(" + (width + 5) + ",0)");
  
  var skipGithub = [
    'bitly', 'bitly_ops', 'bitly_ios_app', 'stats_bigboard', 'jehiah-one-one', 'jehiah-one-two', 'amharic_pocket_guide', 'thenexttrain_ios', 'thenexttrain',
    'thenexttrain_iphone', 'itypeamharic_keylayout', 'temp_leveldb_manifest', 'PushChatStarter'
  ]
  function legend(data) {
    // data = [{repo:commits}, {repo: commits}]
    data.sort(function(a, b){if (a.count < b.count) {return 1;} return -1})
    data = data.slice(0,12);
    var rowHeight = 18;
    var s = legendContainer.selectAll(".toprow")
      .data(data);

    s.transition()
      .attr("transform", function(d, i){return "translate(0, "+ (rowHeight * i)+ ")"})

    s.enter()
      .append("g")
      .attr("class", "toprow")
      .attr("transform", function(d, i){return "translate(0, "+ (rowHeight * i)+ ")"})
    s.exit()
      .remove()
    
    var counts = s.selectAll(".count")
      .data(function(d){return [d];})
    counts
        .text(function(d){return d.count})

    counts.enter()
      .append("text")
      .attr("class", "count")
      .attr("x", 25)
      .attr("y", 0)
      .attr("dy", "1em")
      .attr("text-anchor", "end")
      .text(function(d){return d.count})
    counts.exit()
      .remove()

    var titles = s.selectAll(".repolink")
      .data(function(d){return [d];})
    
    titles
      .attr("xlink:href", function(d) { if (skipGithub.indexOf(d.repo) == -1){ return "https://github.com/jehiah/" + d.repo}})
      .attr("class", function(d) { if (skipGithub.indexOf(d.repo) == -1){ return "repolink active"} return "repolink"})
      .select("text")
      .text(function(d){return d.repo})

    titles.enter()
      .append("a")
        .attr("class", function(d) { if (skipGithub.indexOf(d.repo) == -1){ return "repolink active"} return "repolink"})
        .attr("xlink:href", function(d) { if (skipGithub.indexOf(d.repo) == -1){ return "https://github.com/jehiah/" + d.repo}})
      .append("text")
        .attr("x", 30)
        .attr("y", 0)
        .attr("dy", "1em")
        .attr("text-anchor", "start")
        .text(function(d){return d.repo})
    titles.exit()
      .remove()
  }
    
  var rects = svg.append("g")
  
  var mode
  function update(m) {
    mode = m;
   var data = mode === 0 ? commits : merges;
   legend(mode === 0 ? topCommits : topMerges);
   
   color.domain([1, d3.max(data, function(d){return d.count})]);

  var r = rects.selectAll("rect.code")
    .data(data)
    
    // update
    r.transition()
      .style("fill", function(d, i){return d.count === 0 ? empty_color : color(d.count)});

    r.enter().append("rect")
      .attr("class", "code")
      .attr("x", function(d){return x(d.hour)})
      .attr("y", function(d){return y(d.dayofweek)})
      .attr("width", squareSize)
      .attr("height", squareSize)
      .style("fill", function(d){return d.count === 0 ? empty_color : color(d.count)})
      .on("mouseover", function(d){
          if (d.count > 0) {
            d3.select(this).classed("hover", true);
            legend(d.value);
          }
      })
      .on("touchstart", function(d, i){
          if (d.count > 0) {
            rects.selectAll("rect.code").classed("hover", function(dd, ii){return i == ii});
            legend(d.value);
          }
      })
      .on("mouseout", function(d){
        d3.select(this).classed("hover", false);
        legend(mode === 0 ? topCommits : topMerges);
      });
    r.exit().remove()
 
  }
  update(0)

  d3.select("#code-mode")
    .selectAll("button")
    .data(["Commits", "Pull Request Merges"])
    .enter().append("button")
    .attr("class", function(d, i){return "btn btn-small" + (i == 0 ? ' active' : '')})
    .text(function(d){return d;})
    .on("click", function(d, i) {
        d3.select("#code-mode").selectAll("button").classed("active", function(dd, ii){
          return ii == i;
        });
        update(i)
  });

  
  svg.append("g")
    .attr("class", "y axis")
  .selectAll("text")
    .data(d3.range(7))
    .enter()
    .append("text")
    .attr("x", -5)
    .attr("y", function(d){return y(d) + (squareSize/2) + 1 })
        .attr("dy", ".25em")
    .style("text-anchor", "end")
    .text(function(d) {
      return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][d]
    })

  svg.append("g")
    .attr("class", "x axis")
  .selectAll("text")
    .data(d3.range(24))
    .enter()
    .append("text")
    .attr("x", function(d){return x(d) + (squareSize/2) + 1})
    .attr("y", y(7) + squareSize/2.6)
        .attr("dy", ".25em")
    .style("text-anchor", "middle")
    .text(function(d) {
      return ["12a", "1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", 
              "11a", "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p"][d]
    })


  

});


})();
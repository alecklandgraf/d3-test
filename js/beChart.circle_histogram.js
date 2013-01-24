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

};
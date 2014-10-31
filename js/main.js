require.config({
  paths: {
    jquery: 'libs/jquery/jquery-1.9.0.min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
	text: 'libs/require/text'
  }

});

// require(['views/app'], function(AppView){
	// var app_view = new AppView;
// });

require(['jquery', 'underscore', 'backbone'],
function   ($,_,Backbone) {
    var listItem = Backbone.View.extend({
		initialize : function(){
			alert("view initialize");
		}
	});
listItem();
	
});
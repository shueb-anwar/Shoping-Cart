(function(CART , $){
	CART.Model = function(){
	
	};
	
	CART.Model.prototype = {
		init : function(){
			console.log('Model Initialize');
		},
		db : {},
		cart : [

		],
		favorite : []
	}
})(window.CART = window.CART || {} , jQuery)
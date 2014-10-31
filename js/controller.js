(function(CART , $){
	CART.Controller = function(){
		model = new CART.Model();
		cockee = new CART.Cockee();
	};
	CART.Controller.prototype = {
		init : function(){
			console.log('Controller Initialize');
		},
		getProductDetail : function(){
			var db = model.db.items;
			return db;
		},
		addToCart : function(item,qty,size,color){
			var obj = this.getCurrentObjectDetail(item);
			product = {	code : item, qty : qty, size : size, color : obj.color[color]	}
			if(this.checkItemIntoCart(product)){
				return {
					status : false,
					msg : "Item Already exist in the CART, Plese change specifcation or Edit to update the Cart Content."
				}
			}
			else{
				var x = cockee.getItem('cart')
				if(x==null){
					console.log('no item in cart');
					x = new Array();
					x.push({ code : item , qty : qty, size : size, color : [obj.color[color]]});
				}else{
					var x = JSON.parse(x);
					x.push({ code : item , qty : qty, size : size, color : [obj.color[color]]});
				}
				x = JSON.stringify(x);
				cockee.setItem('cart',x)
				this.refreshCart();
				return {
					status : true,
					msg : "Item added to the CART"
				}
			}
		},
		addToFavorite : function(item){
			var x = cockee.getItem('favorite');
			if(x==null){
				x = new Array();
				x.push(item);
				x = JSON.stringify(x);
				cockee.setItem('favorite',x)
				this.refreshFavorite();
			}else{
				var x = JSON.parse(x);
				if(this.checkItemIntoFavorite(item)){
					return {
						status : false,
						msg : "Item alreadt exist in the Favorite"
					}
				}
				else{
					x.push(item);
					x = JSON.stringify(x);
					cockee.setItem('favorite',x);
					this.refreshFavorite();
					return {
						status : true,
						msg : "Item added to Favorite List"
					};
				}
			}			
		},
		checkItemIntoCart : function(product){
			var cart = this.getCartContent();
			var status = false;
			for(var i=0;i<cart.length;i++){
				if(cart[i].code==product.code && cart[i].color==product.color && cart[i].size==product.size ){
					status = true;
				}
			}
			return status;
		},
		checkItemIntoFavorite : function(item){
			var favorite = this.getFavoriteContent();
			var status = false;
			for(var i=0;i<favorite.length;i++){
				if(favorite[i].code==item){
					status = true;
				}
			}
			return status;
		},
		viewCart : function(){
			alert(model.cart);
		},
		emptyCart : function(){
			cockee.setItem('cart','');
			console.log('Cart Empty');
			this.refreshCart();
		},
		getTotalCartItem : function(){
			var cart = cockee.getItem('cart');
			if(cart==null){
				return 0;
			}else{
				cart = JSON.parse(cart);
			}
			return cart.length;
		},
		getTotalFavoriteItem : function(){
			var x = cockee.getItem('favorite');
			x = JSON.parse(x);
			return x.length;
		},
		refreshCart	: function(){
			CART.totalItemInCart.innerHTML = this.getTotalCartItem();
		},
		refreshFavorite	: function(){
			CART.totalItemInFavorite.innerHTML = this.getTotalFavoriteItem();
		},
		getCartContent : function(){
			var result = new Array();
			var x = cockee.getItem('cart');
			if(x==null){
				return false
			}
			else{
				x = JSON.parse(x);
				for(var i=0;i<x.length;i++){
					for(var j=0;j<model.db.items.length;j++){
						if(x[i].code==model.db.items[j].code){
							var temp = Object.create(model.db.items[j]);
							result.push(temp);
						}
					}
					$.extend(result[i],x[i]);
				}
				return result;
			}
		},
		deleteCartItem : function(item){
			console.log(item)
			var cart = cockee.getItem('cart');
			cart = JSON.parse(cart);
			for(var i=0;i<cart.length;i++){
				if(cart[i].code == item){
					cart.splice(i,1);
					console.log(cart[i])
				}
			}
			cart = JSON.stringify(cart);
			cockee.removeItem('cart');
			cockee.setItem('cart',cart);
			this.refreshCart();
			CART.showMessage('Item removed from Cart');
		},
		deleteFavoriteItem : function(item){
			var favorite = cockee.getItem('favorite');
			favorite = JSON.parse(favorite);
			for(var i=0;i<favorite.length;i++){
				if(favorite[i] == item){
					favorite.splice(i,1);
				}
			}
			favorite = JSON.stringify(favorite);
			cockee.removeItem('favorite');
			cockee.setItem('favorite',favorite);
			this.refreshFavorite();
			CART.showMessage('Item removed from Favorite');
		},
		getFavoriteContent : function(){
			var temp = new Array();
			var x = cockee.getItem('favorite');
			if(x==null){
				return false
			}
			else{
				x = JSON.parse(x);
				for(var i=0;i<x.length;i++){
					for(var j=0;j<model.db.items.length;j++){
						if(x[i]==model.db.items[j].code){
							temp.push(model.db.items[j]);
						}
					}
				}
				return temp;
			}
		},
		getCurrentObjectDetail : function(code){
			var temp = {};
			for(var i=0;i<model.db.items.length;i++){
				if(model.db.items[i].code==code){
					temp = model.db.items[i];
				}
			}
			return temp;
		},
		changeThumb : function(event,id){
			event.preventDefault();
			$(".thumb-big").removeClass('active');
			document.getElementById(id).className = "thumb-big active"
		}
	}
})(window.CART = window.CART || {} , jQuery)
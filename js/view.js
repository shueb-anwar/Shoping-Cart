(function(CART , $, doc , undefined){
	CART.View = function(){
		controller = new CART.Controller();
	};
	
	CART.View.prototype = {
		init : function(){
			var db = controller.getProductDetail(); 
			CART.items.innerHTML =  this.appendProductTemplate(db);
			console.log('View Initialize');
			this.addClickEvent();
			this.initCart();
			this.initFavorite();
		},
		addClickEvent : function(){
			self = this;
			
			// for(var i=0;i<doc.getElementsByClassName('cart-button').length;i++){
				// doc.getElementsByClassName('cart-button')[i].addEventListener('click', function(){
					// controller.addToCart(this.getAttribute('rel'));
				// },false);
			// }
			
			CART.cartControl.addEventListener('click', function(event){
				event.preventDefault();
				var cart = controller.getCartContent();
				self.showCart(cart);
				//console.log(cart);
			}, false);		
			
			CART.favoriteControl.addEventListener('click', function(event){
				event.preventDefault();
				var favorite = controller.getFavoriteContent();
				self.showFavorite(favorite);
				//console.log(cart);
			}, false);		
			
			for(var i=0;i<doc.getElementsByClassName('more-detail').length;i++){
				doc.getElementsByClassName('more-detail')[i].addEventListener('click', function(event){
					self.viewDetail(this.getAttribute('href'),event);
					
				},false);
			}
		},
		initCart : function(){
			var x = cockee.getItem('cart');
			if(x==null){
				cockee.setItem('cart','');
			}
			else{
				controller.refreshCart();;
			}
		},
		initFavorite : function(){
			var x = cockee.getItem('favorite');
			if(x==null){
				cockee.setItem('favorite','');
			}
			else{
				controller.refreshFavorite();;
			}
		},
		appendProductTemplate : function(db){
			var st = "<div class=\"item-wrapper\">";
			for(var i=0;i<db.length;i++){
				//var st = st + "<div class=\"item\">"+db[i].code+"</div>" 
				if(i%4==3){
					st = st + "<div class=\"item\"><div class=\"inner\">"+
						"<div class=\"productImage\"><img src=\""+db[i].thumb+"\" alt=\""+db[i].name+"\" title=\""+db[i].name+"\"/><a href=\"#"+db[i].code+"\" class=\"more-detail\">View Detail</a></div>"+
						"<div class=\"product-name\">"+db[i].title+"</div>"+
						"<div class=\"product-price\">Rs. "+db[i].price+"</div>"+
						//"<div class=\"add-to-cart\"><input type=\"button\" value=\"Add to Cart\" class=\"input cart-button\" rel=\""+db[i].code+"\" /></div>"+
						//"<div class=\"save-for-later\"><input type=\"button\" value=\"&nbsp;\" class=\"input \" rel=\""+db[i].code+"\" /></div>"+
					"</div></div></div><div class=\"item-wrapper\">";
				}
				else{
					st = st + "<div class=\"item\"><div class=\"inner\">"+
						"<div class=\"productImage\"><img src=\""+db[i].thumb+"\" alt=\""+db[i].name+"\" title=\""+db[i].name+"\"/><a href=\"#"+db[i].code+"\" class=\"more-detail\">View Detail</a></div>"+
						"<div class=\"product-name\">"+db[i].title+"</div>"+
						"<div class=\"product-price\">Rs. "+db[i].price+"</div>"+
						//"<div class=\"add-to-cart\"><input type=\"button\" value=\"Add to Cart\" class=\"input cart-button\" rel=\""+db[i].code+"\" /></div>"+
						//"<div class=\"save-for-later\"><input type=\"button\" value=\"&nbsp;\" class=\"input\" rel=\""+db[i].code+"\" /></div>"+
					"</div></div>";
				}				
			}
			return st;
		},
		viewDetail : function(href,event){
			event.preventDefault();
			var obj = controller.getCurrentObjectDetail(href.split("#").join(''));
			var st = "<div class=\"model\">"+
				"<div class=\"inner\">"+
					"<div class=\"detail\">"+
						"<div class=\"product-name\">" + obj.name + "</div>"+
						"<div class=\"price\">"+
							"<span>Rs.</span>"+ obj.price + 
						"</div>"+
						"<div class=\"color\">"+
							"Color : <ul>";
			if(obj.color){
				for(var i=0; i<obj.color.length;i++){
					st = st + "<li><a href=\"#"+obj.color[i]+"\" style=\"background : "+obj.color[i]+"\"></a></li>";
				}
			}
			else{
				st = st + "<li>Not Applicable</li>"
			}
			st = st + "</ul>"+
						"</div>"+
						"<div class=\"color-size\">"+
							"<table cellpadding=\"0\" cellspacing=\"0\" >"+
								"<tr>"+
									"<td>Qty</td>"+
									"<td>Size</td>"+
								"</tr>"+
								"<tr>"+
									"<td>"+
										"<select id=\"qty\">"+
											"<option>1</option>"+
											"<option>2</option>"+
											"<option>3</option>"+
											"<option>4</option>"+
											"<option>5</option>"+
											"<option>6</option>"+
											"<option>7</option>"+
											"<option>8</option>"+
											"<option>9</option>"+
											"<option>10</option>"+
										"</select>"+
									"</td>"+
									"<td>"+
										"<select id=\"size\">";
			for(var i=0; i<obj.size.length;i++){
				st = st + "<option value="+obj.size[i]+">"+obj.size[i]+"</option>";
			}
			st = st +					"</select>"+
									"</td>"+
								"</tr>"+
							"</table>"+
						"</div>"+
						"<div class=\"add-to-cart\">"+
							"<input type=\"button\" class=\"myButton big\" value=\"Add to Bag\" rel=\""+ obj.code + "\"/>"+
							"<input type=\"button\" class=\"myButton big starred\" value=\"&nbsp;\" rel=\""+ obj.code + "\"/>"+
						"</div>"+
						
							
						
					"</div>"+
					"<div class=\"main-thumb\">";
			for(var i=0; i<obj.thumbBig.length;i++){
				if(i==0){
					st = st + "<div id=\"thumb-big"+i+"\" class=\"thumb-big active\"><img src=\""+obj.thumbBig[i]+"\" /></div>";
				}
				else{
					st = st + "<div id=\"thumb-big"+i+"\" class=\"thumb-big\"><img src=\""+obj.thumbBig[i]+"\" /></div>";
				}
			}
			st = st + "<div class=\"small-thumbs\">"+
							"<ul>";
					for(var i=0; i<obj.thumbSmall.length;i++){
							st = st + "<li><a rel=\"thumb-big"+i+"\" class=\"small-thumb\"><img src=\""+ obj.thumbSmall[i]+"\" /></a></li>";
					}
							"</ul>"+
						"</div>"+
					"</div>"+
				"</div>"+
			"</div>";
			TINY.box.show({html : st , animate:false , openjs:function(){
				doc.getElementsByClassName('myButton')[0].addEventListener('click', function(){
					CART.qty = doc.getElementById("qty");
					CART.size = doc.getElementById("size");
					CART.color = $('.color').find('a.active').parent('li').index();
					if(CART.color == -1){ 
						alert('Please Select A Color');	
						return false; 
					}
					else{
						var addItem = controller.addToCart(this.getAttribute('rel'),CART.qty.value,CART.size.value,CART.color);
						CART.showMessage(addItem.msg);
					}
				},false);
				
				doc.getElementsByClassName('myButton big')[1].addEventListener('click', function(){
					var favorite = controller.addToFavorite(this.getAttribute('rel'));
					CART.showMessage(favorite.msg);
				},false);
				
				for(var i=0;i<doc.getElementsByClassName('small-thumb').length;i++){
					doc.getElementsByClassName('small-thumb')[i].addEventListener('click', function(){
						controller.changeThumb(event,this.getAttribute('rel'));
					},false);
				}
				
				$('.color').find('a').click(function(){
					$('.color').find('a').removeClass('active');
					$(this).addClass('active');
				});
			}});
			
		},
		showCart : function(obj){
			var total=0;
			if(obj==false){
				CART.showMessage("No Items into Cart !." );
			}
			else{
				st = "<div class=\"cart-container\">";
				for(var i=0;i<obj.length;i++){
					st = st + "<div class=\"cart-item\">"+
						"<div class=\"img\"><img src=\""+obj[i].thumb+"\" width =\"100\" /></div>"+
						"<div class=\"\">Name : "+obj[i].name+"</div>"+
						"<div class=\"\">Color : "+obj[i].color+"</div>"+
						"<div class=\"\">Size : "+obj[i].size+" <input type=\"button\"  class=\"deleteItem myButton right\" value=\"delete\" rel=\""+obj[i].code+"\"/></div>"+
						"<div class=\"\">Quantity : "+obj[i].qty+"</div>"+
						"<div class=\"\">Price : "+obj[i].price+"</div>"+
						"<div class=\"\"></div>"+
					"</div>";
					total = total + parseInt(obj[i].price);
				}
				st = st + "<div class=\"total\"><table cellspacing=\"0\" cellpadding=\"0\" width=\"300\">"+
						"<tr><th width=\"150\">Total Amount</th><td width=\"50\">:</td><td>" +total+ "</td></tr>" + 
						"<tr><th width=\"150\"><a href=\"#\">Continue Shopping</a></th><td width=\"50\"></td><td><input type=\"button\" value=\"Check Out\" class=\"myButton\" /></td></tr></table></div>" ;
				TINY.box.show({html : st , animate:false , openjs:function(){
					$('.deleteItem').click(function(){
						var code = $(this).attr('rel');
						controller.deleteCartItem(code);
					});
					
				}});
				//$(".container").append(st)
			}
		},
		showFavorite : function(obj){
			if(obj==false){
				CART.showMessage("No Items into Favorite !." );
			}
			else{
				st = "<div class=\"cart-container\">";
				for(var i=0;i<obj.length;i++){
					st = st + "<div class=\"cart-item\">"+
						"<div class=\"img\"><img src=\""+obj[i].thumb+"\" width =\"100\" /></div>"+
						"<div class=\"\">Name : "+obj[i].name+"</div>"+
						"<div class=\"\">Price : "+obj[i].price+" <input type=\"button\"  class=\"deleteFavorite myButton right\" value=\"delete\" rel=\""+obj[i].code+"\"/></div>"+
					"</div>";
				}
				TINY.box.show({html : st , animate:false , openjs:function(){
					$('.deleteFavorite').click(function(){
						var code = $(this).attr('rel');
						controller.deleteFavoriteItem(code);
					});
				}});
			}
		}
	}
})(window.CART = window.CART || {} , jQuery, document);
(function(CART , $){
	CART.items = document.getElementById("items");
	CART.totalItemInCart = document.getElementById("no-of-cart-items");
	CART.totalItemInFavorite = document.getElementById("no-of-favorite-items");
	
	CART.cartControl = document.getElementById("cart");
	CART.favoriteControl = document.getElementById("favorite");
	
	
	CART.parseJSON = function(response){
		var temp = response;
		try {
			var json = JSON.parse(response); 
			return {
				response : json,
				status : true,
				exception : ''
			}
		} catch (e) {
			return {
				response : temp,
				status : false,
				exception : e
			}
		}
	}
	CART.init = function(){
		$.ajax({
			dataType : "json",
			url: this.config.urls.data,  
			success: function(response) {
				CART.Model.prototype.db = response;
				var view = new CART.View();
				view.init();
			},
			error : function(response){
				console.log(response);
			}
		});
		
		
		/*var jqxhr = $.getJSON( this.config.urls.data, function() {
		  //console.log( "success" );
		})
		  .done(function() {
			console.log( "second success" );
		  })
		  .fail(function() {
			console.log( "error" );
		  });
		  // .always(function() {
			// console.log( "complete" );
		  // });
		  */
		  
	},
	CART.showMessage = function(msg){
		TINY.box.show({html : msg})
	};
	CART.parseJSON = function(response){
		var temp = response;
		try {
			var json = JSON.parse(response); 
			return {
				response : json,
				status : true,
				exception : ''
			}
		} catch (e) {
			return {
				response : temp,
				status : false,
				exception : e
			}
		}
	}
	CART.Cockee = function(){
		
	}
	CART.Cockee.prototype = {
		getItem: function (sKey) {
		return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
		},
		setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
			if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
			var sExpires = "";
			if (vEnd) {
				switch (vEnd.constructor) {
					case Number:
					  sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
					  break;
					case String:
					  sExpires = "; expires=" + vEnd;
					  break;
					case Date:
					  sExpires = "; expires=" + vEnd.toUTCString();
					  break;
			  }
			}
			document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
			return true;
		},
		removeItem: function (sKey, sPath, sDomain) {
			if (!sKey || !this.hasItem(sKey)) { return false; }
				document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
			return true;
		},
		hasItem: function (sKey) {
			return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
		},
		keys: function () {
			var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
			for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
			return aKeys;
		}
	};
	CART.init();
	
})(window.CART = window.CART || {} , jQuery);
(function (CART, undefined) {
	CART.config = {
		language: 'english',
        debug: true,
		appId: '150352665021939',
		urls : {
			"data" : "data.json",
			"500" : "500.shtml",
			homepage : 'index.html'
		},
		services : {
			FBLogin : '/projectname/mvc/services/1.0/validateFBUser',
			FBLogout : '/projectname/mvc/services/1.0/logoutFBUser',
			checkFacebookUser : "/projectname/mvc/services/1.0/checkFacebookUser"
		},
		theme: {
			skin: 'a',
			toolbars: {
				index: 'ui-navigation-toolbar',
				pages: 'ui-custom-toolbar'
			},
			messages: {
				loading : "Loading...",
				ajaxRequestFail : "Server not responding. Please try again or try after sometime.",
				serviceErrorHTML: "<p class='errorText'>Something went wrong</p>"
			},
			defaults : {
				noRecordsTrendingStories : 6,
				noRecordsOtherVideos : 10,
				noRecordsMoreSupporter : 3
			}
		}
	};

/**
 * Check to evaluate whether 'CART' exists in the global namespace - if not, assign window.CART an object literal.
 */
}(window.CART = window.CART || {}, jQuery));
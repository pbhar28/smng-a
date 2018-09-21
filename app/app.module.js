angular.module('app', ['ui.router']);

angular.module('app').config(['$stateProvider', '$urlRouterProvider', stateProvider]);

function stateProvider ($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/');
	
	$stateProvider
		
		// HOME STATES AND NESTED VIEWS ====
		
		.state('home',{
			url:'/',
			template: '<products></products>'
		})
		.state('productDetails',{
			url:'/product-details',
			params: {
				id: null
			},
			template: '<product-details></product-details>'
		})
							
}

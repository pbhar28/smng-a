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
			template: '<product-details ></product-details>'
		})
		.state('checkout',{
			url:'/checkout',
			params: {
				id: null
			},
			template: '<product-details></product-details>'
		})

}

angular.module('app').controller('appController', function () {
	var self = this;

});
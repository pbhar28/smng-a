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
			template: '<product-details on-item-add="$ctrl.updateCartInfo(obj)"></product-details>'
		})
		.state('checkout',{
			url:'/checkout',
			params: {
				id: null
			},
			template: '<product-details></product-details>'
		})

}

angular.module('app').component('root', {
	bindings: {
	},
	controller: [rootController],
	templateUrl: '/views/root.html'
})

function rootController() {
	var self = this;

	self.updateCartInfo = function(obj) {
		self.cartInfo = obj;
	}

};
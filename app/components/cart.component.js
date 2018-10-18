angular.module('app').component('cartWidget', {
	templateUrl: '/views/cart.html',
	controller: ['$state', cartWidgetController],
	bindings: {
		// one-way input binding, e.g.,
		// <users users="$parentCtrl.userlist"></users>
		// automatically bound to `users` on the controller
	}
})

function cartWidgetController( $state) {
	var self = this;

	self.cartHasItem = false;

	self.loadDetails = function(item){

	}

}
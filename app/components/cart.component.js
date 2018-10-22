angular.module('app').component('cartWidget', {
	templateUrl: '/views/cart.html',
	controller: [cartWidgetController],
	bindings: {
		cartInfo: '<'
	}
})

function cartWidgetController() {
	var self = this;

	self.$onChanges = function(changes){
		if(changes.cartInfo.currentValue) {
			if(changes.cartInfo.currentValue.quantity > 0){
				self.cartHasItem = true;
				self.quantity = changes.cartInfo.currentValue.quantity;
				self.total = changes.cartInfo.currentValue.total;
			} else if(changes.cartInfo.currentValue.quantity < 1){
				self.cartHasItem = false;
			}
		}
	}

	self.loadDetails = function(item){

	}

}
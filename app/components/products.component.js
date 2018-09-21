angular.module('app').component('products', {
	templateUrl: '/views/products.html',
	controller: ['productsService', '$state', productsController],
	bindings: {
		// one-way input binding, e.g.,
		// <users users="$parentCtrl.userlist"></users>
		// automatically bound to `users` on the controller
		users: '<'
	}
})

function productsController(productsService, $state) { 
	var self = this;
	
	productsService.getProducts().then(function(result){
		displayStoreData(result);
	}, function(error){
		
	});
	
	function displayStoreData(responseObj){
		if(responseObj){
			console.log(responseObj);
			var storeData = [];
			angular.forEach(responseObj, function(value, key) {
			  if(value.parent === 0){
				  var obj = {};
				  obj.name = value.name;
				  obj.id = value.id;
				  storeData.push(obj);
			  }		  
		});
			self.data = storeData;
		}
	}
	
	self.loadDetails = function(item){
		$state.go('productDetails', {id: item})
	}
	
}
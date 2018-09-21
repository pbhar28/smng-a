angular.module('app').component('productDetails', {
	bindings: {
		// one-way input binding, e.g.,
		// <users users="$parentCtrl.userlist"></users>
		// automatically bound to `users` on the controller
		users: '<'
	},
	controller: ['$stateParams', 'productsService', productsController],
	templateUrl: '/views/product.details.html'
})

function productsController($stateParams, productsService) { 
	var self = this;
	
	if($stateParams.id){
		productsService.getProducts().then(function(result){
			displayProductsData(result, $stateParams.id);
		}, function(error){
			
		});
	}
	
	function displayProductsData(responseObj, id){
		if(responseObj){
			var cateogoryData = [];
			angular.forEach(responseObj, function(value, key) {
			  if(value.parent === id){
				  var obj = {};
				  obj.name = value.name;
				  obj.id = value.id;
				  cateogoryData.push(obj);
				  console.log(cateogoryData)
			  }		  
		});
		
			self.data = cateogoryData;
		}
	}
	
}
angular.module('app').component('productDetails', {
	bindings: {
		// one-way input binding, e.g.,
		// <users users="$parentCtrl.userlist"></users>
		// automatically bound to `users` on the controller
		users: '<'
	},
	controller: ['$stateParams', 'productsService', 'productDataService', productsController],
	templateUrl: '/views/product.details.html'
})

function productsController($stateParams, productsService, productDataService) {
	var self = this, cateogoryData = [];


	if($stateParams.id){
		productsService.getProducts().then(function(result){
			displayProductsData(result, $stateParams.id);
		}, function(error){

		});
	}

	function convertProductsData() {
		productDataService.getProducts().then(function(response){
			console.log('Products data dump');
			console.log(response);
			displayProductsData2(response);
		}, function(error){

		});
	}

	function displayProductsData2 (responseObj){
		
		var productData = [];
		angular.forEach(cateogoryData, function(cValue) {
			var productCount = 0;
			cValue.products = [];
			angular.forEach(responseObj, function(pValue) {
				if(pValue.categories.length > 0){
					for(var i=0; i < pValue.categories.length; i++){
						if(cValue.id === pValue.categories[i].id){
							var obj= {};
							obj.name = pValue.name;
							obj.price = pValue.price;
							obj.sale_price = pValue.sale_price;
							obj.imageSrc = pValue.images[0].src;
							cValue.products.push(obj);
						}
					}
				}
			})
		})
		console.log('Inserted Products successfully!');
		console.log(cateogoryData);
		self.data = cateogoryData;
	}

	function displayProductsData(responseObj, id){
		if(responseObj){
			angular.forEach(responseObj, function(value, key) {
			  if(value.parent === id){
				  var obj = {};
				  obj.name = value.name;
				  obj.id = value.id;
				  cateogoryData.push(obj);
			  }
		});
			console.log('printing categoryData array: ', cateogoryData);
			convertProductsData();
		}
	}

}
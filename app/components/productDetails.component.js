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
		angular.forEach(responseObj, function(value, key) {

				if(value.categories.length > 0){
					for(var j=0; j < value.categories.length; j++){
						for(var i=0; i < cateogoryData.length; i++){
							var productCount = 0;
							if(cateogoryData[i].id === value.categories[i].id){
								cateogoryData[i].products = [{}];
								cateogoryData[i].products[productCount].name = value.name;
								cateogoryData[i].products[productCount].price = value.price;
								cateogoryData[i].products[productCount].sale_price = value.sale_price;
								productCount++;
								//console.log('Inserted Product successfully!');
								console.log(cateogoryData);
							}
						}
					}
				}

		})
		console.log('new cateogry data');
		console.log(cateogoryData);
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
			self.data = cateogoryData;
			convertProductsData();
		}
	}

}
angular.module('app').component('productDetails', {
	bindings: {
		// one-way input binding, e.g.,
		// <users users="$parentCtrl.userlist"></users>
		// automatically bound to `users` on the controller
		onItemAdd: '&'
	},
	controller: ['$stateParams', 'productsService', 'productDataService', 'addtoCartService',productsController],
	templateUrl: '/views/product.details.html'
})

function productsController($stateParams, productsService, productDataService, addtoCartService) {
	var self = this, categoryData = [];

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
		angular.forEach(categoryData, function(cValue) {
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
							obj.id = pValue.id;
							obj.imageSrc = pValue.images[0].src;
							cValue.products.push(obj);
						}
					}
				}
			})
		})
		console.log('Inserted Products successfully!');
		console.log(categoryData);
		self.data = categoryData;
	}

	function displayProductsData(responseObj, id){
		if(responseObj){
			angular.forEach(responseObj, function(value, key) {
			  if(value.parent === id){
				  var obj = {};
				  obj.name = value.name;
				  obj.id = value.id;
				  categoryData.push(obj);
			  }
		});
			console.log('printing categoryData array: ', categoryData);
			convertProductsData();
		}
	}

	//chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security

	self.addItem = function(id, qt){



/* 		addtoCartService.addProduct(id, 1).then(function(result){
			console.log('product added to cart successfully');
			console.log(result);
		}, function(error){

		}); */
	}

}
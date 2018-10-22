angular.module('app').component('productDetails', {
	bindings: {
		// one-way input binding, e.g.,
		// <users users="$parentCtrl.userlist"></users>
		// automatically bound to `users` on the controller
		onItemAdd: '&'
	},
	controller: ['$stateParams', 'productsService', 'productDataService', 'addtoCartService','$timeout',productsController],
	templateUrl: '/views/product.details.html'
})

function productsController($stateParams, productsService, productDataService, addtoCartService, $timeout) {
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
							obj.quantity = 0;
							cValue.products.push(obj);
						}
					}
				}
			})
		})
		//console.log('Inserted Products successfully!');
		//console.log(categoryData);
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

	self.addItem = function(pid, cid, event){
		var qt;
		angular.forEach(self.data, function(cdata) {
			if(cdata.id === cid){
				for(var j=0; j < cdata.products.length; j++){
					if(cdata.products[j].id === pid){
						cdata.products[j].quantity = cdata.products[j].quantity + 1;
						qt = cdata.products[j].quantity;
						return;
					}
				}
			}
		})

		var addBtn = angular.element(document.querySelector('#'+event.target.id));
		addBtn.addClass('_36fT9');
		$timeout( function(){
			addBtn.addClass('_4aKW6');
			var otherBtn = addBtn.parent().find('div');
			angular.element(otherBtn[2]).removeClass('_4aKW6'); //.addClass('_20vNm');
			angular.element(otherBtn[3]).removeClass('_4aKW6'); //.addClass('_2quy-');
			angular.element(otherBtn[1]).removeClass('_4aKW6'); //.addClass('_2WdfZ');
			//.removeClass('_4aKW6');
        }, 500 );

		updateCart(pid, qt, "add", cid);
	}

	function resetBtns(){
		var otherBtn = angular.element(document.querySelector('._icC3')),
		otherBtns = otherBtn.parent().find('div');
		angular.element(otherBtns[2]).addClass('_4aKW6');
		angular.element(otherBtns[3]).addClass('_4aKW6');
		angular.element(otherBtns[1]).addClass('_4aKW6');
		angular.element(otherBtns[0]).removeClass('_4aKW6');
		$timeout( function(){
			angular.element(otherBtns[0]).removeClass('_36fT9');
        }, 500 );
	}

	function updateCart(id, qt, method, cid, pkey){
		if(method == "add"){
			addtoCartService.addProduct(id, qt).then(function(result){
				//alert('product added to cart successfully');
				angular.forEach(self.data, function(cdata) {
					if(cdata.id === cid){
						for(var j=0; j < cdata.products.length; j++){
							if(cdata.products[j].id === id){
								cdata.products[j].cartItemKey = result.key;
								return;
							}
						}
					}
				})
				console.log(result);
				self.onItemAdd({obj: {total: result.line_total, quantity: result.quantity, id: Date.now()}});
			}, function(error){

			});
		} else if(method == "update"){
			if(qt > 0){
				addtoCartService.updateProduct(pkey, qt).then(function(result){
					//alert('product in cart updated successfully');
					angular.forEach(self.data, function(cdata) {
						if(cdata.id === cid){
							for(var j=0; j < cdata.products.length; j++){
								if(cdata.products[j].id === id){
									cdata.products[j].quantity = qt;
									alert(result);
								}
							}
						}
					})
				}, function(error){

				});
			} else {
				addtoCartService.removeProduct(pkey).then(function(result){
					//alert('product in cart updated successfully');
					angular.forEach(self.data, function(cdata) {
						if(cdata.id === cid){
							for(var j=0; j < cdata.products.length; j++){
								if(cdata.products[j].id === id){
									cdata.products[j].quantity = qt;
									alert(result);
									resetBtns();
								}
							}
						}
					})
				}, function(error){

				});
			}

		} else {
			alert("Error in adding item to cart!");
		}
	}

	self.incItemCount = function(pid, cid, pkey){
		var qt;
		angular.forEach(self.data, function(cdata) {
			if(cdata.id === cid){
				for(var j=0; j < cdata.products.length; j++){
					if(cdata.products[j].id === pid){
						cdata.products[j].quantity = cdata.products[j].quantity + 1;
						qt = cdata.products[j].quantity;
						return;
					}
				}
			}
		})
		updateCart(pid, qt, "update", cid, pkey);
	}

	self.decItemCount = function(pid, cid, pkey, event){
		var qt;
		angular.forEach(self.data, function(cdata) {
			if(cdata.id === cid){
				for(var j=0; j < cdata.products.length; j++){
					if(cdata.products[j].id === pid){
						cdata.products[j].quantity = cdata.products[j].quantity - 1;
						qt = cdata.products[j].quantity;
						return;
					}
				}
			}
		})
		updateCart(pid, qt, "update", cid, pkey);
	}

	self.clearCart = function(){
		addtoCartService.clearCart().then(function(result){
			alert(result);
		}, function(error){

		});
	}

	self.viewCart = function(){
		addtoCartService.viewCart().then(function(result){
			console.log(result);
		}, function(error){

		});
	}

}
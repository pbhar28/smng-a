angular.module('app').factory('addtoCartService', ['$http', addtoCartFactory]);

function addtoCartFactory($http) {

	return {
		addProduct : addProduct,
		updateProduct : updateProduct,
		removeProduct : removeProduct,
		clearCart : clearCart,
		viewCart : viewCart
	};

	function addProduct(id, qt) {
		var items = [];
		promise =  $http({
			method : 'POST',
			url : 'https://hangovrr.com/wp-json/wc/v2/cart/add',
			headers: {
				'Authorization': 'Basic Y2tfMjdmNjY1YjIwZDU5MTc1OWM2NDUwZDlmZjJkY2RhNjI4OTgwZWRjOTpjc19hYjU0Mzg4MjAyMmRmMDEyYWRhMDRlMzVhMjAwMDFiNTgyNjk4NjI4',
				'Content-Type':'application/json'
			},
			data: {
				'product_id': id,
				'quantity': qt
			}
		}).then(function onSuccess(response) {
			//Handle success
			items = response.data;
			return items;
		}, function onError(response) {
			// Handle error
			var data = response.data,
				status = response.status,
				statusText = response.statusText,
				headers = response.headers,
				config = response.config;
			return data;
		});

		return promise;
	}

	function updateProduct(cartItemKey, qt) {
		var items;
		promise =  $http({
			method : 'POST',
			url : 'https://hangovrr.com/wp-json/wc/v2/cart/cart-item',
			headers: {
				'Authorization': 'Basic Y2tfMjdmNjY1YjIwZDU5MTc1OWM2NDUwZDlmZjJkY2RhNjI4OTgwZWRjOTpjc19hYjU0Mzg4MjAyMmRmMDEyYWRhMDRlMzVhMjAwMDFiNTgyNjk4NjI4',
				'Content-Type':'application/json'
			},
			data: {
				'cart_item_key': cartItemKey,
				'quantity': qt
			}
		}).then(function onSuccess(response) {
			//Handle success
			items = response.data;
			return items;
		}, function onError(response) {
			// Handle error
			var data = response.data,
				status = response.status,
				statusText = response.statusText,
				headers = response.headers,
				config = response.config;
			return data;
		});

		return promise;
	}

	function removeProduct(cartItemKey) {
		promise =  $http({
			method : 'DELETE',
			url : 'https://hangovrr.com/wp-json/wc/v2/cart/cart-item',
			headers: {
				'Authorization': 'Basic Y2tfMjdmNjY1YjIwZDU5MTc1OWM2NDUwZDlmZjJkY2RhNjI4OTgwZWRjOTpjc19hYjU0Mzg4MjAyMmRmMDEyYWRhMDRlMzVhMjAwMDFiNTgyNjk4NjI4',
				'Content-Type':'application/json'
			},
			data: {
				'cart_item_key': cartItemKey
			}
		}).then(function onSuccess(response) {
			//Handle success
			return response.data;
		}, function onError(response) {
			// Handle error
			var data = response.data,
				status = response.status,
				statusText = response.statusText,
				headers = response.headers,
				config = response.config;
			return data;
		});

		return promise;
	}

	function clearCart() {
		promise =  $http({
			method : 'POST',
			url : 'https://hangovrr.com/wp-json/wc/v2/cart/clear',
			headers: {
				'Authorization': 'Basic Y2tfMjdmNjY1YjIwZDU5MTc1OWM2NDUwZDlmZjJkY2RhNjI4OTgwZWRjOTpjc19hYjU0Mzg4MjAyMmRmMDEyYWRhMDRlMzVhMjAwMDFiNTgyNjk4NjI4',
				'Content-Type':'application/json'
			}
		}).then(function onSuccess(response) {
			//Handle success
			return response.data;
		}, function onError(response) {
			// Handle error
			var data = response.data,
				status = response.status,
				statusText = response.statusText,
				headers = response.headers,
				config = response.config;
			return data;
		});

		return promise;
	}

	function clearCart() {
		promise =  $http({
			method : 'POST',
			url : 'https://hangovrr.com/wp-json/wc/v2/cart/clear',
			headers: {
				'Authorization': 'Basic Y2tfMjdmNjY1YjIwZDU5MTc1OWM2NDUwZDlmZjJkY2RhNjI4OTgwZWRjOTpjc19hYjU0Mzg4MjAyMmRmMDEyYWRhMDRlMzVhMjAwMDFiNTgyNjk4NjI4',
				'Content-Type':'application/json'
			}
		}).then(function onSuccess(response) {
			//Handle success
			return response.data;
		}, function onError(response) {
			// Handle error
			var data = response.data,
				status = response.status,
				statusText = response.statusText,
				headers = response.headers,
				config = response.config;
			return data;
		});

		return promise;
	}

	function viewCart() {
		promise =  $http({
			method : 'GET',
			url : 'https://hangovrr.com/wp-json/wc/v2/cart',
			headers: {
				'Authorization': 'Basic Y2tfMjdmNjY1YjIwZDU5MTc1OWM2NDUwZDlmZjJkY2RhNjI4OTgwZWRjOTpjc19hYjU0Mzg4MjAyMmRmMDEyYWRhMDRlMzVhMjAwMDFiNTgyNjk4NjI4',
				'Content-Type':'application/json'
			}
		}).then(function onSuccess(response) {
			//Handle success
			return response.data;
		}, function onError(response) {
			// Handle error
			var data = response.data,
				status = response.status,
				statusText = response.statusText,
				headers = response.headers,
				config = response.config;
			return data;
		});

		return promise;
	}

}

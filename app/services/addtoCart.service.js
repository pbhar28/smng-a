angular.module('app').factory('addtoCartService', ['$http', addtoCartFactory]);

function addtoCartFactory($http) {

	return {
		addProduct : addProduct
	};

	var items = [];

	function addProduct(id, qt) {
		console.log('Inside addtoCart Service');
		console.log(id);
		console.log(qt);
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

}

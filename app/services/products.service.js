angular.module('app').factory('productsService', ['$http', getProductFactory]);

	function getProductFactory($http) {

		return {
			getProducts : getProducts
		};

		var items = [],
			last_request_failed = true,
			promise = undefined;

		function getProducts() {
			if(!promise || last_request_failed){
				promise = $http({
					method : 'GET',
					url : 'https://hangovrr.com/wp-json/wc/v2/products/categories',
					headers: {
						"Authorization": 'Basic Y2tfMjdmNjY1YjIwZDU5MTc1OWM2NDUwZDlmZjJkY2RhNjI4OTgwZWRjOTpjc19hYjU0Mzg4MjAyMmRmMDEyYWRhMDRlMzVhMjAwMDFiNTgyNjk4NjI4'
					},
					cache: true
				}).then(function onSuccess(response) {
					//Handle success
					last_request_failed = false;
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
			}

				return promise;
			}
	}
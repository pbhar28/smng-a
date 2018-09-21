angular.module('app').factory('getProducts', ['$http', function getProductFactory($http) {
	
	var method = {};
	var responseObj;
	
	method.data = function(){
					
				if(!responseObj) {
				$http({
					method : 'GET',
					url : 'https://hangovrr.com/wp-json/wc/v2/products',		
					headers: {
						"Authorization": 'Basic Y2tfMjdmNjY1YjIwZDU5MTc1OWM2NDUwZDlmZjJkY2RhNjI4OTgwZWRjOTpjc19hYjU0Mzg4MjAyMmRmMDEyYWRhMDRlMzVhMjAwMDFiNTgyNjk4NjI4'
					},
					cache: true
				}).then(function onSuccess(response) {
					//Handle success
					console.log(response);
					responseObj = response.data;
					getProductData();
				}, function onError(response) {
					// Handle error
					var data = response.data,
						status = response.status,
						statusText = response.statusText,
						headers = response.headers,
						config = response.config;
					alert(data);
				});
			}
			
			function getProductData(){
 				for(var i=0; i < responseObj.length; i++){
					if(responseObj[i].categories.length > 0){
						for(var j=0; j < responseObj[i].categories.length; j++){
							console.log('haha' + responseObj[i].categories[j].name);
						}
					}
				}
			}
			console.log('Printing from factory');
			console.log(responseObj);
			return responseObj;
	}
	return method;

}]);
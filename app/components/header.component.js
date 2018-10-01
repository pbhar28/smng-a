angular.module('app').component('siteHeader', {
	templateUrl: '/views/header.html',
	controller: ['$state', headerController],
	bindings: {
		// one-way input binding, e.g.,
		// <users users="$parentCtrl.userlist"></users>
		// automatically bound to `users` on the controller
		users: '<'
	}
})

function headerController($state) {
	var self = this;



}
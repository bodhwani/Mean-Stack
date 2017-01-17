var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

    var refresh = function(){
    $http.get('/contactlist').success(function(response){
    	console.log("Recieved a get request in controller.js");
    	$scope.contactlist = response;
    	});
	};

	//this refresh is called so that if we click on add contact, then it will not show
	// in the list, but after refreshing, it will show up. So this is made so that as we 
	//click on add contact button, it will immediately show up in the list.
	refresh();

    $scope.addContact = function(){
    	console.log("entered into addContact");
    	console.log($scope.contact);
    	$http.post('/contactlist', $scope.contact).success(function(response){
    	console.log(response);
    	refresh();
    	});
    };

    $scope.remove = function(id){
    	console.log(id);
    	$http.delete('/contactlist/'+id).success(function(response){
    		refresh();
    	});
    };

    $scope.edit = function(id) {
	  console.log(id);
	  $http.get('/contactlist/' + id).success(function(response) {
	  	console.log("Trigerred get request");
	    $scope.contact = response;
	  });
	};

	$scope.update = function(){
		console.log($scope.contact._id);
		$http.put('/contactlist/'+ $scope.contact._id, $scope.contact).success(function(response){
			refresh();
		});
	};

	$scope.deselect = function(){
		$scope.contact = "";
	};

}]);
















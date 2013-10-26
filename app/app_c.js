var app = angular.module('app', []);

app.config(['$httpProvider', function ($httpProvider) {
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
}]);

function appController($scope, $rootScope, app_service)
{

	$scope.app_name = app_name;
	$scope.page_title = page_title;
	$scope.products = [];
	$scope.category = "Best Sellers";
	$scope.searchStr = "nike";
	$scope.page = 10;


	$scope.getMenu = function(){
		app_service.getMenu().then(function (data) {

			data.sort(orderByNameAscending);

			$scope.menu = data;
		}, function (err) {
			window.console.log(err);
		});
	};


	$scope.getDefaultItems = function(){
		$scope.showLoading = true;
		app_service.getDefaultItems().then(function (data) {
			$scope.products = data;
			$scope.showLoading = false;
		}, function (err) {
			window.console.log(err);
		});
	};

	 $scope.getCache = function(functionName){
        
        var retrievedObject = localStorage.getItem(functionName);

        if (typeof retrievedObject === 'string' || typeof retrievedObject == undefined){
          return JSON.parse(retrievedObject);
        } else{
         	return false;
        }
    };


    $scope.setCache = function(functionName,data){
      localStorage.setItem(functionName, JSON.stringify(data));
    };


	$scope.search = function(search){
		$scope.closePanel();
		$scope.showLoading = true;
        $scope.page = 10;
        $scope.searchStr = search;
        $scope.category = $scope.searchStr.replace("_"," ");
		var products = $scope.getCache(search);
			
		if (products !== false){
			$scope.products = products;
			$scope.showLoading = false;
		} else{
			$scope.completeSearch(search);
		}
	};

	$scope.completeSearch = function(search){

		app_service.search(search).then(function (data) {
			$scope.products = data;
			$scope.setCache(search,data);
			$scope.showLoading = false;
		}, function (err) {
			window.console.log(err);
		});
	};

	$scope.closePanel = function(){
		
		$('#content-container').toggleClass('active');
		$('#sidemenu').toggleClass('active');
		setTimeout(function() {
			$('#sidemenu-container').toggleClass('active');
		}, 500);

	};

	 function orderByNameAscending(a,b){
		if (a.name == b.name) {
	        return 0;
	    } else if (a.name > b.name) {
	        return 1;
	    }

	    return -1;
	};

	 $scope.paginate = function(){
        $("html, body").animate({ scrollTop: 0 }, 10);
        $scope.showLoading = true;
        $scope.page = $scope.page + 20;
        var post = "search=" + $scope.searchStr;
        post += "&offset=" + $scope.page;

        app_service.paginate(post).then(function (data) {
            $scope.products = data;
            $scope.showLoading = false;
        }, function (err) {
            window.console.log(err);
        });

    }

    $scope.init = (function ()
    {
    	$scope.getMenu();
    	$scope.getDefaultItems();
    })();
}
var app = angular.module('editorApp', []);

app.config(['$httpProvider',function($httpProvider){
  $httpProvider.defaults.headers.post['Content-Type']= 'application/x-www-form-urlencoded';
}]);
var app = angular.module("app", [ ]);

app.controller("AppTest", function($scope, $http){
  /**
  global vars
  **/
  app=this;
  $scope.hackerNew = "";


  $http.get('/ycomb').success(function(data) {
      $scope.hackerNew = data;
  });

});

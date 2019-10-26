

var app = angular.module("app", ['angular-loading-bar']);

app.controller("AppTest", function($scope, $http, $location, $anchorScroll){
  /**
  global vars
  **/
  app=this;
  $scope.hackerTop = "";
  $scope.lobTop = "";
  $scope.rTop = "";
  $scope.hackerNew = "";
  $scope.lobNew = "";
  $scope.rNew = "";
  $scope.content="first";


  /**
  For top posts
  **/
  $http.get('/ycomb').success(function(data) {
      $scope.hackerTop = data.Crawls;
  });
  $http.get('/lobster').success(function(data) {
      $scope.lobTop = data.Crawls;
  });
  $http.get('/rp').success(function(data) {
      $scope.rTop = data.Crawls;
  });

  /**
  For new posts
  **/
  $http.get('/ynew').success(function(data) {
      $scope.hackerNew = data.Crawls;
  });
  $http.get('/lnew').success(function(data) {
      $scope.lNew = data.Crawls;
  });
  $http.get('/rnew').success(function(data) {
      $scope.rNew = data.Crawls;
  });

  $scope.refresh = function(){
    $http.get('/ycomb').success(function(data) {
        $scope.hackerTop = data.Crawls;
    });
    $http.get('/lobster').success(function(data) {
        $scope.lobTop = data.Crawls;
    });
    $http.get('/rp').success(function(data) {
        $scope.rTop = data.Crawls;
    });

    /**
    For new posts
    **/
    $http.get('/ynew').success(function(data) {
        $scope.hackerNew = data.Crawls;
    });
    $http.get('/lnew').success(function(data) {
        $scope.lNew = data.Crawls;
    });
    $http.get('/rnew').success(function(data) {
        $scope.rNew = data.Crawls;
    });
  };

  $scope.goToTop = function(){
    $location.hash('refresh');
    $anchorScroll();
  };


});

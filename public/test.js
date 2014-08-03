var app = angular.module("app", ['angular-loading-bar']);

app.controller("AppTest", function($scope, $http){
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

  /**
  For top posts
  **/
  $http.get('/ycomb').success(function(data) {
      $scope.hackerTop = data;
  });
  $http.get('/lobster').success(function(data) {
      $scope.lobTop = data;
  });
  $http.get('/rp').success(function(data) {
      $scope.rTop = data;
  });

  /**
  For new posts
  **/
  $http.get('/ynew').success(function(data) {
      $scope.hackerNew = data;
  });
  $http.get('/lnew').success(function(data) {
      $scope.lNew = data;
      console.log(data);
  });
  $http.get('/rnew').success(function(data) {
      $scope.rNew = data;
  });

  $scope.refresh = function(){
    $http.get('/ycomb').success(function(data) {
        $scope.hackerTop = data;
    });
    $http.get('/lobster').success(function(data) {
        $scope.lobTop = data;
    });
    $http.get('/rp').success(function(data) {
        $scope.rTop = data;
    });

    /**
    For new posts
    **/
    $http.get('/ynew').success(function(data) {
        $scope.hackerNew = data;
    });
    $http.get('/lnew').success(function(data) {
        $scope.lNew = data;
    });
    $http.get('/rnew').success(function(data) {
        $scope.rNew = data;
    });
  }

  $("#toTop").click(function () {
    $("html, body").animate({scrollTop: 0}, 1000);
  });
  $('#toTop').css( 'cursor', 'pointer' );
  $('#refresh').css( 'cursor', 'pointer' );

});

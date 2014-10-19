

var app = angular.module("app", ['angular-loading-bar']);

var quicksort = function (arr) {
  if (arr.length === 0)
    return [];

  var left = [];
  var right = [];
  var pivot = arr[0];
  //go through each element in array
  for (var i = 1; i < arr.length; i++) {
    if (arr[i].points > pivot.points) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  };
  return quicksort(left).concat(pivot, quicksort(right));
};

app.controller("AppTest", function($scope, $http, $location, $anchorScroll){
  // Global Variables
  app=this;
  var sites = ['HN', 'lobsters', 'r/programming'];
  $scope.content="first";
  $scope.posts = [];
  $scope.routes = ['/ycomb', '/lobster', '/rp'];

  $scope.new_posts = [];
  $scope.new_routes = ['/ynew', '/lnew', '/rnew'];
  
  // Top Posts
  for(route in $scope.routes)
    $http.get($scope.routes[route]).success(function (data) {
      for(datum in data)
        $scope.posts.push(data[datum]);
      $scope.posts = quicksort($scope.posts);
      // change points of posts based on top rated post on site
      for(site in sites)
        for(post in $scope.posts)
          if($scope.posts[post].site === site)
            $scope.posts[post].points = $scope.posts[post].points/$scope.posts[0];
      $scope.posts = quicksort($scope.posts);
    });

  // New Posts
  for(route in $scope.new_routes)
    $http.get($scope.new_routes[route]).success(function (data) {
      for(datum in data)
        $scope.new_posts.push(data[datum]);
      $scope.new_posts = quicksort($scope.new_posts);
      // change points of posts based on top rated post on site
      for(site in sites)
        for(post in $scope.new_posts)
          if($scope.new_posts[post].site === site)
            $scope.new_posts[post].points = $scope.new_posts[post].points/$scope.new_posts[0];
      $scope.new_posts = quicksort($scope.new_posts);
    });


  $scope.refresh = function(){
    // Top Posts
    for(route in $scope.routes)
      $http.get($scope.routes[route]).success(function (data) {
        for(datum in data)
          $scope.posts.push(data[datum]);
        $scope.posts = quicksort($scope.posts);
      });

    // New Posts
    for(route in $scope.new_routes)
      $http.get($scope.new_routes[route]).success(function (data) {
        for(datum in data)
          $scope.new_posts.push(data[datum]);
        $scope.new_posts = quicksort($scope.new_posts);
      });
  }

  $scope.goToTop = function(){
    $location.hash('refresh');
    $anchorScroll();
  }


});
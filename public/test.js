

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
      // update order once points are changed
      $scope.posts = quicksort($scope.posts);

      var removedPosts = [];
      for (var post = $scope.posts.length - 1; post >= 0; post--) {
        if($scope.posts[post].points == decodeURI('%E2%80%A2'))
        {
          var index = $scope.posts.indexOf($scope.posts[post]);
          $scope.posts.splice(index, 1);
          removedPosts.push($scope.posts[post]);
        }
      };
      for(post in removedPosts)
        $scope.posts.push(removedPosts[post]);
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
      // update order once points are changed
      $scope.new_posts = quicksort($scope.new_posts);

      var new_removedPosts = [];
      for (var post = $scope.new_posts.length - 1; post >= 0; post--) {
        if($scope.new_posts[post].points == decodeURI('%E2%80%A2'))
        {
          var index = $scope.new_posts.indexOf($scope.new_posts[post]);
          $scope.new_posts.splice(index, 1);
          new_removedPosts.push($scope.new_posts[post]);
        }
      };
      for(post in new_removedPosts)
        $scope.new_posts.push(new_removedPosts[post]);
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
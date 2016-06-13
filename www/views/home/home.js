
angular.module('App')
//.controller('homeController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {
.controller('homeController', function ($scope,$location,$ionicSideMenuDelegate) {
  //var ref = new Firebase(FURL);

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.logOut = function () {
      //Auth.logout();
      //firebase.unauth();
      $location.path("/login");
  }

}
)

.controller("CartController", function($scope) {
  
  $scope.data = {
    items : []
  };
  
  for(var i = 0; i < 25; i++) {
    $scope.data.items.push({
      id : i,
      label : "Item " + i
    })
  }
  
})





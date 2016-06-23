
angular.module('App')
//.controller('homeController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {
.controller('homeController', function ($scope,$location,$state,Scopes,$window,$ionicSideMenuDelegate) {
  //var ref = new Firebase(FURL);


$scope.profilefoto=$window.localStorage['avatar'];


  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.dados={}
  $scope.disp='none'
  $scope.enviadados = function(){
    if(typeof $scope.dados.input1 == 'undefined'){
       $scope.disp='block' 
    }else{
      if($scope.dados.input1.length != 7){
        $scope.disp='block'
      }else{
        $scope.disp='none'
        Scopes.store('HomeCont', $scope.dados);
        $state.go("app.lista");
      }
    }
  } 

})

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





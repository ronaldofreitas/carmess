angular.module('App')
.controller('loginController', function ($scope,$location,$http) {
//.controller('loginController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {

  $scope.signIn = function(user){

      $location.path("/app/home2/32");

     /* myobject = {'email':user.email,'senha':user.password,'tp':1}
      var res = $http({
          method: 'POST',
          url: 'http://localhost/carmess/api/',
          data: myobject, 
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      res.success(function(data, status, headers, config) {
        if(data == 1){
          $location.path("/app/home2");
        }else{
          alert('Não foi possível acessar');
        }

      });
      res.error(function(data, status, headers, config) {
        //alert( "failure message: " + JSON.stringify({data: data}));
        console.log(data);
        console.log(status);
      });*/
  };

});

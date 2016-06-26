angular.module('App')
.controller('loginController', function ($scope,$window,$location,$http,$ionicLoading) {
//.controller('loginController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {

  $scope.signIn = function(user){

    $ionicLoading.show({
      animation: 'fade-in',
      showBackdrop: false,
      maxWidth: 200,
      showDelay: 500,
      template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>'
    });

    setTimeout(function(){

      $ionicLoading.hide();
      myobject = {'email':user.email,'senha':user.password,'tp':1}
      var res = $http({
          method: 'POST',
          url: 'http://localhost/carmess/api/',
          data: myobject, 
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      res.success(function(data, status, headers, config) {
        if(data[0]){

          firebase.database().ref('usuarios/'+data[0].id).once('value').then(function(snapshot) {
            $window.localStorage['nome']   = snapshot.val().nome;
            $window.localStorage['avatar'] = snapshot.val().avatar;
            $window.localStorage['email']  = snapshot.val().email;
            $window.localStorage['id']     = snapshot.val()._id;
            $window.localStorage['marca']  = snapshot.val().marca;
            $window.localStorage['modelo'] = snapshot.val().modelo;
            $window.localStorage['cor']    = snapshot.val().cor;
            $window.localStorage['placa']  = snapshot.val().placa;
            //$window.localStorage['placa1'] = '';
            //$window.localStorage['placa2'] = '';

          });
          $location.path("/app/home2/"+data[0].id);

        }else{
          alert('Não foi possível acessar');
        }
      });
      res.error(function(data, status, headers, config) {
        //alert( "failure message: " + JSON.stringify({data: data}));
        //console.log(data);
        //console.log(status);
      });

    }, 1000);

  };

});

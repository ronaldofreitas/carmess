angular.module('controllers', [])

.controller('homeCtrl', function($scope,$rootScope,$window,$location,$http,$ionicLoading) {

  $scope.profilefoto='';
  $scope.listPlacas=[]

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  if(
    !$window.localStorage.nome || 
    !$window.localStorage.placa1 || 
    !$window.localStorage.placa2 || 
    !$window.localStorage.marca || 
    !$window.localStorage.modelo || 
    !$window.localStorage.cor){
    //alert('Existem dados pendentes em seu perfil.');

    //$location.path("/app/perfil/"+$window.localStorage['id']);
    $location.path("/app/perfil");

  }else{

      $scope.placa={input1:'',input2:''}
      $scope.profilefoto=$window.localStorage['avatar'];
      $rootScope.iduser=$window.localStorage['id'];

      $scope.validateCode = function($event,tp){
        if(tp == 1){// campo 1 apenas texto e 3 caracteres
          if('abcdefghijklmnopqrstuwxyz'.indexOf(String.fromCharCode($event.keyCode)) == -1){
            $event.returnValue = false;
          }
        }else{// campo 2 apenas numero e 4 caracteres
          if('0123456789'.indexOf(String.fromCharCode($event.keyCode)) == -1){
            $event.returnValue = false;
          }
        }
      } 

      $scope.placa = [];
 

      $scope.enviadados = function(){
 
        $ionicLoading.show();

        if(typeof $scope.placa.input1 == 'undefined' || typeof $scope.placa.input2 == 'undefined'){
          alert('Preencha a placa corretamente.');
          $ionicLoading.hide();
          return false;
        } 

        if($scope.placa.input1.length < 3 || $scope.placa.input2.length < 4){
          alert('Preencha a placa corretamente.');
          $ionicLoading.hide();
          return false;
        }

        var placaref = $scope.placa.input1.toUpperCase()+''+$scope.placa.input2;
        var placa    = (placaref.length == 7) ? placaref : null;

        if(placa != null){

          objetoplaca = {
            'placa':$scope.placa.input1.toUpperCase()+''+$scope.placa.input2,
            'tp':4}
          var res = $http({
              method: 'POST',
              url: 'http://localhost/carmess/api/',
              data: objetoplaca, 
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
          res.success(function(data, status, headers, config) {
            if(data == 'false'){
              $ionicLoading.hide();
              alert('Nenhum resultado encontrado.');              
            }else{
              $scope.listPlacas=[{carro:data.carro,id:data.id,avatar:data.avatar}]
              $ionicLoading.hide();
            }
          });

        }

      }

    
 }

})

.controller('perfilCont', function($scope,$window,$location,$http) {

  $scope.perfil={
    nome:$window.localStorage.nome,
    avatar:$window.localStorage.avatar,
    email:$window.localStorage.email,
    marca:$window.localStorage.marca,
    modelo:$window.localStorage.modelo,
    cor:$window.localStorage.cor,
    placa1:$window.localStorage.placa1,
    placa2:$window.localStorage.placa2
  }

  $scope.validateCode = function($event,tp){
    if(tp == 1){// campo 1 apenas texto e 3 caracteres
      if('abcdefghijklmnopqrstuwxyz'.indexOf(String.fromCharCode($event.keyCode)) == -1){
        $event.returnValue = false;
      }
    }else{// campo 2 apenas numero e 4 caracteres
      if('0123456789'.indexOf(String.fromCharCode($event.keyCode)) == -1){
        $event.returnValue = false;
      }
    }
  } 

  $scope.salvarPerfil = function(){

    firebase.database().ref('usuarios/'+parseInt($window.localStorage.id)).update({
      nome : $scope.perfil.nome,
      modelo: $scope.perfil.modelo,
      marca:  $scope.perfil.marca,
      cor:  $scope.perfil.cor,
      placa: $scope.perfil.placa1.toUpperCase()+''+$scope.perfil.placa2
    });

    $window.localStorage['nome'] = $scope.perfil.nome;
    $window.localStorage['marca'] = $scope.perfil.marca;
    $window.localStorage['modelo'] = $scope.perfil.modelo;
    $window.localStorage['cor'] = $scope.perfil.cor;

    if($scope.perfil.placa1.length < 3 || $scope.perfil.placa2.length < 4){
      alert('Preencha a placa corretamente.');
      return false;
    }   


    if(
      !$window.localStorage.nome || 
      !$window.localStorage.marca || 
      !$window.localStorage.modelo || 
      !$window.localStorage.cor){

      alert('Todos os campos são obrigatórios');
      return false;
    }

      objetoplaca = {
        'id_user':$window.localStorage.id,
        'placa':$scope.perfil.placa1.toUpperCase()+''+$scope.perfil.placa2,
        'carro':$scope.perfil.modelo+' '+$scope.perfil.marca,
        'avatar':$window.localStorage.avatar,
        'tp':3}
      var res = $http({
          method: 'POST',
          url: 'http://localhost/carmess/api/',
          data: objetoplaca, 
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      res.success(function(data, status, headers, config) {
        console.log(data);
        if(data == 'false'){
          alert('Essa placa já está registrada.');
        }
      });

    $window.localStorage['placa1'] = $scope.perfil.placa1.toUpperCase();
    $window.localStorage['placa2'] = $scope.perfil.placa2;

    alert('Gravado com sucesso.');

    //$location.path("/app/home2/"+$window.localStorage['id']);
  };

})

.controller('ChatCont', function($scope,$ionicScrollDelegate) {
  $scope.data={message:''}

  $scope.nomeusuario='ronaldo'
  $scope.messages=[]

  $scope.sendMessage=function(){
    $scope.messages.push({texto:$scope.data.message});
    $scope.data={message:''}
    $ionicScrollDelegate.scrollBottom(true);
  }
  
})
.controller('ListaCont', function($scope,Scopes,$location,$ionicLoading) {

  $scope.placa=''
   $ionicLoading.show();
   $scope.mostra=false;
   if(typeof Scopes.get().HomeCont == 'undefined'){
      $location.path("/home");
   }else{


      $scope.placa = Scopes.get().HomeCont.input1
      setTimeout(function(){ $ionicLoading.hide(); $scope.mostra=true; }, 1000);
      
   }

   $scope.chatgo = function(){
    $location.path("/app/chat");
   }

})

.controller('denunciarCtrl', function($scope) {

})
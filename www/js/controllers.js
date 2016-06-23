angular.module('controllers', [])

.controller('homeCtrl', function($scope,$rootScope,$window,$location,$ionicLoading) {

  $ionicLoading.show();
  $scope.validapesquisa=true;
  if(
    !$window.localStorage.placa1 || 
    !$window.localStorage.placa2 || 
    !$window.localStorage.marca || 
    !$window.localStorage.modelo || 
    !$window.localStorage.cor){
    //alert('Existem dados pendentes em seu perfil.');
    $scope.validapesquisa=false;
    //$location.path("/app/perfil/"+$window.localStorage['id']);

    setTimeout(function(){
      $ionicLoading.hide();
    }, 1000);
  }else{

    setTimeout(function(){

      $ionicLoading.hide();

      $scope.placa={input1:'',input2:''}
      $scope.profilefoto=$window.localStorage['avatar'];
      $rootScope.iduser=$window.localStorage['id'];

      $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };


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


      $scope.enviadados = function(){

        console.log($scope.placa.input1.length);

        if($scope.placa.input1.length < 3 || $scope.placa.input2.length < 4){
          alert('bote a porra diretchu rapá');
          return false;
        }
        /*
          consulta pra ver se placa existe e segue para chat
        */
      }

    }, 1000);
 }

})

.controller('perfilCont', function($scope,$window) {

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

    var placaset = $window.localStorage.placa1+''+$window.localStorage.placa2;
    console.log('placas/'+placaset);
    // antes de fazer update na placa, remove a atual, evitando que um mesmo usuario tenha varias placas
    firebase.database().ref('placas/'+placaset).remove();

    setTimeout(function(){
    // atualiza placa    
      firebase.database().ref('placas/'+placaset).update({
        _id:parseInt($window.localStorage.id)
      });
    }, 500);



    $window.localStorage['placa1'] = '';
    $window.localStorage['placa2'] = '';

    $window.localStorage['placa1'] = $scope.perfil.placa1.toUpperCase();
    $window.localStorage['placa2'] = $scope.perfil.placa2;

    //alert('Gravado com sucesso.');

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
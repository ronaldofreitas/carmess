angular.module('controllers', [])

.controller('homeCtrl', function($scope,$rootScope,$window,$location,$http,$ionicLoading,URL_API) {

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
            'id':$window.localStorage.id,
            'placa':$scope.placa.input1.toUpperCase()+''+$scope.placa.input2,
            'tp':4}
          var res = $http({
              method: 'POST',
              url: URL_API,
              data: objetoplaca, 
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
          res.success(function(data, status, headers, config) {
            
            console.log(data);

            if(data == 'false'){
              $ionicLoading.hide();
              $scope.listPlacas=[]
              alert('Nenhum resultado encontrado.');              
            }else{
              $scope.listPlacas=[{carro:data.carro, id:data.id_user, avatar:data.avatar}]
              $ionicLoading.hide();
            }
          });

        }

      }

    
 }

})

.controller('perfilCont', function($scope,$window,$location,$http,URL_API) {

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
          url: URL_API,
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

  };

})




  

.controller('ChatCont', function($scope,$stateParams,$ionicScrollDelegate,$window) {

  //$scope.data={message:''}

  $scope.meuid=$window.localStorage.id;
  $scope.carro=$stateParams.carro;
  $scope.nomeusuario=$window.localStorage.nome
  $scope.messages=[]


  var commentsRef = firebase.database().ref('conversas/'+parseInt($scope.meuid)+'-'+parseInt($stateParams.iduser));

  commentsRef.on("child_added", function(snapshot) {
    var data = snapshot.val();

    $scope.messages.push({
      data:data.data,
      id_origem:data.id_origem,
      texto:data.mensagem
    });

    if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
        $scope.$apply();
    }


  });

  

  setTimeout(function(){
   // document.getElementById('teste').select();
    $ionicScrollDelegate.scrollBottom(true);
    //$ionicLoading.hide();
  }, 1500);



  $scope.sendMessage=function(){

    var msg = document.getElementById('mensagem').value;

    // go to bottom
    $ionicScrollDelegate.scrollBottom(true);

    // escreve no chat do outro usuário
    firebase.database().ref('conversas/'+parseInt($stateParams.iduser)+'-'+parseInt($scope.meuid)).push({
      id_origem:$window.localStorage.id,
      data:new Date().getTime(),
      mensagem:msg
    });

    // replica para você
    firebase.database().ref('conversas/'+parseInt($scope.meuid)+'-'+parseInt($stateParams.iduser)).push({
      id_origem:$window.localStorage.id,
      data:new Date().getTime(),
      mensagem:msg
    });    

    // 
    firebase.database().ref('notification_reg/'+parseInt($stateParams.iduser)).update({
      id_from:$scope.meuid,
      data:new Date().getTime(),
      mensagem:msg,
      carro:$scope.carro
    });

    document.getElementById('mensagem').value='';
    //$scope.data={message:''}

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
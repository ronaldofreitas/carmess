angular.module('controllers', [])

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

//angular.module('App', ['ionic','ngStorage', 'ngCordova','firebase','ngMessages'])
angular.module('App', ['ionic','controllers','services','ngStorage', 'ngCordova','ngMessages'])
.config(function($stateProvider, $urlRouterProvider) {
$stateProvider
 .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home2', {
    url: '/home2/:id',
    cache:true,
    views: {
      'menuContent': {
        templateUrl: 'views/home.html',
        controller: 'homeCtrl'
      }
    }
  })  
  .state('app.perfil', {
    url: '/perfil',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'views/perfil.html'
      }
    }
  })   
  .state('app.denunciar', {
    url: '/denunciar/:id',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'views/denunciar.html',
        controller: 'denunciarCtrl'
      }
    }
  })  
  .state('app.sobre', {
    url: '/sobre',
    views: {
      'menuContent': {
        templateUrl: 'views/sobre.html'
      }
    }
  })


  .state('app.lista', {
    url: '/lista',
    views: {
      'menuContent': {
        templateUrl: 'views/lista.html',
        controller: 'ListaCont'
      }
    }
  })  
  .state('app.chat', {
    url: '/chat/:iduser/:carro',
    cache:true,
    views: {
      'menuContent': {
        templateUrl: 'views/chat.html',
        controller: 'ChatCont'
      }
    }
  })

  // ----------------
    .state('login', {
      url: '/login',
      templateUrl: 'views/login/login.html',
      controller:'loginController'
    })
    .state('forgot', {
      url: '/forgot',
      templateUrl: 'views/forgot/forgot.html',
      controller:'forgotController'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'views/register/register.html',
      controller:'registerController'
    })
    .state('home', {
      url: '/home',
      templateUrl: 'views/home/home.html',
      controller:'homeController'
    })
    ;
  $urlRouterProvider.otherwise("/login");

})

.constant('URL_API','http://192.168.0.3/carmess/api/') 

.run(function($ionicPlatform,$location,$cordovaLocalNotification,$rootScope,$window,$cordovaVibration) {
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);

    var supdasdd = firebase.database().ref('notification_reg/');
   // var supdasdd = firebase.database().ref('notification_reg/'+$window.localStorage.id);
    var onValueChange;

    function onPause() {

      onValueChange = supdasdd.on("child_changed", function(snapshot) {
        var changedPost = snapshot.val();
        snapshot.val();
            $cordovaLocalNotification.add({
                id: changedPost.id_from,
                date: '"'+changedPost.data+'"',
                message: changedPost.mensagem,
                title: changedPost.carro,
                autoCancel: true,
                sound: null,
                icon:      'carro',
                smallIcon: 'carro_small',
            }).then(function () {
             
            });

        $cordovaVibration.vibrate(100);
        setTimeout(function () { 
          $cordovaVibration.vibrate(300); 
          setTimeout(function () { $cordovaVibration.vibrate(500); }, 300);
        }, 400);

      });

    }


    function onResume() {
      supdasdd.off('child_changed', onValueChange);
    }

    document.addEventListener('deviceready', function() {

    });

/*
    document.addEventListener('deviceready', function () {

        cordova.plugins.backgroundMode.configure({
            silent: true
        });

        //cordova.plugins.backgroundMode.setDefaults({ text:'xxxxDoing heavy tasks.'});

        cordova.plugins.backgroundMode.enable();

        // Called when background mode has been activated
        cordova.plugins.backgroundMode.onactivate = function () {
            setTimeout(function () {

              console.log('entrou');

                var supdasdd = firebase.database().ref('notification_reg/');
                //var supdasdd = firebase.database().ref('notification_reg/'+parseInt($window.localStorage.id));

                supdasdd.on("child_changed", function(snapshot) {

                });

                supdasdd.on("value", function(snapshot) {
                  $cordovaLocalNotification.add({
                      id: "1",
                      date: '2016-02-10',
                      message:'olaaa',
                      title: "mudou",
                      autoCancel: true,
                      sound: null, 
                  }).then(function () {
                   
                  });
                });

                supdasdd.on("child_added", function(snapshot) {
                  console.log('child_addedxx');
                });

            }, 5000);
        }
    }, false);

*/



    $rootScope.$on("$cordovaLocalNotification:click", function(notification, state) {
        $location.path("/app/chat/"+state.id+"/"+state.title);
    });



  });
})

.controller('AppCtrl', function($scope) {
})
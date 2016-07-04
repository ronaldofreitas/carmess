
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


    // se ele já se cadastrou vai ter o $window.localStorage.id
   if($window.localStorage.id){


/*
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);

   // var supdasdd = firebase.database().ref('notification_reg/');
    var supdasdd = firebase.database().ref('notification_reg/'+parseInt($window.localStorage.id));
    var onValueChange;



    function onPause() {


      console.log('pausado');
      $cordovaVibration.vibrate(100);

      setInterval(function(){ 
        now = new Date;
        hora =  now.getHours();
        min =  now.getMinutes();
        seg =  now.getMilliseconds();
        console.log(
         hora + ":" + min + ":" + now.getSeconds() + ":" + seg 
        ); 
      }, 30000);

      var arraspd=[];
      var tdp=0;
      onValueChange = supdasdd.on("child_changed", function(snapshot, prevChildKey) {
        var changedPost = snapshot.val();
          arraspd[tdp]=changedPost;
          tdp++;

            if(tdp == 4){

              var stng_id = arraspd[2];
              var stng_carro = arraspd[0];
              var idres = stng_id.split("@");
              var carrores = stng_carro.split("@");

              $cordovaLocalNotification.add({
                  id: idres[0],
                  date: '"'+arraspd[1]+'"',
                  message: arraspd[3],
                  title: carrores[0],
                  autoCancel: true,
                  sound: null,
                  icon:      'carro',
                  smallIcon: 'carro_small',
              }).then(function () {
               
              });

            }


        $cordovaVibration.vibrate(100);
        setTimeout(function () { 
          $cordovaVibration.vibrate(300); 
          setTimeout(function () { $cordovaVibration.vibrate(500); }, 300);
        }, 400);

      });



    } // end onPause


    function onResume() {
      console.log('resumido');
      supdasdd.off('child_changed', onValueChange);
    }
*/
  



    var arraspd=[];
    var tdp=0;
    
   // var supdasdd = firebase.database().ref('notification_reg/');
    var supdasdd = firebase.database().ref('notification_reg/'+parseInt($window.localStorage.id));
    var onValueChange;

    document.addEventListener('deviceready', function () {

        //cordova.plugins.backgroundMode.configure({            silent: true        });
        //cordova.plugins.backgroundMode.setDefaults({ text:'xxxxDoing heavy tasks.'});
        cordova.plugins.backgroundMode.enable();

        cordova.plugins.backgroundMode.onactivate = function () {
            setTimeout(function () {
              onValueChange = supdasdd.on("child_changed", function(snapshot, prevChildKey) {
              //onValueChange = supdasdd.on("child_changed", function(snapshot) {
                var changedPost = snapshot.val();
                
                arraspd[tdp]=changedPost;
                tdp++;

                  if(tdp == 4){

                    var stng_id = arraspd[2];
                    var stng_carro = arraspd[0];
                    var idres = stng_id.split("@");
                    var carrores = stng_carro.split("@");

                    $cordovaLocalNotification.add({
                        id: idres[0],
                        date: '"'+arraspd[1]+'"',
                        message: arraspd[3],
                        title: carrores[0],
                        autoCancel: true,
                        sound: null,
                        icon:      'carro',
                        smallIcon: 'carro_small',
                    }).then(function () {
                     
                    });

                    setTimeout(function () {
                      window.plugins.NativeAudio.preloadComplex('notificacao', 'sons/som.mp3', 1, 1, 0, function(msg) {
                        //console.log('msg: ' + msg); // Loaded
                      }, function(msg) {
                        //console.log('error: ' + msg); // Loading error
                      });

                      window.plugins.NativeAudio.play('notificacao');
                      $cordovaVibration.vibrate(250);
                    }, 500);

                  }

              });

            }, 5000);
        }

      cordova.plugins.backgroundMode.ondeactivate = function() {
        supdasdd.off('child_changed', onValueChange);
      };


    }, false);

    $rootScope.$on("$cordovaLocalNotification:click", function(notification, state) {
        $location.path("/app/chat/"+state.id+"/"+state.title);
    });
    


  }// if $window.localStorage.id


  });

})

.controller('AppCtrl', function($scope) {
})
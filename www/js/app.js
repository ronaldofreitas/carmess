
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

//.constant('FURL', 'https://asfirebase.firebaseio.com/')
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('AppCtrl', function($scope) {
})
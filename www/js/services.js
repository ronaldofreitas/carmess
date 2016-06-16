angular.module('services', [])
.factory ('StorageService', function ($localStorage) {

$localStorage = $localStorage.$default({
  dados: []
});

var _getAll = function () {
  return $localStorage.dados;
};

var _add = function (thing) {
  $localStorage.dados.push(thing);
}

var _remove = function (thing) {
  $localStorage.dados.splice($localStorage.dados.indexOf(thing), 1);
}

return {
    getAll: _getAll,
    add: _add,
    remove: _remove
  };
})

.factory('Scopes', function ($rootScope) {
    var mem = {};
 
    return {
        store: function (key, value) {
            mem[key] = value;
        },
        get: function () {
            return mem;
        }
    };
})
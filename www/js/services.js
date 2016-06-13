angular.module('App')
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
app = angular.module('platonApp', ['firebase']);

app.factory('Slide', ['$firebase', function($firebase) {
  return function(slide){
    var ref = new Firebase("https://platon.firebaseio.com/slides/")
      .child(slide);

    return $firebase(ref).$asObject();
  };
}]);

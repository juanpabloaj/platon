
app = angular.module('platonApp', ['firebase']);

app
  .factory('Slide', ['$firebase', function($firebase) {
    return function(slide){
      var ref = new Firebase("https://platon.firebaseio.com/slides/")
        .child(slide);

      return $firebase(ref).$asObject();
    };
  }])
  .controller('SlideEditController', ['$scope', 'Slide',
    function($scope, Slide){
      var hashId = document.getElementById('hashId').getAttribute('value');
      Slide(hashId).$bindTo($scope, 'slide');
    }
  ])
  .controller('SlideShowController', ['$scope',
    function($scope){
      var hashId = document.getElementById('hashId').getAttribute('value');
      var ref = new Firebase("https://platon.firebaseio.com/slides/");
      ref.child(hashId).on('value', function(snap){
        slideshow.loadFromString(snap.val().markdown);
      });
    }
  ]);

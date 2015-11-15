function validFirebaseId(id){
  return ! Boolean(id.match(/\.|#|\$|\[|\]/));
}

var app = angular.module('platonApp', ['firebase']);

app
  .factory('slideRef', function(){
    return function(slide){
      return new Firebase('https://platon.firebaseio.com/slides/')
        .child(slide);
    };
  })
  .factory('slideFactory',
    ['$firebase', 'slideRef', function($firebase, slideRef) {
    return function(slide){
      return $firebase(slideRef(slide)).$asObject();
    };
  }])
  .controller('SlideEditController',
    ['$scope', '$window', '$sce', 'slideFactory',
    function($scope, $window, $sce, slideFactory){
      var hashId = document.getElementById('hashId').getAttribute('value');

      if ( ! validFirebaseId(hashId) ) {
        $window.location.href = '/';
      }

      slideFactory(hashId).$bindTo($scope, 'slide');

      $scope.markdownChanged = function() {
        if ($scope.slide){
          $scope.previews = [];
          var markdownSlides = $scope.slide.markdown.split('---\n');
          angular.forEach(markdownSlides, function(markdownSlide){
            this.push($sce.trustAsHtml(remark.convert(markdownSlide)));
          }, $scope.previews);
        }
      };

      $scope.$watch('slide', $scope.markdownChanged);

      $scope.themes = [
        'default-theme', 'platon-theme', 'black-theme', 'monokai-theme'
      ];

    }
  ])
  .controller('SlideShowController', ['$scope', '$window', 'slideRef',
    function($scope, $window, slideRef){
      var hashId = document.getElementById('hashId').getAttribute('value');

      if ( ! validFirebaseId(hashId) ) {
        $window.location.href = '/';
      } else {

        slideRef(hashId).on('value', function(snap){
          slideshow.loadFromString(snap.val().markdown);
          angular.forEach(
            document.querySelectorAll('.remark-slide-content'), function(div){
              angular.element(div).addClass(snap.val().theme);
          });
        });

      }
    }
  ]);

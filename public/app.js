
app = angular.module('platonApp', ['firebase']);

app
  .factory('slideFactory', ['$firebase', function($firebase) {
    return function(slide){
      var ref = new Firebase('https://platon.firebaseio.com/slides/')
        .child(slide);

      return $firebase(ref).$asObject();
    };
  }])
  .controller('SlideEditController', ['$scope','$sce', 'slideFactory',
    function($scope, $sce, slideFactory){
      var hashId = document.getElementById('hashId').getAttribute('value');
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
    }
  ])
  .controller('SlideShowController', ['$scope',
    function($scope){
      var hashId = document.getElementById('hashId').getAttribute('value');
      var ref = new Firebase('https://platon.firebaseio.com/slides/');
      ref.child(hashId).on('value', function(snap){
        slideshow.loadFromString(snap.val().markdown);
      });
    }
  ]);

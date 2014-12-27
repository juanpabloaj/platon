
app = angular.module('platonApp', ['firebase']);

app
  .factory('Slide', ['$firebase', function($firebase) {
    return function(slide){
      var ref = new Firebase("https://platon.firebaseio.com/slides/")
        .child(slide);

      return $firebase(ref).$asObject();
    };
  }])
  .controller('SlideEditController', ['$scope','$sce', 'Slide',
    function($scope, $sce, Slide){
      var hashId = document.getElementById('hashId').getAttribute('value');
      Slide(hashId).$bindTo($scope, 'slide');
      $scope.change = function() {
        $scope.previews = [];
        var markdownSlides = $scope.slide.markdown.split('---\n');
        angular.forEach(markdownSlides, function(markdownSlide){
          this.push($sce.trustAsHtml(remark.convert(markdownSlide)));
        }, $scope.previews);
      };
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

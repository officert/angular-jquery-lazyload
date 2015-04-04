angular.module('sampleApp', [
  'angular.jquery.lazyload'
]);

angular.module('sampleApp').controller('imageExampleCtrl', [
  '$scope',
  '$timeout',
  function($scope, $timeout) {

    $scope.loadImages = function() {
      $scope.$broadcast('loadCatPic');
    };
  }
]);

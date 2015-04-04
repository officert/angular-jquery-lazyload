angular.module('angular.jquery.lazyload').directive('imgLazy', [
  function() {
    'use strict';

    return {
      restrict: 'E',
      scope: {
        src: '@',
        effect: '@',
        event: '@',
        threshold: '@'
      },
      replace: true,
      template: '<img class="lazy" data-original="{{ src }}">',
      link: function(scope, element, attrs) {
        element.removeAttr('src');

        element.lazyload({
          effect: scope.effect || "fadeIn",
          event: scope.event,
          threshold: scope.threshold
        });

        if (scope.event) {
          scope.$on(scope.event, function(data) {
            console.log('LOADDDDD');

            element.trigger(scope.event);
          });
        }
      }
    };
  }
]);

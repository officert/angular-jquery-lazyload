angular.module('angular.jquery.lazyload').directive('imgLazyBg', [
  function() {
    'use strict';

    return {
      restrict: 'A',
      scope: {
        imgLazyBg: '@',
        effect: '@',
        event: '@',
        threshold: '@'
      },
      compile: function(element, attrs) {

        return {
          pre: function preLink(scope, iElement, iAttrs, controller) {
            iElement.attr('data-original', scope.imgLazyBg);
          },
          post: function link(scope, element, attrs) {
            element.lazyload({
              effect: scope.effect || "fadeIn",
              event: scope.event,
              threshold: scope.threshold
            });

            if (scope.event) {
              scope.$on(scope.event, function(data) {
                element.trigger(scope.event);
              });
            }
          }
        };
      }
    };
  }
]);

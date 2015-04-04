angular.module('angular.jquery.lazyload').directive('imgLazyBg', [
  function() {
    'use strict';

    return {
      restrict: 'A',
      scope: {
        imgLazyBg: '@',
        effect: '@',
        event: '@'
      },
      compile: function(element, attrs) {

        return {
          pre: function preLink(scope, iElement, iAttrs, controller) {
            iElement.attr('data-original', scope.imgLazyBg);
            //iElement.attr('style', 'background-image:url(\'' + scope.imgLazyBg + '\')');
          },
          post: function link(scope, element, attrs) {
            element.lazyload({
              effect: scope.effect || "fadeIn",
              event: scope.event
            });

            if (scope.event) {
              scope.$on(scope.event, function(data) {
                console.log('TRIGGER IMAGES');
                element.trigger(scope.event);
              });
            }
          }
        };
      }
    };
  }
]);

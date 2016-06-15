angular.module('angular.jquery.lazyload', []);

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
            element.trigger(scope.event);
          });
        }
      }
    };
  }
]);

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

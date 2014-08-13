(function () {

  var refreshMasonry = function () {
    $('.projects').masonry('reloadItems').masonry();
  };

  $(function () {

    $('.no-js').each(function () {
      $(this).removeClass('no-js');
    });

    $('.projects').masonry({
      itemSelector: '.project'
    });

    setInterval(refreshMasonry, 500);

  });

  var app = angular.module('app', []);

  app.config(['$locationProvider', function ($locationProvider) {

    $locationProvider.html5Mode(true).hashPrefix('!');

  }]);

  var preloadImage = function (source) {

    if (document.image) {
      var image = new Image();
      image.src = source;
    }

  };

  app.directive('hoverImage', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attributes) {

        var originalSrc = attributes.src || attributes.ngSrc;
        var hoverSrc = attributes.hoverImage;
        if (typeof hoverSrc !== 'string' || hoverSrc.length < 1) {
          hoverSrc = originalSrc.replace(/(\.\w+)$/, '_hover$1');
        }

        preloadImage(hoverSrc);

        element.mouseenter(function () {
          this.src = hoverSrc;
        });
        element.mouseleave(function () {
          this.src = originalSrc;
        });
        element.tooltip({title: attributes.alt});

      }
    };
  });

  app.filter('github', function () {

    return function (input) {

      input = input || '';

      var github = /\/([^\/]+\/[^\/]+)$/.exec(input);
      if (github) {
        return github[1].replace(/\-/g, '--');
      } else {
        return '';
      }

    };

  });

  app.filter('npm', function () {

    return function (input) {

      input = input || '';

      var npm = /\/([^\/]+)$/.exec(input);
      if (npm) {
        return npm[1];
      } else {
        return '';
      }

    };

  });

  app.filter('travis', function () {

    return function (input) {

      input = input || '';

      var travis = /\/([^\/]+\/[^\/]+)$/.exec(input);
      if (travis) {
        return travis[1];
      } else {
        return '';
      }

    };

  });

  app.controller('MainCtrl', [
    '$scope', '$http', '$location', '$rootScope',
    function ($scope, $http, $location, $rootScope) {

      var defaultTitle = 'Aiham Hammami';
      $rootScope.refreshTitle = function () {

        if ($scope && $scope.techFilterName) {
          return defaultTitle + ' - ' + $scope.techFilterName;
        }
        return defaultTitle;

      };

      var refreshScroll = function () {

        $('body').animate({
          scrollTop: $scope.techFilterName ? $('.currentlyShowing').offset().top : 0
        }, 500);

      };

      var initialPath = undefined;
      var processPath = function (path) {

        if (!$scope.projects) {
          initialPath = path;
          return;
        }

        if (path === undefined) {
          path = initialPath;
        }

        var tech = /^\/tech\/(.+)$/.exec(path);
        if (tech && $scope.allTech().indexOf(tech[1]) >= 0) {
          $scope.techFilterName = tech[1];
        } else {
          $scope.techFilterName = undefined;
          $location.path('');
        }
        initialPath = undefined;

        refreshScroll();
        setTimeout(refreshMasonry, 100);

      };

      $scope.$watch(function () {

        return $location.path();

      }, processPath);

      $scope.techFilter = function (project) {

        return !$scope.techFilterName || project.tech.indexOf($scope.techFilterName) >= 0;

      };

      $scope.sortTech = function (tech) {

        tech = tech ? tech.concat() : []; // Quick clone
        tech.sort(function (a, b) {
          return a.toLowerCase().localeCompare(b.toLowerCase());
        });
        return tech;

      };

      $scope.allTech = function () {

        if (!$scope.projects) {
          return [];
        }

        var techNames = [];
        $scope.projects.map(function (project) {
          project.tech.map(function (tech) {
            if (techNames.indexOf(tech) < 0) {
              techNames.push(tech);
            }
          });
        });

        techNames = $scope.sortTech(techNames);

        return techNames;

      };

      $http.get('/api/socials').success(function (data) {

        $scope.socials = data;

      });

      $http.get('/api/projects').success(function (data) {

        $scope.projects = data;
        processPath();

      });

    }
  ]);

})();

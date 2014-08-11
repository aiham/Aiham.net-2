(function () {

  Array.prototype.map.call(document.querySelectorAll('.no-js'), function (nojs) {
    var c = nojs.className;
    nojs.className = typeof c === 'string' ? c.replace('no-js', '') : '';
  });

  var app = angular.module('app', ['ngAnimate']);

  app.config(['$locationProvider', function ($locationProvider) {

    $locationProvider.html5Mode(true).hashPrefix('!');

  }]);

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

      var loadedCodes = false, loadedProjects = false, initialPath = undefined;

      var processPath = function (path) {

        if (path === undefined) {
          path = initialPath;
        }

        if (loadedCodes && loadedProjects) {
          var tech = /^\/tech\/(.+)$/.exec(path);
          if (tech && $scope.allTech().indexOf(tech[1]) >= 0) {
            $scope.techFilterName = tech[1];
          } else {
            $scope.techFilterName = undefined;
            $location.path('');
          }
          initialPath = undefined;
        } else {
          initialPath = path;
        }

      };

      $scope.$watch(function () {

        return $location.path();

      }, processPath);

      $scope.techFilter = function (item) {

        return !$scope.techFilterName || item.tech.indexOf($scope.techFilterName) >= 0;

      };

      $scope.sortTech = function (tech) {

        tech = tech ? tech.concat() : []; // Quick clone
        tech.sort(function (a, b) {
          return a.toLowerCase().localeCompare(b.toLowerCase());
        });
        return tech;

      };

      $scope.allTech = function () {

        var all = [];
        if ($scope.projects && $scope.codes) {
          all = $scope.projects.concat($scope.codes);
        } else if ($scope.projects) {
          all = $scope.projects;
        } else if ($scope.codes) {
          all = $scope.codes;
        }

        var allTech = [];
        all.map(function (item) {
          item.tech.map(function (tech) {
            if (allTech.indexOf(tech) < 0) {
              allTech.push(tech);
            }
          });
        });

        allTech = $scope.sortTech(allTech);

        return allTech;

      };

      $http.get('/api/socials').success(function (data) {

        $scope.socials = data;

      });

      $http.get('/api/projects').success(function (data) {

        $scope.projects = data;
        loadedProjects = true;
        processPath();

      });

      $http.get('/api/codes').success(function (data) {

        $scope.codes = data;
        loadedCodes = true;
        processPath();

      });

    }
  ]);

})();

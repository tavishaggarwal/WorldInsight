(function () {
    'use strict';
    var indexController = function ($scope, $location, $anchorScroll) {
        $scope.scrollTo = function (id) {
            $location.hash(id);
            $anchorScroll();
        };
    };
    
    angular.module('WorldInsight').controller('indexController', indexController);
    
    indexController.$inject = ['$scope', '$location', '$anchorScroll'];
}());
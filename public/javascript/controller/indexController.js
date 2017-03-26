(function (){
    'use strict';
    
    angular.module('WorldInsight').controller('indexController',['$scope','$location','$anchorScroll', function ($scope,$location, $anchorScroll) {
        $scope.scrollTo = function(id) {
            $location.hash(id);
            $anchorScroll();
        }
    }]);
}());
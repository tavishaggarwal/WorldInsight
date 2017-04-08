(function () {
    'use strict';
    angular.module('WorldInsight')
        .factory('loginFactory', ['$resource', function ($resource) {
            var login = {};
            
            login.register = function () {
                return $resource('/users/register');
            };
            
            login.login = function () {
                return $resource('/users/login/');
            };
            
            return login;
        }]);
}());
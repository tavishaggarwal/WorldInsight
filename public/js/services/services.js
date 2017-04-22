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
        }])
    
            .factory('postFactory', ['$resource', function ($resource) {
            var posts = {};
            
            posts.getPosts = function () {
                return $resource('/post');
            };
            
            posts.addPosts = function () {
                return $resource('/post/add');
            };
            
            return posts;
        }]);
}());
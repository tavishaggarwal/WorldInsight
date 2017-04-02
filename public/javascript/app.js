(function () {

    'use strict';
    var worldInsight = angular.module('WorldInsight', ['ui.router']);

    worldInsight.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'templates/signup.html'
        })
         .state('posts', {
            url: '/posts',
            templateUrl: 'templates/posts.html'
        })
        .state('aboutus', {
            url: '/aboutus',
            templateUrl: 'templates/aboutus.html'
        })
    $locationProvider.html5Mode(true);
    });
    
    worldInsight.run(function($rootScope){

    $rootScope
        .$on('$stateChangeStart', 
            function(event, toState, toParams, fromState, fromParams){ 
                $(".page-loading").removeClass("hidden");
        });

    $rootScope
        .$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams){ 
                $(".page-loading").addClass("hidden");
        });

});
    
}());
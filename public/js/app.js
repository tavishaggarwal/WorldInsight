(function () {

    'use strict';
    var worldInsight = angular.module('WorldInsight', ['ui.router', 'ngResource','ngDialog']);

    worldInsight.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $stateProvider
    .state('WorldInsight', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'templates/header.html',
                        controller :'headerController'
                    },
                    'content': {
                        templateUrl : 'templates/home.html',
                        controller : 'postController'
                    },
                    'footer': {
                        templateUrl : 'templates/footer.html',
                    }
                }

            })
    .state('WorldInsight.signup', {
            url: 'signup',
            views: {
                    'content@': {
                        templateUrl : 'templates/signup.html',
                        controller : 'loginController'
                    }
            }
        })
    .state('WorldInsight.posts', {
            url: 'posts',
            views: {
                    'content@': {
                        templateUrl : 'templates/posts.html',
                        controller : 'postController'
                    }
            }
        })
    .state('WorldInsight.aboutus', {
            url: 'aboutus',
            views: {
                    'content@': {
                        templateUrl : 'templates/aboutus.html',
                        controller : 'aboutusController'
                    }
            }
        });
     
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    });
    
    worldInsight.run(function($rootScope){

    $rootScope
        .$on('$stateChangeStart', 
            function (event, toState, toParams, fromState, fromParams) { 
                $("#ui-view").html("");
                $(".page-loading").removeClass("hidden");
        });

    $rootScope
        .$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams){ 
                $(".page-loading").addClass("hidden");
        });
});
    
}());
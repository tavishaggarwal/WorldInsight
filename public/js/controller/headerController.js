(function () {
    'use strict';
    
    var headerController = function ($scope, $window, loginFactory) {
        
        // Closes the sidebar menu
        $("#menu-close").click(function (e) {
            e.preventDefault();
            $("#sidebar-wrapper").toggleClass("active");
        });
    
        // Opens the sidebar menu
        $("#menu-toggle").click(function (e) {
            e.preventDefault();
            $("#sidebar-wrapper").toggleClass("active");
        });
        
        $scope.loggedIn = false;
        $scope.username = '';
    
        if (loginFactory.isAuthenticated()) {
            $scope.loggedIn = true;
            $scope.username = loginFactory.getDisplayname();
        }
        
        $scope.logoutUser = function () {
            loginFactory.logout();
            $window.location.href = '/';
        };

        $scope.forgotPass = function () {
            $("#passwordResetRequest").modal();
        };

        $scope.usernameVerify = function () {
            loginFactory.forgotPassword($scope.forgotUsername);
        };
    };
    
    angular.module('WorldInsight').controller('headerController', headerController);
    
    headerController.$inject = ['$scope', '$window', 'loginFactory'];
}());

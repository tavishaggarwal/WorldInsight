(function () {
    'use strict';
    var loginController = function ($window, $scope, loginFactory) {
        
        var init = (function () {
            // Scroll to top of page
            $window.scrollTo(0, 0);
        }());
        
        $scope.login = function (element) {
            var indexPage = false;
            if (undefined !== element) {
                if (element.target.id) {
                    $('#signIn').removeClass('hidden');
                    indexPage = true;
                } else {
                    $('#signInForm').removeClass('hidden');
                }
            }
            // Calling login service
            loginFactory.login($scope.loginInfo);
        };

        $scope.register = function () {
            $('#signUpForm').removeClass('hidden');
            loginFactory.register($scope.userInfo);
            $('#signUpForm').addClass('hidden');
        };
        
        $scope.logout = function () {
            loginFactory.logout();
        };
    };
    
    angular.module('WorldInsight').controller('loginController', loginController);
    
    loginController.$inject = ['$window', '$scope', 'loginFactory'];
}());

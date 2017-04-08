(function () {
    'use strict';
    angular.module('WorldInsight')
        
        .controller('loginController',  ['$window', '$scope', 'loginFactory', function ($window, $scope, loginFactory) {
            var init = (function () {
                // Scroll to top of page
                $window.scrollTo(0, 0);
            }());
            
            $scope.login = function (element) {
                var indexPage = false;
                if (element.target.id) {
                    $('#signIn').removeClass('hidden');
                    indexPage = true;
                } else {
                $('#signInForm').removeClass('hidden');
                }
                
                loginFactory.login().save({}, $scope.loginInfo)
                    .$promise.then(
                        function (response) {
                            alert(response.status);
                            if (indexPage) {
                            $('#signIn').addClass('hidden');
                            } else {
                            $('#signInForm').addClass('hidden');
                            }
                        },
                        function (response) {
                            alert(response.data.err.message);
                            if (indexPage) {
                            $('#signIn').addClass('hidden');
                            } else {
                            $('#signInForm').addClass('hidden');
                            }
                        }
                    );
            };

            $scope.register = function () {
                $('#signUpForm').removeClass('hidden');
                loginFactory.register().save($scope.userInfo)
                        .$promise.then(
                        function (response) {
                            alert(response.status);
                            $('#signUpForm').addClass('hidden');
                        },
                        function (response) {
                            alert(response.data.err.message);
                            $('#signUpForm').addClass('hidden');
                        }
                    );
            };
        }]);
    
}());
(function () {
    'use strict';
      
    var forgotPasswordController =  function ($scope, $location, loginFactory) {
        
        $scope.resetPassword = function () {
            const resetToken = $location.$$url.split('/forgetPassword/');
            loginFactory.resetPassword().update({
                'token': resetToken[1]
            }, $scope.updatePassword).$promise.then(function (response) {
                $("#passwordReset").modal('hide');
                alert(response.message);
            }, function (response) {
                $("#passwordReset").modal('hide');
                context = {
                    errormessage: 'Fail to Update Password. ',
                    responseMessage: response.data.message
                };
            });
        };

        var init = (function () {
            if(window.location.pathname.includes('/forgetPassword')) {
                $("#passwordReset").modal();
            }
        }());
    };
      
    angular.module('WorldInsight').controller('forgotPasswordController', forgotPasswordController);
    forgotPasswordController.$inject = ['$scope','$location','loginFactory'];

}());

(function () {
    'use strict';
      
    var forgotPasswordController =  function ($scope, $location,ngDialog, loginFactory) {
        
        var context = null;

        $scope.resetPassword = function () {
            const resetToken = $location.$$url.split('/forgetPassword/');
            loginFactory.resetPassword().update({
                'token': resetToken[1]
            }, $scope.updatePassword).$promise.then(function (response) {
                $("#passwordReset").modal('hide');
                context = {
                        message: 'Password Reset Status:',
                        responseMessage: response.message
                    };
                    rendered = WorldInsight.templates.responseDialog(context);
                    ngDialog.openConfirm({template: rendered, plain: 'true'});
            }, function (response) {
                $("#passwordReset").modal('hide');
                context = {
                    message: 'Fail to Update Password. ',
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
    forgotPasswordController.$inject = ['$scope','$location','ngDialog','loginFactory'];

}());

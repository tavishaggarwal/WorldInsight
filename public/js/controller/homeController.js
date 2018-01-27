(function () {
    'use strict';
      
    var homeController =  function ($window, postFactory) {
        var context = null, rendered = null;
        
        var init = (function () {
            // Scroll to top of page
            $window.scrollTo(0, 0);
        }());
        
        postFactory.getPosts().query()
            .$promise.then(
                function (response) {
                    context = {post: response};
                    rendered = WorldInsight.templates.post(context);
                    $('#post').html(rendered);
                }, 
                function (response) {
                    context =
                        {
                            message: 'Unable to display Posts',
                            responseMessage: response.data.message
                        };
                    rendered = WorldInsight.templates.responseDialog(context);
                    ngDialog.openConfirm({ template: rendered, plain: 'true'});
                }
            );
    };
      
    angular.module('WorldInsight').controller('homeController', homeController);
    
    homeController.$inject = ['$window', 'postFactory'];
}());

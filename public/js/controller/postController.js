(function () {
    'use strict';
      
    var postController =  function ($window, postFactory) {
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
                }
            );
    };
      
    angular.module('WorldInsight').controller('postController', postController);
    
    postController.$inject = ['$window', 'postFactory'];
}());

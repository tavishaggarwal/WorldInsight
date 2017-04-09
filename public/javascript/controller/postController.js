(function () {
    'use strict';
    angular.module('WorldInsight').controller('postController', ['$window', function ($window) {
        var init = (function () {
            // Scroll to top of page
            $window.scrollTo(0, 0);
            
            var template = $('#postTemplate').html();
            // Compile the template data into a function
            var templateScript = Handlebars.compile(template);
            var context = { "name" : "Posts", "occupation" : "Testing handlebar" };
            var html = templateScript(context);
            $("#post").append(html);
        }());
    }]);
}());
(function () {
    'use strict';
    angular.module('WorldInsight').controller('postController', ['$window', function ($window) {
        var init = (function () {
            // Scroll to top of page
            $window.scrollTo(0, 0);
            getTemplateAjax("../templates/post-template.handlebars"); 
        }());
    }]);
}());

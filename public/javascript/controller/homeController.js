(function () {
    'use strict';
    angular.module('WorldInsight').controller('homeController', ['$window', function ($window) {
        var init = (function () {
            // Scroll to top of page
            $window.scrollTo(0, 0);
            var context = {
                post: [
                    { title: 'The quick brown fox jumps over the lazy dog.  The quick brown fox jumps over the lazy dog.  The quick brown fox jumps over the lazy dog.  The quick brown fox jumps over the lazy dog.  The quick brown fox jumps over the lazy dog.', description: 'The quick brown fox jumps over the lazy dog.  The quick brown fox jumps over the lazy dog.  The quick brown fox jumps over the lazy dog.  The quick brown fox jumps over the lazy dog.  The quick brown fox jumps over the lazy dog.' },
                    { title: 'Peter', description: 'Griffin' },
                    { title: 'Eric', description: 'Cartman' }
                ]
            };
            var rendered = WorldInsight.templates.post(context);
            $('#post').html(rendered);
        }());
    }]);
}());
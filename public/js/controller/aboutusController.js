(function () {
    'use strict';
    
    var aboutusController = function ($window) {
        var init = (function () {
            // Set height of background image
            $('.aboutus').height(screen.height - 20);
            
            // Scroll to top of page
            $window.scrollTo(0, 0);
        }()); 
    };
    
    angular.module('WorldInsight').controller('aboutusController', aboutusController);
    
    aboutusController.$inject = ['$window'];
}());
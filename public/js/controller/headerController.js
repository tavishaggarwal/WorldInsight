(function () {
    'use strict';
    
    var headerController = function () {
        // Closes the sidebar menu
        $("#menu-close").click(function (e) {
            e.preventDefault();
            $("#sidebar-wrapper").toggleClass("active");
        });
    
    // Opens the sidebar menu
        $("#menu-toggle").click(function (e) {
            e.preventDefault();
            $("#sidebar-wrapper").toggleClass("active");
        });
    };
    
    angular.module('WorldInsight').controller('headerController', headerController);
    
   // headerController.$inject = [''];
}());

//#to-top button appears after scrolling
var fixed = false;
$(document).scroll(function () {
    'use strict';
    if ($(this).scrollTop() > 250) {
        if (!fixed) {
            fixed = true;
            $('#to-top').show("slow", function () {
                $('#to-top').css({
                    position: 'fixed',
                    display: 'block'
                });
            });
        }
    } else {
        if (fixed) {
            fixed = false;
            $('#to-top').hide("slow", function () {
                $('#to-top').css({
                    display: 'none'
                });
            });
        }
    }
});
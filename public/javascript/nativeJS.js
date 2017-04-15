// Closes the sidebar menu
    $("#menu-close").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });
    // Opens the sidebar menu
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });
    // Scrolls to the selected menu item on the page

    //#to-top button appears after scrolling
    var fixed = false;
    $(document).scroll(function() {
        if ($(this).scrollTop() > 250) {
            if (!fixed) {
                fixed = true;
                // $('#to-top').css({position:'fixed', display:'block'});
                $('#to-top').show("slow", function() {
                    $('#to-top').css({
                        position: 'fixed',
                        display: 'block'
                    });
                });
            }
        } else {
            if (fixed) {
                fixed = false;
                $('#to-top').hide("slow", function() {
                    $('#to-top').css({
                        display: 'none'
                    });
                });
            }
        }
    });

var getTemplateAjax = function (path) {
    $http = angular.injector(["ng"]).get("$http");
    $http({
      method: 'GET',
      url: path
    }).then(function successCallback(response) {
    source = response.data;
                    templateScript = Handlebars.compile(source);
                    // Replace context with the get call to the server
                    context = {
                        post: [
                            { title: 'The quick brown fox jumps over the lazy dog.  The quick brown fox jumps over the lazy dog.  The quick brown fox jumps over the lazy dog.  The quick brown fox jumps over the lazy dog.  The quick brown fox jumps over the lazy dog.', description: 'The quick brown fox jumps over the lazy dog.  The quick brown fox jumps over the lazy dog.  The quick brown fox jumps over the lazy dog.  The quick brown fox jumps over the lazy dog.  The quick brown fox jumps over the lazy dog.' },
                            { title: 'Peter', description: 'Griffin' },
                            { title: 'Eric', description: 'Cartman' },
                            { title: 'Kenny', description: 'McCormick' },
                            { title: 'Bart', description: 'Simpson' }
                        ]
                    };
                    var html = templateScript(context);
                    $("#post").append(html);
      }, function errorCallback(response) {
            console.log(response);
      });
};
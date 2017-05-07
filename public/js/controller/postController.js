(function () {
    'use strict';
      
    var postController =  function ($scope, $window, ngDialog, postFactory, loginFactory) {
        var context = null, rendered = null, topPostRendered = null, topPostArray = [], topPost = {};
        $scope.loggedIn = false;
        $scope.newPost = {};
        
        var init = (function () {
            // Scroll to top of page
            $window.scrollTo(0, 0);
        }());
      
        $scope.getPosts = function () {
            topPostArray = []; topPost = {};
        postFactory.getPosts().query()
            .$promise.then(
                function (response) {
                    context = {post: response};
                     $.each(context.post.slice(0,3), function(i, data) {
             topPostArray.push(data);
        });
                    topPost = {post: topPostArray};
                    topPostRendered = WorldInsight.templates.post(topPost);
                    rendered = WorldInsight.templates.post(context);
                    $('#post').html(rendered);
                    $('#topPost').html(topPostRendered);
                }
            );
        }
        
        if (loginFactory.isAuthenticated()) {
            $scope.loggedIn = true;
        }
        
        $scope.addPost = function() {
            $scope.newPost.imageLocation = $('#postImage').val().replace(/C:\\fakepath\\/i, '');
            postFactory.addPosts().save($scope.newPost)
            .$promise.then(
                function (response) {
                    $scope.newPost = {};
                    alert('Post Added Successfully');
                    $scope.getPosts();
                },
                function (response) {
                    context =
                                {
                                    errormessage: 'Fail to Add post. ',
                                    responseMessage:'Please try again after some time',
                                    responseData: 'Error Code: ' + response.status
                                };
                            rendered = WorldInsight.templates.failure(context);
                            ngDialog.openConfirm({ template: rendered, plain: 'true'});
                }
                );
};
        }
      
    angular.module('WorldInsight').controller('postController', postController);
    
    postController.$inject = ['$scope', '$window','ngDialog', 'postFactory', 'loginFactory'];
}());

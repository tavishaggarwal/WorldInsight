(function() {
    'use strict';

    var postController = function($scope, $window, ngDialog, postFactory, loginFactory) {
        var context = null
          , rendered = null
          , topPostRendered = null
          , topPostArray = []
          , topPost = {}
          , noPost = "<h3>No post posted</h3>";
        $scope.loggedIn = false;
        $scope.newPost = {};

        var init = (function() {
            // Scroll to top of page
            $window.scrollTo(0, 0);
        }());

        $scope.getPosts = function() {
            topPostArray = [];
            topPost = {};
                postFactory.getPosts().query().$promise.then(function(response) {
                context = {
                    post: response
                };
                    
                if (context.post.length) {
                    $.each(context.post.slice(0, 5), function(i, data) {
                        topPostArray.push(data);
                    });

                    topPost = {
                        post: topPostArray
                    };
                    
                    topPostRendered = WorldInsight.templates.post(topPost);
                    rendered = WorldInsight.templates.post(context);
                    $('#post').html(rendered);
                    $('#topPost').html(topPostRendered);
                    
                    if(loginFactory.isAuthenticated() && !$('#topPost').length) {
                        $('.editPostIcon').removeClass('hidden');           
                    } else {
                        $('.editPostIcon').addClass('hidden'); 
                    }
                    editPost();
                } else {
                    $('#post').html(noPost);
                    $('#topPost').html(noPost);
                }
            });
        }

        if (loginFactory.isAuthenticated()) {
            $scope.loggedIn = true;
        }

        $scope.addPost = function() {
            $scope.newPost.imageLocation = $('#postImage').val().replace(/C:\\fakepath\\/i, '');
            $scope.newPost.postedBy = loginFactory.getUsername();
            postFactory.addPosts().save($scope.newPost).$promise.then(function(response) {
                $scope.newPost = {};
                alert('Post Added Successfully');
                $scope.getPosts();
            }, function(response) {
                context = {
                    errormessage: 'Fail to Add post. ',
                    responseMessage: 'Please try again after some time',
                    responseData: 'Error Code: ' + response.status
                };
                rendered = WorldInsight.templates.failure(context);
                ngDialog.openConfirm({
                    template: rendered,
                    plain: 'true'
                });
            });
        }
        ;

        $scope.updatePost = function() {
            var id = $scope.newPost._id;
            $scope.newPost.postedBy = loginFactory.getUsername();
            postFactory.editPosts().update({
                'id': id
            }, $scope.newPost).$promise.then(function(response) {
                $scope.newPost = response;
                $('#editPost').prop('disabled', true);
                $('#addPost').prop('disabled', false);
                $scope.getPosts();
            }, function(response) {
                context = {
                    errormessage: 'Fail to Edit post. ',
                    responseMessage: 'Please try again after some time',
                    responseData: 'Error Code: ' + response.status
                };
                rendered = WorldInsight.templates.failure(context);
                ngDialog.openConfirm({
                    template: rendered,
                    plain: 'true'
                });
            });
        }
        ;

        var editPost = function() {
            $(".editbox").click(function() {
                $('#addPost').prop('disabled', true);
                var postID = $(this).data('id');
                postFactory.getPostsByID().get({
                    'id': postID
                }).$promise.then(function(response) {
                    $scope.newPost = response;
                    $('#editPost').prop('disabled', false);
                }, function(response) {
                    context = {
                        errormessage: 'Fail to Edit post. ',
                        responseMessage: 'Please try again after some time',
                        responseData: 'Error Code: ' + response.status
                    };
                    rendered = WorldInsight.templates.failure(context);
                    ngDialog.openConfirm({
                        template: rendered,
                        plain: 'true'
                    });
                });
            });
        };
    }

    angular.module('WorldInsight').controller('postController', postController);

    postController.$inject = ['$scope', '$window', 'ngDialog', 'postFactory', 'loginFactory'];
}());

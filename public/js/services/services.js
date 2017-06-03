(function () {
    'use strict';
    angular.module('WorldInsight')
        .factory('loginFactory', ['$resource', '$http', '$rootScope', '$window', 'ngDialog', function ($resource, $http, $rootScope, $window, ngDialog) {
            
            var TOKEN_KEY = 'Token',
                isAuthenticated = false,
                username = '',
                displayname = '',
                authToken,
                login = {},
                context = null,
                rendered = null;
             
            var useCredentials = function (credentials) {
                isAuthenticated = true;
                displayname = credentials.displayname;
                username = credentials.username;
                authToken = credentials.token;
                // Set the token as header for your requests!
                $http.defaults.headers.common['x-access-token'] = authToken;
            };
            
            var loadUserCredentials = function () {
                var credentials = JSON.parse($window.localStorage.getItem(TOKEN_KEY));
                if (credentials) {
                    if (undefined !== credentials.username) {
                        useCredentials(credentials);
                    }
                }
            };
                
            var storeUserCredentials = function (credentials) {
                $window.localStorage.setItem(TOKEN_KEY, JSON.stringify(credentials));
                useCredentials(credentials);
            };

            var destroyUserCredentials =  function () {
                authToken = undefined;
                username = '';
                isAuthenticated = false;
                $http.defaults.headers.common['x-access-token'] = authToken;
                $window.localStorage.clear();
            };
            
            login.login = function (loginData) {
                $resource('/users/login/').save(loginData)
                    .$promise.then(
                        function (response) {
                            storeUserCredentials({username: response.username, displayname:response.displayname, token: response.token});
                                             $('#signUpForm').addClass('hidden');
                                             $window.location.href = '/posts';
                                            },
                        function (response) {
                            isAuthenticated = false;
                            context =
                                {
                                    errormessage: 'Login Unsuccessful',
                                    responseMessage: response.data.err.message,
                                    responseData: response.data.err.name
                                };
                            rendered = WorldInsight.templates.failure(context);
                            ngDialog.openConfirm({ template: rendered, plain: 'true'});
                            $('#signIn, #signInForm').addClass('hidden');
                        }
                    );
            };
            
            login.register = function (registerData) {
                $resource('/users/register').save(registerData)
                        .$promise.then(
                        function (response) {
                            alert(response.status);
                            $('#signUpForm').addClass('hidden');
                        },
                        function (response) {
                            context =
                                {
                                    errormessage: 'Fail to Register. Please try again after some time',
                                    responseMessage: response.data.err.message,
                                    responseData: response.data.err.name
                                };
                            rendered = WorldInsight.templates.failure(context);
                            ngDialog.openConfirm({ template: rendered, plain: 'true'});
                            $('#signUpForm').addClass('hidden');
                        }
                    );
            };
            
            login.forgotPassword = function(forgotUsername) {
                $resource('/users/forgetPassword').save(forgotUsername)
                    .$promise.then(
                        function (response) {
                            $("#passwordResetRequest").modal('hide');
                            alert(response.status);
                        },
                        function (response) {
                            $("#passwordResetRequest").modal('hide');
                            context =
                                {
                                    errormessage: 'Fail to ResetPassword. Please try again after some time',
                                    responseMessage: response.data.message,
                                    responseData: response.data.name
                                };
                            rendered = WorldInsight.templates.failure(context);
                            ngDialog.openConfirm({ template: rendered, plain: 'true'});
                        }
                    );
            };

            login.resetPassword = function() {
                return $resource('/users/forgetPassword/:token',{id:'@token'},{'update': { method:'PUT' }})
            };

            login.logout = function () {
                $resource('/users/logout/')
                    .get(function (response) {});
                destroyUserCredentials();
            };
            
            loadUserCredentials();
            
            login.isAuthenticated = function () {
                return isAuthenticated;
            };
    
            login.getDisplayname = function () {
                return displayname;
            };
            
            login.getUsername = function () {
                return username;
            };
            
            return login;
        }])
    
            .factory('postFactory', ['$resource', function ($resource) {
            var posts = {};
            
            posts.getPosts = function () {
                return $resource('/post');
            };
            
            posts.getPostsByID = function () {
                return $resource('/post/:id', {id:'@id'});
            };
                
            posts.addPosts = function () {
                return $resource('/post/add');
            };
                
            posts.editPosts = function () {
                return $resource('/post/edit/:id', {id:'@id'},{'update': { method:'PUT' }});
            };

            posts.deletePosts = function () {
                return $resource('/post/delete/:id', {id:'@id'},{'delete': { method:'DELETE' }});
            };
            
            return posts;
        }]);
}());
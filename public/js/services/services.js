(function () {
    'use strict';
    angular.module('WorldInsight')
        .factory('loginFactory', ['$resource', '$http', '$rootScope', '$window', 'ngDialog', function ($resource, $http, $rootScope, $window, ngDialog) {
            
            var TOKEN_KEY = 'Token',
                isAuthenticated = false,
                username = '',
                authToken,
                login = {},
                context = null,
                rendered = null;
            
            var useCredentials = function (credentials) {
                isAuthenticated = true;
                username = credentials.username;
                authToken = credentials.token;
                // Set the token as header for your requests!
                $http.defaults.headers.common['x-access-token'] = authToken;
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
                        function (response) {  storeUserCredentials({username: loginData.username, token: response.token});
                            $rootScope.$broadcast('login:Successful');
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
                        }
                    );
            };
            
            login.register = function (registerData) {
                $resource('/users/register').save(registerData)
                        .$promise.then(
                        function (response) {
                            login.login({username: registerData.username, password: registerData.password});
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
                        }
                    );
            };
            
            login.logout = function () {
                $resource('/users/logout/')
                    .get(function (response) {});
                destroyUserCredentials();
            };
            return login;
        }])
    
            .factory('postFactory', ['$resource', function ($resource) {
            var posts = {};
            
            posts.getPosts = function () {
                return $resource('/post');
            };
            
            posts.addPosts = function () {
                return $resource('/post/add');
            };
            
            return posts;
        }]);
}());
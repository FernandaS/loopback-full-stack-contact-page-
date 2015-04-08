/**
 * Created by fsilva on 3/27/15.
 */
var app = angular.module('ContactManager', ['ngRoute', 'ngResource', 'lbServices']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/contacts', {
            templateUrl: 'js/views/contacts.list.html',
            controller: 'ContactsController'
        })
        .when('/contacts/edit/:id', {
            templateUrl: 'js/views/contacts.edit.html',
            controller: 'ContactsEditController',
            resolve: {
                editContact: function(Contacts, $route){
                    return Contacts.findById({id: $route.current.params.id});

                }
            }
        })
        .when('/contacts/search',{
            templateUrl: 'js/views/search.results.html',
            controller: 'SearchResultsController'
        })
        .when('/login',{
            templateUrl: "js/views/user.auth.html"
        })
        .otherwise({
            redirectTo: '/contacts'
        });


});

app.config(function($httpProvider){
    $httpProvider.interceptors.push(function($q, $location){
        return {
            responseError: function(rejection){
                if (rejection.status === 401){

                    // Same as the conditional statement below
                    $location.nextAfterLogin = ($location.path() !== "/login") ? $location.path() : null;

                    // Same as the conditional statement above
//                    if ($location.path() !== "/login") {
//                        $location.nextAfterLogin = $location.path();
//                    } else {
//                        $location.nextAfterLogin = null;
//                    }

                    console.log($location.nextAfterLogin);
                    console.log("Sending user to login...");
                    $location.path('/login');
                }
                return $q.reject(rejection);
            }
        }
    });
});

app.run(function($rootScope, AppUser) {

    // Get current user on app load
    $rootScope.currentUser = AppUser.getCurrent();
});



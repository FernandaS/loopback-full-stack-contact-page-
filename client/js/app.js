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
        .otherwise({
            redirectTo: '/contacts'
        });

});



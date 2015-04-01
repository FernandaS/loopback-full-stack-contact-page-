app.controller('ContactsEditController', function($scope, $location, Contacts, editContact) {

    //Edit Contact
//    $scope.contact = $scope.contacts[$routeParams.id]

    $scope.contact = editContact;

    $scope.editContact = function(contact){

       Contacts.upsert($scope.contact)
           .$promise
           .then(function(res){
                   $location.path('/contacts');

           })
           .catch(function(err){
               console.log(err);
           });
    };





});






//http://apidocs.strongloop.com/loopback-sdk-angular/
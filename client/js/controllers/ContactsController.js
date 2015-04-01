app.controller('ContactsController', function($scope, $location, Contacts) {

    //get all contacts

    $scope.contacts = [];

    function getContacts() {
        Contacts.find()
            .$promise
            .then(function(res) {
                $scope.contacts = res;
            });
    };

    getContacts();


    // Delete contact
    $scope.deleteContact = function (contact) {
        console.log("Deleting contact...");
        // Delete the contact using the contact id
        Contacts.delete({id: contact.id})
            .$promise
            .then(function(deleteResult) {
                window.alert("Contact '" + contact.firstName + " " + contact.lastName + "' was deleted successfully!");

                // Refresh page
                window.location.reload();
            })
            .catch(function(error) {
                window.alert("Contact '" + contact.firstName + " " + contact.lastName + "' deletion failed!!");
            });
    };




    //Add contact toggle block

    $scope.contactForm = true;
    $scope.toggle = function() {
        $scope.contactForm = !$scope.contactForm;
    }



    // Add contact
    $scope.addContact = function() {
     Contacts.create($scope.newContact)
            .$promise
            .then(function(res) {
                var message = res;
                console.log(message)
                $scope.newContact = '';
                $scope.contactForm.content.$setPristine();
                $('.focus').focus(); //JQuery hack for refocusing text input
                Contacts.find();
            })
            .catch(function(err){
             window.alert("Contact " + newContact.firtName + " " +  " was not added to contact");
             console.log(err)
         });
    }

//    Query Search
    $scope.search = function(keyword){
        $location.path('/contacts/search').search({keyword: keyword});
    };



});


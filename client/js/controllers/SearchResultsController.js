app.controller('SearchResultsController', function($scope, Contacts, $location){

//    resolve: {
        //query here is whatever :query(variable is passed in)
//        searchResults: function(Contacts, $route){
//            return  Contacts.find({
//                filter: {
//                    where: {
//                        or: [
//                            {
//                                firstName: {
//                                    //case-insensitive "i" and ".*" searches with the param not the whole name *= mean anything that matches
//                                    like: $route.current.params.query + ".*",
//                                    options: "i"
//                                }
//                            },
//                            {
//                                lastName: {
//                                    like: $route.current.params.query + ".*",
//                                    options: "i"
//                                }
//                            }
//                        ]
//                    }
//                }
//            });
//        }
//    }

    var keyword = $location.search().keyword;
    $scope.contacts = Contacts.find({
        filter: {
            where: {
                or: [
                    {
                        firstName: {
                            //case-insensitive "i" and ".*" searches with the param not the whole name *= mean anything that matches
                            like: keyword + ".*",
                            options: "i"
                        }
                    },
                    {
                        lastName: {
                            like: keyword + ".*",
                            options: "i"
                        }
                    }
                ]
            }
        }
    });
});
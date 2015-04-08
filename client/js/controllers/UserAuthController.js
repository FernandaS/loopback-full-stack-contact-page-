app.controller('UserAuthController', function($scope, AppUser, $location, $rootScope, $window, LoopBackAuth) {

    // Add resetPassword to scope
    $scope.isResetPassword = false;

    // Check for password reset
    if ($location.search().resetPassword){
        $scope.isResetPassword = true;
    }

    // Setup credentials collection
    $scope.credentials = {};

    $scope.login = function(){
        console.log("Logging in...");

        // Clear alerts
        $scope.passwordResetSuccessful = false;
        $scope.loginFailed = false;

        AppUser.login($scope.credentials)
            .$promise
            .then(function() {

                // Get current user on login
                $rootScope.currentUser = AppUser.getCurrent();

                var next = $location.nextAfterLogin || '/';
                $location.nextAfterLogin = null;
                $location.path(next);
            })
            .catch(function(err) {
                $scope.loginFailed = true;
            });

    }

    $scope.logout = function(){
        AppUser.logout()
            .$promise
            .then(function(){

                // Remove current user from scope on logout
                $rootScope.currentUser = null;

                $location.path('/login');
            });
    };

    $scope.sendPasswordResetEmail = function() {
        AppUser.resetPassword({email: $scope.email})
            .$promise
            .then(function(result){
                console.log(result);
            })
            .catch(function(err){
                console.log(err);
            });
    };

    // Reset Password
    $scope.resetPassword = function(resetdetail){

        if ($scope.credentials.password1 !== $scope.credentials.password2) {
            return $window.alert("Passwords do not match; try again!");
        }

        // Set LoopBackAuth.currentUserId to current userId
        LoopBackAuth.currentUserId = $location.search().userId;

        // Set LoopBackAuth.accessTokenId to current accessTokenId
        LoopBackAuth.accessTokenId = $location.search().accessToken;

        // Fetching the current user information
        AppUser.findById({id:$location.search().userId },function(user){

            // Set current password to new password
            //user.password = $scope.credentials.password1;

            // Persist new password
            //user.$save()
            //AppUser.prototype$updateAttributes({ id:$location.search().userId }, user)
            AppUser.updateOrCreate({id: $location.search().userId, password: $scope.credentials.password1})
                .$promise
                .then(function(response){
                    console.log("Password reset successful!");

                    // Hide password reset form, and show login form
                    $scope.isResetPassword = false;

                    $scope.passwordResetSuccessful = true;

                    // Remove password reset parameters from url
                    $location.search("resetPassword", null);
                    $location.search("accessToken", null);
                    $location.search("email", null);
                    $location.search("userId", null);
                })
                .catch(function(err){

                    // Return error if password change fails
                    $window.alert(err.data.error.message);
                    console.log(err);
                    return;
                });
        });
    };
});
(function (angular) {

    var theModule = angular.module("notesView", []);

    theModule.controller("notesViewController",
        ["$scope", "$window", "$http",
            function ($scope, $window, $http) {

                // get CategoryName
                var urlParts = $window.location.pathname.split("/");
                var categoryName = urlParts[urlParts.length - 1];

                var getCategoriesUrl = "/api/notes/" + categoryName;

                $http.get(getCategoriesUrl)
                    .then(
                    function (result) {
                        $scope.notes = result.data;
                    }
                    ,
                    function (err) {
                        console.log(err);
                    }
                );
            }])

})(window.angular)
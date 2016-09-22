var app = angular.module('spa', ['ngRoute']);
// module for let another controller use
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'homeController',
            templateUrl: 'partials/home.html'
        })
        // .when('/customers_list', {
        //     controller: 'customerController',
        //     templateUrl: '../../../views/partials/customers_list.html'
        // })

        .otherwise({
            redirectTo: '/'
        });
});
app.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});





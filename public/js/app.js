'use strict';


// Declare app level module which depends on filters, and services
angular.module('CigarDBDataCleaner', ['CigarDBDataCleaner.filters', 'CigarDBDataCleaner.services', 'CigarDBDataCleaner.directives', 'ui.bootstrap']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/brands',
                controller: IndexCtrl
            }).
            otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    }]);
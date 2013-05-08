'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('CigarDBDataCleaner.services', ['ngResource']).
    value('version', '0.1')
    .factory('CigarDomainValues', function($resource){
        return $resource('/api/cigarDomainValues', {}, {
            query: {method:'GET', isArray:false}
        })
    })
    .factory('Cigar', function($resource) {
        return $resource('/api/cigars/:id', {id: '@id'}, {
            save: {method:'PUT'},
            query: {method: 'GET', isArray: false}
        })
    });

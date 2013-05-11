'use strict';

/* Filters */

angular.module('CigarDBDataCleaner.filters', []).
    filter('interpolate', ['version', function (version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }]).
    filter('titlecase', function () {
        return function (input) {
            return input.charAt(0).toUpperCase() + input.slice(1);
        }
    })
;

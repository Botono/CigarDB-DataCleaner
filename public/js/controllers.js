'use strict';

/* Controllers */

function IndexCtrl($scope, $http, $dialog) {
    $http({method: 'GET', url: '/api/getABrand'}).
        success(function (data, status, headers, config) {
            $scope.brand = data;
            if ($scope.brand.established === 0) {
                $scope.brand.established = '';
            }
            console.log('Brand data: ' + $scope.brand.name);
            $http({method: 'GET', url: '/api/getCigarsByBrand?brand_name=' + encodeURIComponent($scope.brand.name)}).
                success(function (data, status, headers, config) {
                    $scope.cigars = data;
                    console.log('Cigar data: ' + data.data);
                }).
                error(function (data, status, headers, config) {
                    $scope.cigars = 'Error!';
                });
        }).
        error(function (data, status, headers, config) {
            $scope.brand = 'Error!';
        });
    $scope.cigarOrderProp = 'name';
    $scope.modalEdit = function (cigar) {
        var d = $dialog.dialog({modalFade: false, resolve: {cigar: function () {
                return angular.copy(cigar);
            } }}),
            modelIndex = $scope.cigars.indexOf(cigar);

        d.open('partials/edit_cigar.jade', 'EditCigarCtrl').then(function (result) {
            if (result) {
                $scope.cigars[modelIndex] = angular.copy(result);
            }
        });
    };


}
IndexCtrl.$inject = ['$scope', '$http', '$dialog'];

function EditCigarCtrl($scope, dialog, cigar, CigarDomainValues) {
    $scope.cigar = cigar;
    $scope.domainValues = CigarDomainValues.query();
    console.log($scope.domainValues);
    $scope.submit = function () {
        dialog.close($scope.cigar);
    };
    $scope.close = function () {
        dialog.close(false);
    };
}
EditCigarCtrl.$inject = ['$scope', 'dialog', 'cigar', 'CigarDomainValues'];


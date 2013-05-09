'use strict';

/* Controllers */

function IndexCtrl($scope, $http, $dialog, Cigar, Brand) {
    $scope.brand = Brand.get({}, function() {
        console.log('BRAND NAME: ' + $scope.brand.name);
        $scope.cigars = Cigar.query({brand: $scope.brand.name});
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
                console.log(JSON.stringify(result));
                $scope.cigars[modelIndex].$save();
            }
        });
    };


}
IndexCtrl.$inject = ['$scope', '$http', '$dialog', 'Cigar', 'Brand'];

function EditCigarCtrl($scope, dialog, cigar, CigarDomainValues) {
    $scope.cigar = cigar;
    $scope.domainValues = CigarDomainValues.get();
    console.log($scope.domainValues);
    $scope.submit = function () {
        dialog.close($scope.cigar);
    };
    $scope.close = function () {
        dialog.close(false);
    };
}
EditCigarCtrl.$inject = ['$scope', 'dialog', 'cigar', 'CigarDomainValues'];


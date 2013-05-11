'use strict';

/* Controllers */

function IndexCtrl($scope, $http, $dialog, Cigar, Brand) {
    $scope.brand = Brand.get({}, function () {
        console.log('BRAND NAME: ' + $scope.brand.name);
        $scope.cigars = Cigar.query({brand: $scope.brand.name});
    });

    $scope.cigarOrderProp = 'name';

    $scope.modalWindow = function (purpose, cigar) {
        var d = $dialog.dialog({
                modalFade: false,
                resolve: {
                    cigar: function () {
                        return angular.copy(cigar);
                    },
                    purpose: function () {
                        return purpose;
                    }}}),
            modelIndex = $scope.cigars.indexOf(cigar),
            modalTemplate = '';

        if (purpose == 'delete') {
            modalTemplate = 'partials/delete_cigar.jade';
        } else {
            modalTemplate = 'partials/edit_cigar.jade';
        }

        d.open(modalTemplate, 'ModalCtrl').then(function (result) {
            if (result) {
                var resultCopy = angular.copy(result);
                if (purpose == 'delete') {
                    if (!resultCopy.reason) {
                        resultCopy.reason = '';
                    }
                    $scope.cigars[modelIndex] = resultCopy;
                    $scope.cigars[modelIndex].$remove({id: resultCopy.id, reason: resultCopy.reason}, function (res) {
                        $scope.cigars.splice(modelIndex, 1);
                    }, function (res) {
                    });

                } else {
                    if (modelIndex == -1) {
                        var newCigar = {};
                        angular.extend(newCigar, resultCopy);
                        Cigar.save(newCigar, newCigar, function (res) { // I don't understand this method, but it works
                            newCigar.id = res.id;
                            $scope.cigars.push(newCigar);
                        });
                    } else {
                        $scope.cigars[modelIndex] = resultCopy;
                        $scope.cigars[modelIndex].$save();
                    }
                }
            }
        });
    };


}
IndexCtrl.$inject = ['$scope', '$http', '$dialog', 'Cigar', 'Brand'];

function ModalCtrl($scope, dialog, cigar, purpose, CigarDomainValues, $filter) {
    $scope.cigar = cigar;
    $scope.pageTitle = $filter('titlecase')(purpose) + ' Cigar';
    $scope.purpose = purpose;
    $scope.domainValues = CigarDomainValues.get();
    $scope.brandShow = ($scope.purpose == 'add') ? false : true;

    $scope.submit = function () {
        dialog.close($scope.cigar);
    };
    $scope.close = function () {
        dialog.close(false);
    };
}
ModalCtrl.$inject = ['$scope', 'dialog', 'cigar', 'purpose', 'CigarDomainValues', '$filter'];


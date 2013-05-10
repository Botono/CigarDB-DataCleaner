'use strict';

/* Controllers */

function IndexCtrl($scope, $http, $dialog, Cigar, Brand) {
    $scope.brand = Brand.get({}, function () {
        console.log('BRAND NAME: ' + $scope.brand.name);
        $scope.cigars = Cigar.query({brand: $scope.brand.name});
    });

    $scope.cigarOrderProp = 'name';
    $scope.newCigar = {};

    $scope.modalWindow = function (purpose, cigar) {
        var d = $dialog.dialog({modalFade: false, resolve: {cigar: function () {
                return angular.copy(cigar);
            } }}),
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
                    $scope.cigars[modelIndex] = resultCopy;
                    console.log('ID: ' + resultCopy.id + ' REASON: ' + resultCopy.reason);
                    $scope.cigars[modelIndex].$remove({id: resultCopy.id, reason: resultCopy.reason}, function (res) {
                        console.log('DELETE FINISHED');  // TODO $delete is not calling the callbacks
                        $scope.cigars.splice(modelIndex, 1);
                    }, function (res) {
                        console.log('DELETE ERROR?');
                    });

                } else {
                    if (modelIndex == -1) {
                        console.log('ADDING CIGAR');
                        var newCigar = new Cigar();
                        angular.extend(newCigar, resultCopy);
                        $scope.newCigar = angular.copy(newCigar);
                        newCigar.$save({}, function (res) {
                            $scope.newCigar.id = res.id;
                            $scope.cigars.push($scope.newCigar);
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

function ModalCtrl($scope, dialog, cigar, CigarDomainValues) {
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
ModalCtrl.$inject = ['$scope', 'dialog', 'cigar', 'CigarDomainValues'];


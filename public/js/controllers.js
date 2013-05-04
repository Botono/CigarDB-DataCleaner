'use strict';

/* Controllers */

function IndexCtrl($scope, $http, $dialog) {
    $http({method: 'GET', url: '/api/getABrand'}).
        success(function (data, status, headers, config) {
            $scope.brand = data.data;
            if ($scope.brand.established === 0) {
                $scope.brand.established = '';
            }
            console.log('Brand data: ' + $scope.brand.name);
            $http({method: 'GET', url: '/api/getCigarsByBrand?brand_name='+encodeURIComponent($scope.brand.name)}).
                success(function (data, status, headers, config) {
                    $scope.cigars = data.data;
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
    $scope.modalEdit = function(cigar){
        var d = $dialog.dialog({modalFade: false, resolve: {cigar: function(){ return angular.copy(cigar); } }});
        d.open('partials/edit_cigar.jade', 'EditCigarCtrl').then(function(result) {
            console.log(JSON.stringify(cigar));
            cigar = angular.copy(result);
            console.log(JSON.stringify(cigar));
        });
    };


}
IndexCtrl.$inject = ['$scope', '$http', '$dialog'];

function EditCigarCtrl($scope, dialog, cigar) {
    $scope.cigar = cigar;
    $scope.submit = function(){
        dialog.close($scope.cigar);
    };
    $scope.close = function(){
        dialog.close();
    };
}
EditCigarCtrl.$inject = ['$scope', 'dialog','cigar'];


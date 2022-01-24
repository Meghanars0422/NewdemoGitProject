(function() {
    'use strict';
    angular.module('Ananya.charts').controller('productSoldGraphController', productSoldGraphController);

    productSoldGraphController.$inject = ['$scope', '$rootScope', '$filter', 'modelDialog', 'dateConverter', 'leadsServices', 'performanceServices', '$timeout', 'appText'];
    
    function productSoldGraphController ( $scope, $rootScope, $filter, modelDialog, dateConverter, leadsServices, performanceServices, $timeout, appText) {

        // var productSoldData = {
        //     labels : ["January", "February", "March", "April", "May", "June", "July"],
        //     datasets :productDatasets
        // }
        getProductCategory();
        $scope.doughnutLables = [];
        $scope.doughnutProductDatasets = [];
        $scope.productCategoryList = [];
        var productDataPerformanceOptions = {
            responsive: true,
            maintainAspectRatio: $rootScope.maintainAspectRatio,
            title: { 
                display: true,
                text: "Product Sold Performamce Chart"
            },
            tooltips: {
                mode: 'index',
                intersect: true
            },
            scales: {
                yAxes: [{
                    type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: "left",
                    id: "y-axis-1",
                }]
            }
        }

        var doughnutProductDataPerformanceOptions = {
            responsive: true,
            maintainAspectRatio: $rootScope.maintainAspectRatio,
            title: { 
                display: true,
                text: "Product Sold Performamce Chart"
            },
            tooltips: {
                mode: 'index',
                intersect: true
            },
            onClick: doughnutProductSoldHandleClick
        }

        var doughnutProductSoldData = {
            labels : $scope.doughnutLables,
            datasets : $scope.doughnutProductDatasets
        }

        function doughnutProductSoldHandleClick(event) {
            
            var activeChartValue = $scope.doughnutProductSoldGraph.getElementsAtEvent(event);
        }


        function getProductCategory() {
            leadsServices.getProductCategory( function (response) {
                switch (response.status_code) { 
                    case 200: 
                        $scope.productCategoryList = response.ProductCategoryList;
                        _filterProductList();                   
                        break;
                    default:
                        modelDialog.alert(appText.error.serverError);
                }
            });
        }

        function _filterProductList () {
            var productDatasets = [];
            var doughnutData = [];
            for(var  i=0; i<$scope.productCategoryList.length; i++){
                var data = [];
                for(var j=0; j<7; j++ ) {
                    data.push(getRandom());
                }
                $scope.doughnutLables.push($scope.productCategoryList[i].name);
                productDatasets.push({ 
                    label: $scope.productCategoryList[i].name,
                    backgroundColor: $scope.colors[i],
                    data:  $rootScope.numbers({ count: 7, min: 0, max: 100, data: data })                 
                });
                doughnutData.push($rootScope.numbers({ count: 1, min: 0, max: 100, data: data }));
            }

            $scope.doughnutProductDatasets.push({ 
                label: 'product sold performance',
                backgroundColor: $scope.colors,
                data: doughnutData              
            });
            
            // $rootScope.generateChart('product-sold-performance-chart', 'bar', productSoldData, productDataPerformanceOptions, 'productSoldGraph');
        }

        function getRandom() {
            var num = Math.floor(10 + Math.random() * 90);
            return num;
        }

        $rootScope.generateChart('product-sold-performance-chart-doughnut', 'doughnut', doughnutProductSoldData, doughnutProductDataPerformanceOptions, 'doughnutProductSoldGraph');
    }
})();
(function () {
    'use strict';
    angular.module('Ananya.charts').directive('chartFilter', chartFilter);

    function chartFilter() {
        var directive = {
            restrict: 'E',
            templateUrl: 'modules/charts/views/chartsFilters.html',
            scope: {
                toggleFilter: '&toggleFilter',
                setFilter: '&setFilter',
                generateFilterBasedGraph: '&generateFilterbasedgraph',
                filterLabel: '=filterLabel',
                chartFilters: '=chartFilters',
                chartFilterDataObj: '=chartFilterdataobj',
                graphName: '=graphName',
                months: '=months',
                roleList: '=roleList',
                allValues: "=",
                allFinancialValues: "=",
                allHalfValues: "=",
                allPeriodsValues: "=",
                allDisplayValues: "=",
                allQuarterMonths: "=",
                setMonth: '&setMonth',
                setYear: '&setYear',
                setQuarter: '&setQuarter'
            },
            link: function (scope, element, attrs) {

                scope.previousYears = scope.allValues
                scope.financialYears = scope.allFinancialValues
                scope.halfFinancialYears = scope.allHalfValues
                scope.periods = scope.allPeriodsValues
                scope.displays = scope.allDisplayValues
                scope.quarterMonths = scope.allQuarterMonths
            }

        };
        return directive;
    }
})();
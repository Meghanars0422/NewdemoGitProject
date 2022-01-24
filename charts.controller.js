/* =========================================================
 * Module       : Charts
 * File Name    : charts.controller.js
 * Description  : Dashboard drill down graph to see performance and product details 
 * Copyright    : Copyright © 2021,
 *                Written under contract by Robosoft Technologies Pvt. Ltd.
 * ========================================================= */
(function () {
    'use strict';
    angular.module('Ananya.charts').controller('chartsCtrl', chartsCtrl);
    /* =========================================================
     * Method       : chartsCtrl.
     * Brief        : Controller for charts page.
     * Detail       : --.
     * Return       :  --.
     * =========================================================  */

    chartsCtrl.$inject = ['$scope', '$rootScope', 'chartsServices', '$filter', 'modelDialog', 'dateConverter', 'leadsServices', 'performanceServices', '$timeout', 'appText', 'chartsConstant'];

    function chartsCtrl($scope, $rootScope, chartsServices, $filter, modelDialog, dateConverter, leadsServices, performanceServices, $timeout, appText, chartsConstant) {

        $scope.productCategoryList = [];
        $scope.currentFilteredLeads = [];
        $scope.previousYears = [];
        $scope.allyears = {};
        $scope.financialYears = [];
        $scope.halfFinancialYears = [];
        $scope.quarterMonths = [];
        onloadPerformanceStats();
        $scope.colors = ["#D98880", "#D7BDE2", "#AED6F1", "#17A589", "#F9E79F", "#2874A6", "#D7DBDD", "#273746", "#5B2C6F", "#943126", "#95A5A6",
            "#9A7D0A", "#F0F3F4", "#138D75", "#1F618D", "#A04000", "#D2B4DE", "#F9E79F", "#EDBB99", "#F1C40F", "#512E5F", "#D5D8DC",
            "#85C1E9", "#D4AC0D", "#A569BD", "#2E86C1", "#78281F"
        ];

        $scope.filterLabel = {
            'performanceGraph': false,
            'topBottomGraph': false,
            'productSoldGraph': false,
        }
        $scope.chartFilterDataObj = {
            "performanceGraph": Object.assign({}, chartsConstant.filtersNameArray),
            "topBottomGraph": Object.assign({}, chartsConstant.filtersNameArray),
            "productSoldGraph": Object.assign({}, chartsConstant.filtersNameArray)
        }
        $scope.chartFilters = {
            'performanceGraph': Object.assign({}, chartsConstant.filtersNameArray),
            'topBottomGraph': Object.assign({}, chartsConstant.filtersNameArray),
            'productSoldGraph': Object.assign({}, chartsConstant.filtersNameArray),
        }
        $rootScope.leadMonthData = [
            { "month": "Jan", "leads": [] },
            { "month": "Feb", "leads": [] },
            { "month": "Mar", "leads": [] },
            { "month": "Apr", "leads": [] },
            { "month": "May", "leads": [] },
            { "month": "Jun", "leads": [] },
            { "month": "Jul", "leads": [] },
            { "month": "Aug", "leads": [] },
            { "month": "Sep", "leads": [] },
            { "month": "Oct", "leads": [] },
            { "month": "Nov", "leads": [] },
            { "month": "Dec", "leads": [] },
        ];
        $scope.roleList = chartsConstant.userRole;
        $scope.months = chartsConstant.months;
        $scope.labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        $scope.leadList = chartsConstant.leadData.lead_list;
        $scope.periods = chartsConstant.periodValues;
        $scope.displays = chartsConstant.displayValues;
        $scope.selectedItem = chartsConstant.periodValues;
        $scope.quarterMonths = chartsConstant.quarterMonths
        getyear();
        getFinancialYear();
        getHalfFinancialYear();

        function getyear() {
            var max = new Date().getFullYear(),
                min = max - 9;
            for (var i = min; i <= max; i++) {
                $scope.previousYears.push({ 'value': i })
            }
          //  $scope.previousYears.map((s, i) => s.id = i + 1);
            // console.log($scope.previousYears)
        }

        function getFinancialYear() {
            var yearsLength = 10;
            var currentYear = new Date().getFullYear();
            for (var i = 0; i < yearsLength; i++) {
                var next = currentYear + 1;
                var year = currentYear + '-' + next.toString().slice(-2);
                currentYear--;
                $scope.financialYears.push({ 'value': year })
            }
          //  $scope.financialYears.map((s, i) => s.id = i + 1);
            // console.log($scope.financialYears)
        }

        function getHalfFinancialYear() {
            var yearsLength = 10;
            var currentYear = new Date().getFullYear();
            for (var i = 0; i < yearsLength; i++) {
                var next = currentYear + 1;
                var year = 'Oct-' + currentYear.toString().slice(-2) + '--' + 'Mar-' + next.toString().slice(-2);
                var newYear = 'Apr-' + currentYear.toString().slice(-2) + '--' + 'Sep-' + currentYear.toString().slice(-2)
                $scope.halfFinancialYears.push({ 'value': year })
                $scope.halfFinancialYears.push({ 'value': newYear })
                currentYear--;
            }
           // $scope.halfFinancialYears.map((s, i) => s.id = i + 1);
            //  console.log($scope.halfFinancialYears)
        }
        // $rootScope.leadGraphOverallInfo = {
        //     "lead_generated": "",
        //     "lead_converted": "",
        //     "business_generated": "",
        //     "buisness_converted_amount": "",
        //     "lead_status_count": chartsConstant.leadData.lead_status_count
        // };

        getLeadMetaData(chartsConstant.leadData.lead_list); //overall
        setLeadGraphMonthlyData(chartsConstant.leadData.lead_list); // monthly , annually, quaterly 

        if (window.outerWidth < 500) {
            $rootScope.maintainAspectRatio = false;
        } else {
            $rootScope.maintainAspectRatio = true;
        }

        $scope.toggleFilter = function (graph) {
            $scope.filterLabel[graph] = !$scope.filterLabel[graph];
            if ($scope.filterLabel[graph]) {
                document.getElementById(graph + '-filterLabel').classList.add('active');
            } else {
                document.getElementById(graph + '-filterLabel').classList.remove('active');
            }
        }

        $scope._filterDataByZone = function () {

        }

        $scope._filterDataByRegion = function () {

        }

        $scope._filterDataBranch = function () {

        }

        $scope._filterDataByRole = function () {

        }

        $scope._filterDataByEmployee = function () {

        }

        $scope.filterDataByPeriod = function (selected) {
            console.log("click")
            console.log(selected)
            $scope.staffSelected = selected;
            console.log($scope.staffSelected)
        }
        $scope.setFilter = function (type, graphName) {
            type = angular.lowercase(type);
            console.log(type, graphName)
            console.log(typeof (type))
            switch (type) {
                case 'period':
                    $scope.chartFilters[graphName].periodSelected = !$scope.chartFilters[graphName].periodSelected;
                    if ($scope.chartFilters[graphName].periodSelected) {
                        $scope.chartFilters[graphName].displaySelected = false;
                        document.getElementById(graphName + '-period-filter').classList.add('active');
                        document.getElementById(graphName + '-display-filter').classList.remove('active');
                    } else {
                        document.getElementById(graphName + '-period-filter').classList.remove('active');
                    }
                    break;
                case 'display':
                    $scope.chartFilters[graphName].displaySelected = !$scope.chartFilters[graphName].displaySelected;
                    if ($scope.chartFilters[graphName].displaySelected) {
                        $scope.chartFilters[graphName].periodSelected = false;
                        document.getElementById(graphName + '-display-filter').classList.add('active');
                        document.getElementById(graphName + '-period-filter').classList.remove('active');
                    } else {
                        document.getElementById(graphName + '-display-filter').classList.remove('active');
                    }
                    break;
                case 'monthly':
                    console.log("inside case");
                    $scope.chartFilters[graphName].monthSelected = !$scope.chartFilters[graphName].monthSelected;
                    if ($scope.chartFilters[graphName].monthSelected) {
                        $scope.chartFilters[graphName].periodSelected = true
                        $scope.chartFilters[graphName].halfyearlySelected = false;
                        $scope.chartFilters[graphName].annuallySelected = false;
                        $scope.chartFilters[graphName].quaterlySelected = false;
                        document.getElementById(graphName + '-Monthly-filter').classList.add('active');
                        document.getElementById(graphName + '-period-filter').classList.add('active');
                        document.getElementById(graphName + '-Half-yearly-filter').classList.remove('active');
                        document.getElementById(graphName + '-Quarterly-filter').classList.remove('active');
                        document.getElementById(graphName + '-Yearly-filter').classList.remove('active');
                    } else {
                        document.getElementById(graphName + '-Monthly-filter').classList.remove('active');
                    }
                    break;
                case 'quarterly':
                    $scope.chartFilters[graphName].quaterlySelected = !$scope.chartFilters[graphName].quaterlySelected;
                    if ($scope.chartFilters[graphName].quaterlySelected) {
                        $scope.chartFilters[graphName].periodSelected = true
                        $scope.chartFilters[graphName].halfyearlySelected = false;
                        $scope.chartFilters[graphName].annuallySelected = false;
                        $scope.chartFilters[graphName].monthSelected = false;
                        document.getElementById(graphName + '-Quarterly-filter').classList.add('active');
                        document.getElementById(graphName + '-period-filter').classList.add('active');
                        document.getElementById(graphName + '-Monthly-filter').classList.remove('active');
                        document.getElementById(graphName + '-Half-yearly-filter').classList.remove('active');
                        document.getElementById(graphName + '-Yearly-filter').classList.remove('active');
                    } else {
                        document.getElementById(graphName + '-Quarterly-filter').classList.remove('active');
                    }
                    break;
                case 'half-yearly':
                    $scope.chartFilters[graphName].halfyearlySelected = !$scope.chartFilters[graphName].halfyearlySelected;
                    if ($scope.chartFilters[graphName].halfyearlySelected) {
                        $scope.chartFilters[graphName].periodSelected = true
                        $scope.chartFilters[graphName].annuallySelected = false;
                        $scope.chartFilters[graphName].quaterlySelected = false;
                        $scope.chartFilters[graphName].monthSelected = false;
                        document.getElementById(graphName + '-Half-yearly-filter').classList.add('active');
                        document.getElementById(graphName + '-period-filter').classList.add('active');
                        document.getElementById(graphName + '-Quarterly-filter').classList.remove('active');
                        document.getElementById(graphName + '-Monthly-filter').classList.remove('active');
                        document.getElementById(graphName + '-Yearly-filter').classList.remove('active');
                    } else {
                        document.getElementById(graphName + '-Half-yearly-filter').classList.remove('active');
                    }
                    break;
                case 'yearly':
                    $scope.chartFilters[graphName].annuallySelected = !$scope.chartFilters[graphName].annuallySelected;
                    if ($scope.chartFilters[graphName].annuallySelected) {
                        $scope.chartFilters[graphName].periodSelected = true
                        $scope.chartFilters[graphName].halfyearlySelected = false;
                        $scope.chartFilters[graphName].quaterlySelected = false;
                        $scope.chartFilters[graphName].monthSelected = false;
                        document.getElementById(graphName + '-Yearly-filter').classList.add('active');
                        document.getElementById(graphName + '-period-filter').classList.add('active');
                        document.getElementById(graphName + '-Quarterly-filter').classList.remove('active');
                        document.getElementById(graphName + '-Monthly-filter').classList.remove('active');
                        document.getElementById(graphName + '-Half-yearly-filter').classList.remove('active');
                    } else {
                        document.getElementById(graphName + '-Yearly-filter').classList.remove('active');
                    }
                    break;
                case '':
                    console.log("inhere")
                    $scope.chartFilters[graphName].halfyearlySelected = false
                    $scope.chartFilters[graphName].annuallySelected = false;
                    $scope.chartFilters[graphName].quaterlySelected = false;
                    $scope.chartFilters[graphName].monthSelected = false;
                    document.getElementById(graphName + '-Yearly-filter').classList.remove('active');
                    // document.getElementById(graphName + '-period-filter').classList.remove('active');
                    document.getElementById(graphName + '-Quarterly-filter').classList.remove('active');
                    document.getElementById(graphName + '-Monthly-filter').classList.remove('active');
                    document.getElementById(graphName + '-Half-yearly-filter').classList.remove('active');
                    break;

            }
        }
        $scope.yearmonth = [];
        $scope.quartermonth = [];
        var selectedmonth;
        var selectedyear;
        $scope.setMonth = function (data) {
            selectedmonth = Number(data);
            setYearMonth()
        }
        $scope.setYear = function (data) {
            $scope.yearmonth.push({ 'year': Number(data) });
           // $scope.quartermonth.push({ 'year': Number(data) });
            selectedyear = Number(data);
            setYearMonth()
           // setquarteryear();
        }
        
        var firstmonth;
        var lastmonth;
        $scope.setQuarter = function (data) {
            
            var year = 2021;
           // console.log(data);
            switch(data){
                case "0" : firstmonth = 1; lastmonth = 3;
                break;
                case "1" : firstmonth = 4; lastmonth = 6;
                break;
                case "2" : firstmonth = 7; lastmonth = 9;
                break;
                case "3" : firstmonth = 10; lastmonth = 12;
                break;

            }
            $scope.quartermonth.push({ 'firstmonth': Number(firstmonth) });
            $scope.quartermonth.push({ 'lastmonth': Number(lastmonth) });
           // var firstDay = new Date(year, firstmonth-1, 1);
          //  var lastDay = new Date(year, lastmonth, 0);
          //  console.log(firstDay)
          //  console.log(lastDay)
           // setYearMonth()
           setquarteryear()
        }
        var dateString;
        var lastDateString;
        function setYearMonth() {

            console.log(selectedmonth);
            console.log(selectedyear);
            var date = new Date();
            if(typeof selectedmonth!=='undefined' && typeof selectedyear!=='undefined'){
            var firstDay = new Date(selectedyear, selectedmonth-1, 1);
            dateString = $filter('date')(firstDay, 'd MMM yyyy'); //dd/MM/yyyy
            var lastDay = new Date(selectedyear, selectedmonth, 0);

          //  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            lastDateString = $filter('date')(lastDay, 'd MMM yyyy'); //dd/MM/yyyy

            console.log(firstDay)
            console.log(dateString)
            console.log(lastDateString)
            getyearmonth();
            }
           // console.log(lastDay)
        }
        var previousText = null;
        var previousmonth = null;
        function setquarteryear() {
           // console.log(firstmonth, selectedyear)
            var currentText = Number(selectedyear);
          //  console.log(currentText)
            var currentmonth = Number(firstmonth);
            console.log(previousText, currentText)
            if(typeof(firstmonth)!=="undefined" && typeof(selectedyear)!=="undefined"){
            if ((previousText == currentText)) {
                console.log("in")
            } else {
                console.log("out")
                var newfirstDay = new Date(selectedyear, firstmonth-1, 1);
                var newlastDay = new Date(selectedyear, lastmonth, 0);
                console.log(newfirstDay)
                console.log(newlastDay)
            }
        }
            previousText = currentText;
            previousmonth = currentmonth;
                
        }

        function getyearmonth() {
            var last = lastDateString;
            var first = dateString;
            return [(last),(first)];
        }
        $scope.generateFilterBasedGraph = function () {
            console.log("click")
            var data = getyearmonth();
            console.log(data);
            onloadPerformanceStats(data[0],data[1]);

        }
        // generate Chart...............
        $rootScope.generateChart = function (id, type, data, options, graphName) {
            setTimeout(function () {
                var ctx = document.getElementById(id).getContext("2d");
                var graph = new Chart(ctx, {
                    type: type,
                    data: data,
                    stacked: true,
                    options: options
                });

                if (graphName == "topBottomGraph") {
                    $rootScope.topBottomPerformanceGraph = graph;
                } else if (graphName == 'performanceGraph') {
                    $rootScope.performanceGraph = graph;
                } else if (graphName == 'productSoldGraph') {
                    $rootScope.productSoldGraph = graph;
                } else if (graphName == 'performanceDrilledGraph') {
                    $rootScope.performanceDrilledGraph = graph;
                    $rootScope.performanceDrilledGraph.update();
                }
                else if (graphName == 'doughnutProductSoldGraph') {
                    $scope.doughnutProductSoldGraph = graph;
                }
                // else if(graphName == ''){

                // }
                else {
                    $scope.doughnutProductSoldGraph = graph;
                }

            }, 1000);
        }
        $rootScope.numbers = function (config) {
            var cfg = config || {};
            var min = valueOrDefault(cfg.min, 0);
            var max = valueOrDefault(cfg.max, 100);
            var from = valueOrDefault(cfg.from, []);
            var count = valueOrDefault(cfg.count, 8);
            var decimals = valueOrDefault(cfg.decimals, 8);
            var continuity = valueOrDefault(cfg.continuity, 1);
            var dfactor = Math.pow(10, decimals) || 0;
            var data = [];
            var i, value;

            for (i = 0; i < count; ++i) {
                data.push(config.data[i]);
            }
            return data;
        }

        function valueOrDefault(value, defaultValue) {
            return typeof value === 'undefined' ? defaultValue : value;
        }

        function getLeadMetaData(data, graphName) {
            var leadGraphInfo = {
                "lead_generated": "",
                "lead_converted": "",
                "business_generated": "",
                "buisness_converted_amount": "",
                "lead_status_count": chartsConstant.leadData.lead_status_count
            }
            var convertedLeadCount = 0;
            var newLeadCount = 0;
            var pendingLeadCount = 0;
            var contactedLeadCount = 0;
            var inProgressLeadCount = 0;
            var closedLeadCount = 0;
            var businessGeneratedCount = 0;
            var amount = 0;
            data.forEach(function (v) {
                if (v.status == 7) { // converted
                    convertedLeadCount++;
                } else if (v.status == 1 || v.status == 2) { // open
                    newLeadCount++;
                } else if (v.status == 5) { // Pending For Approval
                    pendingLeadCount++;
                } else if (v.status == 3) { // contacted
                    contactedLeadCount++;
                } else if (v.status == 4) { // inprogress
                    inProgressLeadCount++;
                } else if (v.status == 6) { // closed
                    closedLeadCount++;
                }

                if (v.is_business_generated) {
                    businessGeneratedCount++;
                    amount = amount + (v.generated_amount);
                }
            });
            leadGraphInfo.lead_converted = convertedLeadCount;
            leadGraphInfo.lead_generated = chartsConstant.leadData.lead_list.length;
            leadGraphInfo.business_generated = businessGeneratedCount;
            leadGraphInfo.buisness_converted_amount = amount;
            leadGraphInfo.lead_status_count.open = newLeadCount;
            leadGraphInfo.lead_status_count.closed = closedLeadCount;
            leadGraphInfo.lead_status_count.pending_for_approval = pendingLeadCount;
            leadGraphInfo.lead_status_count.converted = convertedLeadCount
            leadGraphInfo.lead_status_count.contacted = contactedLeadCount;
            leadGraphInfo.lead_status_count.inprogress = inProgressLeadCount;

            return leadGraphInfo;
        }

        function setLeadGraphMonthlyData(data) {
            var currentMonth = new Date().getMonth();
            var labels = [];
            for (var i = currentMonth; i < $scope.labels.length + currentMonth; i++) {
                if (i > 11) {
                    labels.push($scope.labels[i % 12]);
                } else {
                    labels.push($scope.labels[i]);
                }
            }

            for (var i = 0; i < data.length; i++) {
                var leadMonth = new Date(data[i].preferred_date * 1000).getMonth();
                if (leadMonth) {
                    $rootScope.leadMonthData[leadMonth].leads.push(data[i]);
                }
            }
        }

        function onloadPerformanceStats(end,from) {
            var requestObj = {};
            requestObj['performance_filters'] = [];
    
            // var formatedFromDate = ($scope.filterObj.byDate.fromDate) ? dateConverter.dateToTicks(formatDate($scope.filterObj.byDate.fromDate)) : 0;
            // var formatedToDate = ($scope.filterObj.byDate.toDate) ? dateConverter.dateToTicks(formatDate($scope.filterObj.byDate.toDate)) : 0;
            
            var fromdate = (from) ? dateConverter.dateToTicks(formatDate(from)) : 0;
            var enddate = (end) ? dateConverter.dateToTicks(formatDate(end)) : 0;
            var tempObj = { 
                'filter': { 
                    'end_date': enddate,
                    'start_date': fromdate,
                },
                'filter_type': 2
            };
            requestObj['performance_filters'].push(tempObj);
            console.log(requestObj)
          //  $rootScope.generateChart('top-bottom-performance-chart', 'horizontalBar', topBottomPerformanceData, topBottomPerformanceOptions, 'topBottomGraph');
            chartsServices.filterPerformance(requestObj, function (response) {
                switch (response.status_code) {
                    case 200:
                        $scope.performance = response.performance;
                        console.log($scope.performance)
                         loadPerformanceGraph();
                        // setCircleRadious();
                    default:
                        $rootScope.hideBusyIndicator();
                        break;
                }
                //fetchBusinessCategory();
                // fetchStaffs();
            });
        }
     //   $rootScope.chageperformance();

        function formatDate(date) { 
            var month = new Date(date).getMonth() + 1;
            ///var dateObj=07-08-2016 12:39:38 pm; 17 Aug 2016
            var dateObj = date.split(' ');
            return dateObj[0] + '-' + month + '-' + dateObj[2] + ' 00:00:00 am';
        } 

        function loadPerformanceGraph() {
            console.log($scope.performance)
//            $rootScope.generateChart('top-bottom-performance-chart', 'horizontalBar', topBottomPerformanceData, topBottomPerformanceOptions, 'topBottomGraph');

        }
    }
})();

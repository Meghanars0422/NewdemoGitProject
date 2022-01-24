(function() {
    'use strict';
    angular.module('Ananya.charts').controller('performanceGraphController', performanceGraphController);

    performanceGraphController.$inject = ['$scope', '$rootScope', '$filter', 'modelDialog', 'dateConverter', 'leadsServices', 'performanceServices', '$timeout', 'appText'];

    function performanceGraphController ( $scope, $rootScope, $filter, modelDialog, dateConverter, leadsServices, performanceServices, $timeout, appText) {
        activeClickListener();
        $scope.performanceChartOptions = null;
        $scope.performanceChartBackBtnActive = false;
        $scope.activeIndex = null;
        // $scope.performanceBarGraphLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var performanceDoughnutGraphLabel = ["Lead Generated", "Lead Converted", "Business Generated"];
        
        var performanceDoughnutData = {
            labels: performanceDoughnutGraphLabel,
            datasets: [{
                label: 'Performance Graph',
                backgroundColor: ["#F9E79F", "#85C1E9", "#17A589"],
                data: [67, 43, 30]
            }]
        };
        var performanceDoughnutChartOptions = {
            responsive: true,
            title: { 
                display:true,
                text: "Lead Generated , Lead Converted & Business Generated"
            },
            tooltips: {
                mode: 'index',
                intersect: true
            },
            legend: {
                position: "right"
            }
        }
        $scope.barGraphDataSetArray = [{
            label: 'Lead Generated',
            backgroundColor: "#D4AC0D",
            data: []
        }, {
            label: 'Lead Converted',
            backgroundColor: "#85C1E9",
            data: []
        }, {
            label: 'Business Generated',
            backgroundColor: "#17A589",
            data: []
        }];

        function setPerformanceChartOption(titleText) {
            $scope.performanceChartOptions =  {
                responsive: true,
                maintainAspectRatio: $rootScope.maintainAspectRatio,
                title: { 
                    display:true,
                    text: titleText
                },
                tooltips: {
                    mode: 'index',
                    intersect: true
                },
                legend: {
                    position: "top",
                    align: "start"
                }
            }
        }

        $scope.generateFilterBasedGraph  = function(graphName) {
            var filterLeads = [];
            var _parentScope = $scope.$parent;
            var index = $scope.activeIndex;
            clearElement();
            if(_parentScope.chartFilters[graphName].monthSelected) {

                filterLeads =_parentScope.leadMonthData[_parentScope.chartFilterDataObj[graphName].monthSelected].leads;
                // var data = getLeadMetaData(filterLeads, graphName);
                var data = [];
              
                if(typeof index == 'number' || typeof index == 'string') {
                    if(index == "0") {
                        data.push(filterLeads.length);
                    } else {
                        for(var j=0; j<filterLeads.length; j++) {
                            if(index== '1') {
                                if(filterLeads[j].status == '7') {
                                    count++;
                                }
                            } else if(index == '2') {
                                if(filterLeads[j].is_business_generated) {
                                    count++;
                                }
                            }                                    
                        }
                        data.push(count);
                    }
                }
                $scope.barGraphDataSetArray[index].data = $rootScope.numbers({
                    count:1,
                    max:100,
                    min:0,
                    data: data
                });
                $scope.performanceBarData = {
                    labels:  [_parentScope.leadMonthData[_parentScope.chartFilterDataObj[graphName].monthSelected].month],
                    datasets: [$scope.barGraphDataSetArray[index]]
                };

                $rootScope.generateChart('performance-drilled-chart', 'bar', $scope.performanceBarData,  $scope.performanceChartOptions, 'performanceDrilledGraph');
            }   
            if(_parentScope.chartFilters[graphName].annuallySelected) {
                var data = [];
                if(typeof index == 'number' || typeof index == 'string') {
                    for(var i=0; i<_parentScope.labels.length; i++) {
                        var count = 0
                        var leads = _parentScope.leadMonthData[i].leads;
                        if(index==0){
                            data.push(leads.length);
                        } else { 
                            var count = 0;
                            var leads = _parentScope.leadMonthData[i].leads;
                            for(var j=0; j<leads.length; j++) {
                                if(index== '1') {
                                    if(leads[j].status == '7') {
                                        count++;
                                    }
                                } else if(index == '2') {
                                    if(leads[j].is_business_generated) {
                                        count++;
                                    }
                                }                                    
                            }
                            data.push(count);
                        }
                    }
                    $scope.barGraphDataSetArray[index].data = $rootScope.numbers({
                        count:12,
                        max:100,
                        min:0,
                        data: data
                    });
                    $scope.performanceBarData = {
                        labels:  _parentScope.labels,
                        datasets: [$scope.barGraphDataSetArray[index]]
                    };
                    $rootScope.generateChart('performance-drilled-chart', 'bar', $scope.performanceBarData,  $scope.performanceChartOptions, 'performanceDrilledGraph');
                } else {
                    
                }
            }
            if(_parentScope.chartFilters[graphName].quaterlySelected) {
                var data = [];
                var label = [];
                if(typeof index == 'number' || typeof index == 'string') {
                    for(var i=0; i<_parentScope.labels.length; i += 3) {
                        var count = 0
                        leads = [];
                        var labelString = "" ;
                        for(var k=i; k<i+3; k++){
                            Array.prototype.push.apply(leads, _parentScope.leadMonthData[k].leads);
                            labelString += _parentScope.labels[k]+", ";
                        }
                        label.push(labelString);
                        if(index==0){
                            data.push(leads.length);
                        } else { 
                            var count = 0;
                            for(var j=0; j<leads.length; j++) {
                                if(index== '1') {
                                    if(leads[j].status == '7') {
                                        count++;
                                    }
                                } else if(index == '2') {
                                    if(leads[j].is_business_generated) {
                                        count++;
                                    }
                                }                                    
                            }
                            data.push(count);
                        }
                    }
                    $scope.barGraphDataSetArray[index].data = $rootScope.numbers({
                        count:3,
                        max:100,
                        min:0,
                        data: data
                    });
                    $scope.performanceBarData = {
                        labels: label,
                        datasets: [$scope.barGraphDataSetArray[index]]
                    };
                    $rootScope.generateChart('performance-drilled-chart', 'bar', $scope.performanceBarData,  $scope.performanceChartOptions, 'performanceDrilledGraph');
                } else {
                    
                }
            }
            if(_parentScope.chartFilters[graphName].overall) {
                var data = [];
                if(typeof index == 'number' || typeof index == 'string') {
                    for(var i=0; i<_parentScope.labels.length; i++) {
                        var count = 0
                        var leads = _parentScope.leadMonthData[i].leads;
                        if(index==0){
                            data.push(leads.length);
                        } else { 
                            var count = 0;
                            var leads = _parentScope.leadMonthData[i].leads;
                            for(var j=0; j<leads.length; j++) {
                                if(index== '1') {
                                    if(leads[j].status == '7') {
                                        count++;
                                    }
                                } else if(index == '2') {
                                    if(leads[j].is_business_generated) {
                                        count++;
                                    }
                                }                                    
                            }
                            data.push(count);
                        }
                    }
                    $scope.barGraphDataSetArray[index].data = $rootScope.numbers({
                        count:12,
                        max:100,
                        min:0,
                        data: data
                    });
                    $scope.performanceBarData = {
                        labels:  _parentScope.labels,
                        datasets: [$scope.barGraphDataSetArray[index]]
                    };
                    $rootScope.generateChart('performance-drilled-chart', 'bar', $scope.performanceBarData,  $scope.performanceChartOptions, 'performanceDrilledGraph');
                } else {
                    
                }
            }
            if(_parentScope.chartFilters[graphName].zoneSelected) {

            }
            if(_parentScope.chartFilters[graphName].regionSelected) {

            }
            if(_parentScope.chartFilters[graphName].branchSelected) {

            }
            if(_parentScope.chartFilters[graphName].roleSelected) {

            }
            if(_parentScope.chartFilters[graphName].employeeSelected) {

            }
        }

        $scope.showPerformanceDoughnutChart = function() {
            // clearElement();
            $rootScope.generateChart('performance-chart', 'doughnut', performanceDoughnutData, performanceDoughnutChartOptions, 'performanceGraph');
            $scope.performanceChartBackBtnActive = false;
            activeClickListener();
        }

        $scope.$on('overAllperformanceGraph', function(){
            $scope.generateFilterBasedGraph('performanceGraph');
        });

        $scope.$on('annuallyperformanceGraph', function(){
            $scope.generateFilterBasedGraph('performanceGraph');
        });

        $scope.$on('quaterlyperformanceGraph', function(){
            $scope.generateFilterBasedGraph('performanceGraph');
        });


        function setPerformanceBarData(labelIndex) {
            clearElement();
            $scope.activeIndex = labelIndex;
            $scope.generateFilterBasedGraph('performanceGraph');
            $scope.performanceChartBackBtnActive = true;
        }

        function clearElement() {
            document.getElementById('performance-drilled-chart').remove();
            document.getElementById('performance-drilled-chart-container').childNodes.forEach(function(ele){
                if(ele.className == 'chartjs-hidden-iframe'){
                    ele.remove();
                }
            });
            var ele = document.createElement('canvas');
            ele.id= "performance-drilled-chart";
            document.getElementById('performance-drilled-chart-container').prepend(ele);
        } 

        function activeClickListener() {
            document.getElementById('performance-chart').onclick = function(e) {
                var index = $rootScope.performanceGraph.getElementAtEvent(e)[0]._index;
                $scope.activeIndex = index;
                var titleText = performanceDoughnutGraphLabel[index];
                setPerformanceChartOption(titleText);
                setPerformanceBarData(index);
            }
        }

        $rootScope.generateChart('performance-chart', 'doughnut', performanceDoughnutData, performanceDoughnutChartOptions, 'performanceGraph');
    }

})();
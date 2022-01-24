(function() {
    'use strict';
    angular.module('Ananya.charts').controller('topBottomGraphController', topBottomGraphController);

    topBottomGraphController.$inject = ['$scope', '$rootScope', 'chartsServices', 'exportFactory', '$filter', 'modelDialog', 'dateConverter', 'leadsServices', 'performanceServices', '$timeout', 'appText'];
    
    function topBottomGraphController ( $scope, $rootScope, chartsServices, exportFactory, $filter, modelDialog, dateConverter, leadsServices, performanceServices, $timeout, appText) {
        $scope.topBottomGraph = {
            value : true
        }
        var topBottomPerformanceData = { 
            labels: ["Category1", "Category2", "Category3", "Category4", "Category5", "Category6"],
            datasets: [{
				label: 'Target Count',
				backgroundColor: "blue",
				data:[1,400,600,695,295,455],
			}, {
				label: 'Actual Count',
				backgroundColor: "grey",
				data:[1,250,100,150,400,500],
			}
            , {
				label: 'Target Amount',
				backgroundColor: "yellow",
				position: "right",
				data:[2.33,223,424,204,242, 434],
			},
			{
				label: 'Actual Amount',
				backgroundColor: "pink",
				position: "right",
				data:[1.23,134,24,124,42, 134],
            }
        ]
        };

        var topBottomPerformanceOptions = {                        
            indexAxis : 'Y',
            responsive: true,
            maintainAspectRatio: $rootScope.maintainAspectRatio ,
            title: { 
                display:true,
                text:"MO Performance"
            },
            tooltips: {
                mode: 'index',
                intersect: true
            },
            scales: {
                xAxes: [{
                  stacked: false,
                  scaleLabel: {
                    display: true,
                    labelString: 'Lakhs'
                  },
                }],
                yAxes: [{
                  stacked: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Product Category'
                  },
                  ticks: {
                    suggestedMin: 0,
                    suggestedMax: 10
                  }
                }]
              }
        }

        // $scope.changePerformane = function() {
        //    // onloadPerformanceStats();
		// 	changeTopBottomPerformanceDataSet();
		// }
       
        function changeTopBottomPerformanceDataSet(){
            var datasets = [];
            console.log($scope.performance)
            // if($scope.topBottomGraph.value == true){
            //     $rootScope.topBottomPerformanceGraph.data.datasets =  [{
            //         label: 'Target Count',
            //         backgroundColor: "blue",
            //         data:[300,400,600,695,295,455],
            //     }, {
            //         label: 'Actual Count',
            //         backgroundColor: "grey",
            //         data:[600,250,100,150,400,500],
            //     }
            //     , {
            //         label: 'Target Amount',
            //         backgroundColor: "yellow",
            //         position: "right",
            //         data:[213,223,424,204,242, 434],
            //     },
            //     {
            //         label: 'Actual Amount',
            //         backgroundColor: "pink",
            //         position: "right",
            //         data:[123,134,24,124,42, 134],
            //     }
            // ];
            //     $rootScope.topBottomPerformanceGraph.update();
                
            // } else {
                // setTimeout(function(){
                $rootScope.topBottomPerformanceGraph.data.datasets = [{
                    label: 'Target Count',
                        backgroundColor: "blue",
                        data:[$scope.performance.lead_creation_target,400,600,695,295,455],
                    }, {
                        label: 'Actual Count',
                        backgroundColor: "grey",
                        data:[$scope.performance.lead_created,250,100,150,400,500],
                    }
                    , {
                        label: 'Target Amount',
                        backgroundColor: "yellow",
                        position: "right",
                        data:[33,13,104,54,42, 34],
                    },
                    {
                        label: 'Actual Amount',
                        backgroundColor: "pink",
                        position: "right",
                        data:[23,34,24,24,12, 34],
                    }
                ];              
                $rootScope.topBottomPerformanceGraph.update();
                // },1000);
           // }	
		}
      
        $scope.export = function() {
           // modelDialog.confirm("Do you wants to export the all leads?", function(data) {
                var obj = [];
                var targetvalue = [];
                var actualvalue =[];
                var targetamount =[];
                var actualamount =[]
                console.log(topBottomPerformanceData)
                for(var i=0; i<$rootScope.topBottomPerformanceGraph.data.datasets.length; i++) {
                    for(var j=0; j<$rootScope.topBottomPerformanceGraph.data.datasets[i].data.length;j++){
                        if($rootScope.topBottomPerformanceGraph.data.datasets[i].label === 'Target Count') {
                           // console.log($rootScope.topBottomPerformanceGraph.data.datasets[i].data[i])
                            // targetvalue.push({
                            //   "target":  $rootScope.topBottomPerformanceGraph.data.datasets[i].data[j]
                            // }) 
                            targetvalue.push($rootScope.topBottomPerformanceGraph.data.datasets[i].data[j])
                        }
                        if($rootScope.topBottomPerformanceGraph.data.datasets[i].label === 'Actual Count') {
                           // console.log($rootScope.topBottomPerformanceGraph.data.datasets[i].data[i])
                           console.log($rootScope.topBottomPerformanceGraph.data.datasets[i].data[j])
                            // targetvalue.push({
                            //   "Target": values[j] ,
                            //   "Actual":  $rootScope.topBottomPerformanceGraph.data.datasets[i].data[j]
                            // }) 
                            actualvalue.push($rootScope.topBottomPerformanceGraph.data.datasets[i].data[j])

                        }
                        if($rootScope.topBottomPerformanceGraph.data.datasets[i].label === 'Target Amount') {
                            // console.log($rootScope.topBottomPerformanceGraph.data.datasets[i].data[i])
                             // targetvalue.push({
                             //   "target":  $rootScope.topBottomPerformanceGraph.data.datasets[i].data[j]
                             // }) 
                             targetamount.push($rootScope.topBottomPerformanceGraph.data.datasets[i].data[j])
                         }
                         if($rootScope.topBottomPerformanceGraph.data.datasets[i].label === 'Actual Amount') {
                            // console.log($rootScope.topBottomPerformanceGraph.data.datasets[i].data[i])
                             // targetvalue.push({
                             //   "target":  $rootScope.topBottomPerformanceGraph.data.datasets[i].data[j]
                             // }) 
                             obj.push({
                              "Target Count": targetvalue[j] ,
                              "Actual Count":  actualvalue[j],
                              "Target Amount":targetamount[j],
                              "Actual Amount": $rootScope.topBottomPerformanceGraph.data.datasets[i].data[j]
                            })
                            // actualamount.push($rootScope.topBottomPerformanceGraph.data.datasets[i].data[j])
                         }
                    }
                    
                }
                console.log(targetvalue)
                console.log(obj)
               exportFactory.exportToExcel('graph-excel', obj);
           // });
            console.log($rootScope.topBottomPerformanceGraph);
           // console.log(topBottomPerformanceData.length)
        }

        function onloadPerformanceStats() {
            var requestObj = {};
            chartsServices.filterPerformance(requestObj, function (response) {
                switch (response.status_code) {
                    case 200:
                        $scope.performance = response.performance;
                        // loadPerformanceGraphs();
                        // setCircleRadious();
                        console.log($scope.performance)
                    default:
                        $rootScope.hideBusyIndicator();
                        break;
                }
                //fetchBusinessCategory();
                // fetchStaffs();
            });
        }
        $rootScope.generateChart('top-bottom-performance-chart', 'horizontalBar', topBottomPerformanceData, topBottomPerformanceOptions, 'topBottomGraph');

    }

})();
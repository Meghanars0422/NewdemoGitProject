/* =========================================================
 * Module		: charts page
 * File Name	: chart.html
 * Description	: Show performance of the users
 * Copyright	: Copyright © 2016,
 * 				  Written under contract by Robosoft Technologies Pvt. Ltd.
 * ========================================================= */


(function() {

    'use strict';

    angular
        .module('Ananya.charts',  ['Ananya.charts.config', 'chart.js', 'ngResource', 'slick' ])
        .config(config);

    config.$inject = ['$routeProvider', 'chartsConstant'];

    function config($routeProvider, chartsConstant) {
        $routeProvider
            .when('/charts', {
                title: 'i-Lead 2.0 charts',
                templateUrl: 'modules/charts/views/charts.html',
                controller: 'chartsCtrl'
            })
    }

})();
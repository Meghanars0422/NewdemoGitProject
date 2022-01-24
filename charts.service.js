/* =========================================================
 * Module   : 
 * File Name  :
 * Description  :. 
 * Copyright  : Copyright © 2016,
 *          Written under contract by Robosoft Technologies Pvt. Ltd.
 * ========================================================= */
(function() {

    'use strict';

    angular.module('Ananya.charts').service('chartsServices',chartsServices);
    /* =========================================================
     * Method       : performanceServices.
     * Brief        : show and hide performanceServices.
     * Detail       : setting text,showing and hiding loader functionality are included. 
     * Input Param  : ---.
     * Return       : void.
     * =========================================================  */
    chartsServices.$inject = ['$rootScope', '$resource', 'appConfig', '$log','appText', 'decrypt'];

    function chartsServices($rootScope, $resource, appConfig, $log,appText, decrypt){
        return{
            filterPerformance:function(filterObj,callback) {
                var requestAPI = $resource(appConfig.apiBaseURL + '/Performance', {}, {
                    Check: {
                        method: 'POST'
                    }
                });
                requestAPI.Check(filterObj,function(response) {
                    callback(response);
                }, function(err) {  
                    //callback(appText.responeError);
                });    
                               
            },
            // getStaffMembers : function(){
            //     return $resource(appConfig.apiBaseURL + '/BranchStaff', {}, {
            //         save: {
            //             method: 'POST',
            //             isArray: false,
            //             transformResponse: function(data, headers, statusCode) {
            //                 data = angular.fromJson(data);
            //                 $log.debug("BranchStaff response: ", data);
            //                 var response = angular.copy(data);
            //                 if (response != null && response.status_code == 200) {
            //                     if(response.staff_list.length != 0) {
            //                         angular.forEach(response.staff_list, function(value, key) {
            //                             response.staff_list[key].staff_id = decrypt(value.staff_id);
            //                         });
            //                     }
            //                 }
            //                 $log.debug("Decrypted responce: BranchStaff: ",response);
            //                 return response;
            //             }
            //         }
            //     });
            // },
            // getProductCategory : function(){
            //     return $resource(appConfig.apiBaseURL + '/BusinessByProductCategory', {}, {
            //         get: {
            //             method: 'POST',
            //             isArray: false,
            //             transformResponse: function(data, headers) {
            //                 data = angular.fromJson(data);
            //                 return data;
            //             }
            //         }
            //     });
            // }
        };
    }
})();

'use strict';

import angular from 'angular';

export class Device {
    constructor($q,$http,Resource) {
        let Device = Resource('devices');

        Device.object = function({postcode, apple_approved}){
            let data = {};
            let request = $http({
                method: 'GET',
                url: `${Device.endpoint}/object`,
                params: {
                    postcode: postcode,
                    apple_approved: apple_approved
                }
            })
            data.$promise = request;
            request.then((response) => angular.extend(data,response.data));
            return data;
        };
        return Device;
    }
}

Device.$inject = ['$q','$http','Resource']
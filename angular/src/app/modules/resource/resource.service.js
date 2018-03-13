'use strict';

export class Resource {
  constructor($resource){
    return function(endpoint,params,methods){

      // Extend the default methods
      var defaultMethods = {
          update: { method: 'PUT', isArray: false },
          create: { method: 'POST' }
      };
      methods = angular.extend( defaultMethods, methods );

      // Extend the default parameters
      var defaultParams = {
          id : '@_id'
      };
      params = angular.extend( defaultParams, params );

      // Create a generic resource
      endpoint = `${process.env.API_URL}/api/${endpoint}`;
      var $Resource = $resource( endpoint + '/:id/:controller' , params, methods );

      // Set static endpoint
      $Resource.endpoint = endpoint;

      // Transform responses to all prototypes
      // This means all custom methods call transform when they are resolved
      Object.keys($Resource.prototype).forEach((prop) => {          
        if (prop.startsWith('$')){
          // Store the inital prototype with $$
          $Resource.prototype[`$${prop}`] = $Resource.prototype[prop];
          // Create a new prototype which calls original and transforms response
          $Resource.prototype[prop] = function(params, success, error){
            console.log(`Calling ${prop} with params ${params}`);
            let response = this[`$${prop}`](params, success, error);
            response.then(function() {
              this.$transform()
            }.bind(this))
            return response;
          }
        }
      })

      /**
        * @ngdoc method $prepare
        * Called when about to transfer client data to server
        */
      $Resource.prototype.$prepare = function(){
        return angular.extend({}, this);
      }

      /**
        * @ngdoc method $prepare
        * Called when data has just been transfered from server to client
        */
      $Resource.prototype.$transform = function(){
      }

      /**
        * @ngdoc method get
        * Get a single object and transform resource
        */
      $Resource._get = $Resource.get;
      $Resource.get = function(params, callback){
        var resource = $Resource._get(params, callback);
        resource.$promise.then(function() {
          resource.$transform();
        });
        return resource;
      };

       /**
        * @ngdoc method query
        * Get a list of objects and transform each resource
        */
      $Resource._query = $Resource.query;
      $Resource.query = function(params, callback){
        var resources = $Resource._query(params, callback);
        resources.$promise.then(function() {
          resources.map(function(resource){
            resource.$transform();
          });
        });
        return resources;
      };

       /**
        * @ngdoc method toJSON
        * Custom toJSON prototype which calls prepare
        */
      $Resource.prototype.toJSON = function() {
        var data = this.$prepare();
        delete data.$promise;
        delete data.$resolved;
        return data;
      };


      /**
        * @ngdoc method $save
        * Choose to call $create or $update depending on if _id
        */
      $Resource.prototype.$save = function(params, success, error){
        if ( !this._id ){
          return this.$create(params, success, error);
        } else {
          return this.$update(params, success, error);
        }
      };

      return $Resource;
    };
    
  }
}

Resource.$inject = ['$resource']
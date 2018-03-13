
export class User {
  constructor(Resource) {
    var cache = true;
    return Resource(
      'users',
      {},
      {    
        query: {
          method: 'GET',
          cache: cache,
          isArray: true,
          interceptor: {
            response: function(response){
              cache = true;
              return response.data;
            }
          }
        },
        update: { 
          method: 'PUT', 
          isArray: false,
          interceptor: {
            response: function(response){
              cache = false;
              return response.data;
            }
          }
        },
        changePassword: {
          method: 'PUT',
          params: {
            controller: 'password'
          }
        },
        get: {
          method: 'GET',
          params: {
            id: 'me'
          }
        },
        times: {
          method: 'GET',
          params: {
            controller: 'times'
          }
        },
        engineers: {
          method: 'GET',
          isArray: true,
          params: {
            role: 'engineer'
          }
        },
        reps: {
          method: 'GET',
          isArray: true,
          params: {
            role: 'rep'
          }
        }
      }
    );
  }
}

User.$inject = ['Resource'];


export class Landing {
  constructor(Resource) {
    let Landing = Resource('landings',{},{
    	init: {
    		method: 'GET',
    		params: {
    			id: 'url'
    		}
    	}
    });
    return Landing;
  }
}

Landing.$inject = ['Resource'];

import PostcodeService from 'postcode';

export class Postcode {
	constructor(Resource) {
		let Postcode = Resource('postcodes', {}, {
			'allowed': {
				method: 'GET',
				params: {
					id: 'allowed'
				}
			},
			'address': {
				method: 'GET',
				params: {
					id: 'address'
				}
			},
			'serviced': {
				method: 'GET',
				params: {
					id: 'serviced'
				}
			}
		});
		Postcode.valid = function(postcode) {
			postcode = new PostcodeService(postcode);
			return postcode.valid();
		}
		return Postcode;
	}
}

Postcode.$inject = ['Resource'];
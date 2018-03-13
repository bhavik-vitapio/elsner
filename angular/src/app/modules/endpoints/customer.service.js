
export class Customer {
  constructor(Resource) {
    return Resource('customers');
  }
}

Customer.$inject = ['Resource'];

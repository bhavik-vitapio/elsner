
export class Repair {
  constructor(Resource) {
    let Repair = Resource('repairs', {}, {
      status: {
        method: 'POST',
        params: {
          controller: 'status'
        }
      }
    });

    Repair.prototype.formatIssues = function() {
      console.log(this)
      if(this.issues && this.issues.length)
        return this.issues.map((issue) => issue.issue).join(', ')
    }

    Repair.prototype.price = function() {
      if(this.issues && this.issues.length)
        return this.issues.reduce((price,issue) => price + issue.price, 0)
    }

    return Repair;
  }
}

Repair.$inject = ['Resource'];
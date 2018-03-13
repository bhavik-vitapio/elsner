class RepairlySchema {
  constructor(Job){
  	this.Job = Job;
  }
  $onInit(){
  	this.reviews = this.Job.reviews();
  }
}

RepairlySchema.$inject = ['Job'];

export const repairlySchema = {
  controller: RepairlySchema,
  templateUrl: require('ngtemplate!./repairly-schema.html')
}

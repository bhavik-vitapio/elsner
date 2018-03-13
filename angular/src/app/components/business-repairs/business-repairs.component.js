'use strict';

class BusinessRepairs {
  constructor($state){
    this.$state = $state;
  }
  $onInit(){
  	this.showMoreInfo = false;
  }
  moreInfo(){
  	// this.showMoreInfo = !this.showMoreInfo;
    this.$state.go('corporate')
  }
}

BusinessRepairs.$inject = ['$state'];

export const businessRepairs = {
  controller: BusinessRepairs,
  templateUrl: require('ngtemplate!./business-repairs.html')
}
  
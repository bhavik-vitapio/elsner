'use strict';

class Strapline {
	constructor($interval){
		this.$interval = $interval;
		this.tagLines = [`Our average time from pickup to drop-off`,`Quicker than your commute`,`So fast it'll blow your socks off`,
				`"Slow and steady wins the race" - not someone from Repairly`,`Recently compared to the Hadron Collider`,`Repairly representative spotted in Bugatti Veyron, Feb 2016`,
				`Usain Bolt, team leader at Repairly`];
		this.tagIndex = 0;
		this.slide = true;
		this.line = `Our average time from pickup to drop-off`;
	}
	
	changeTagLines(){
		console.log(this.tagLines);
		if((this.tagLines.length-1) != this.tagIndex){
			this.tagIndex++;
		}else{
			this.tagIndex = 0;
		}
		
	}
	
	startInterval(){
	    this.$interval(() => {
	      this.changeTagLines();
	    }, 1000)
	  }
	
	$onInit(){
		if(this.slide){
			this.slide = false;
			this.startInterval();
		}
	  }	
}

Strapline.$inject = ['$interval'];

export const strapline = {
  controller: Strapline,
  templateUrl: require('ngtemplate!./strapline.html')
}
  
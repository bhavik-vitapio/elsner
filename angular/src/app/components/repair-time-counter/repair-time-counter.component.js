class RepairTimeCounter {
  constructor(){
    this.digits = [1,2,0];
  }
  $onChanges(changes){
    if (changes.time){
      this.updateDigits()
    }
  }
  updateDigits(){
    this.time = this.time || 0;
    this.time = Math.max(this.time,2.9 * 60 * 60 * 1000);
    let seconds = Math.floor( this.time / 1000) ;
    let minutes = Math.floor( seconds / 60 );
    let hours = Math.floor( minutes / 60 );
    this.digits = [];

    let hoursString = String(hours);
    let hoursPrefix = Array(2 - hoursString.length).fill('0').join('');
    hoursString = hoursPrefix + hoursString;
    this.digits.push({ digit: hoursString[0], class: 'card-left' });
    this.digits.push({ digit: hoursString[1], class: 'card-right' });
    this.digits.push({ digit: ':', class: 'card-blank' })

    let minutesString = String(minutes - (hours * 60));
    let minutesPrefix = Array(2 - minutesString.length).fill('0').join('');
    minutesString = minutesPrefix + minutesString;
    this.digits.push({ digit: minutesString[0], class: 'card-left' });
    this.digits.push({ digit: minutesString[1], class: 'card-right' });

  }
}

RepairTimeCounter.$inject = [];

export const repairTimeCounter = {
  controller: RepairTimeCounter,
  templateUrl: require('ngtemplate!./repair-time-counter.html'),
  bindings: {
    time: '<'
  }
}
  
class DateUtilService {
  constructor() {
    this.day = 1000 * 60 * 60 * 24;
  }
  daysBetween(date_1,date_2){
    return Math.floor((date_2.valueOf() - date_1.valueOf()) / this.day);
  }
  dayDateUTC(date=Date.now()){
    date = new Date(date);
    let [year,month,day] = [date.getFullYear(),date.getMonth(),date.getDate()];
    let todayUTC = new Date(Date.UTC(year,month,day));
    return todayUTC;
  }
}

DateUtilService.$inject = [];

export default DateUtilService;
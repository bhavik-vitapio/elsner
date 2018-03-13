/**
 * Returns the week number for this date.  dowOffset is the day of week the week
 * "starts" on for your locale - it can be from 0 to 6. If dowOffset is 1 (Monday),
 * the week returned is the ISO 8601 week number.
 * @param int dowOffset
 * @return int
 */
Date.prototype.getWeek = function (dowOffset) {
/*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

    dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 0; //default dowOffset to zero
    var newYear = new Date(this.getFullYear(),0,1);
    var day = newYear.getDay() - dowOffset; //the day of week the year begins on
    day = (day >= 0 ? day : day + 7);
    var daynum = Math.floor((this.getTime() - newYear.getTime() - 
    (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
    var weeknum;
    //if the year starts before the middle of a week
    if(day < 4) {
        weeknum = Math.floor((daynum+day-1)/7) + 1;
        if(weeknum > 52) {
            nYear = new Date(this.getFullYear() + 1,0,1);
            nday = nYear.getDay() - dowOffset;
            nday = nday >= 0 ? nday : nday + 7;
            /*if the next year starts before the middle of
              the week, it is week #1 of that year*/
            weeknum = nday < 4 ? 1 : 53;
        }
    }
    else {
        weeknum = Math.floor((daynum+day-1)/7);
    }
    return weeknum;
};

Date.prototype.isToday = function(){
    let now = new Date();
    return (
        (this.getFullYear() === now.getFullYear()) &&
        (this.getMonth() === now.getMonth()) &&
        (this.getDate() === now.getDate())
    )
}

Date.prototype.getOrdinal = function(date) {
    var s=["th","st","nd","rd"],
       v=date%100;
   return date+(s[(v-20)%10]||s[v]||s[0]);
}

Date.prototype.timeString = function(){
    console.log(this);
    let parts = this.toLocaleTimeString().split(':');
    return `${parts[0]}:${parts[1]}`
}

Date.prototype.isValid = function(){
    if ( Object.prototype.toString.call(this) === "[object Date]" ) {
        // it is a date
        return !isNaN( this.valueOf() );
    }
    else {
        return false;
    }
}

String.prototype.regexIndexOf = function(regex, startpos) {
    var indexOf = this.substring(startpos || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
}

Array.prototype.contains = function(item){
    var index = this.indexOf(item);
    return (index > -1);
}

Array.prototype.keyValues = function(key){
    return this.map((item) => item[key]);
}

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
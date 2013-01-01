Number.prototype.toRupees = function () {
    var roundedNumber = Math.round(this.valueOf() * 100) / 100,
        number = roundedNumber.toString(),
        sign = number.indexOf("-") != -1 ? number[0] : "";
    number = number.replace("-", "");
    var decimalInd = number.indexOf(".") != -1 ? number.indexOf(".") : number.length,
        index = decimalInd - 3;
    while (index > 0) {
        number = number.slice(0, index) + "," + number.slice(index)
        index -= 2;
    }
    return sign + number
}

Number.prototype.toHumanDuration = function () {
    var timeframe = "",
        year = Math.floor(this.valueOf() / 12),
        month = this.valueOf() % 12;
    if (year > 0) timeframe += (year + " year" + (year == 1 ? " " : "s "));
    if (month > 0) timeframe += (month + " month" + (month == 1 ? " " : "s "));
    return timeframe;
}

String.prototype.toDate = function () {
    var elements = this.valueOf().split("/"),
        month = elements[0] - 1, //Month starts with 0 in javascript
        year = elements[1];
    return new Date(year, month);
}

Date.prototype.toMonthYearLabel = function () {
    var month = this.getMonth()+ 1,
        year = this.getFullYear();
    return  month + "/" + year;
}

Date.prototype.daysInYear = function () {
	var leapYear = (new Date(this.getFullYear(),1,29).getMonth() == 1);
	return leapYear ? 366 : 365
}

Date.prototype.daysInMonth = function () {
	var date = new Date(this.getFullYear(), this.getMonth()+1, 0);
	return date.getDate();
}

//JQuery mobile configuration
$.event.special.swipe.horizontalDistanceThreshold = 100
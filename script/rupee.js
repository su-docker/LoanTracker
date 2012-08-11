function Rupee(value) {

    function round(value) {
        return Math.round(value * 100) / 100;
    }

    this.value = round(value);

    this.prettyPrint = function () {
        var number = this.value.toString(),
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
}
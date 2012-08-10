function Rupee(value) {
    this.value = value;

    this.round = function() {
        return Math.round(this.value * 100) / 100;
    }

    this.prettyPrint = function () {
        var number = this.round().toString(),
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
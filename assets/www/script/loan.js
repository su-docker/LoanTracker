function Loan(details) {
    this.name = details["name"] || "default";
    this.amount = details["amount"];
    this.tenure = 600; //Fixed to 50 years max
    this.emi = details["emi"];
    this.windfall = details["windfall"] || {};
    this.interestRates = details["interestRates"] || {};
    this.date = details["date"];

    this.calculate = function () {
        var monthlyCalc = [],
            balance = this.amount,
            month = 1,
            interestRate = 0;
        while (month < this.tenure && balance > 0) {
            var interestRate = this.interestRates[month] || interestRate,
                interestPortion = (balance * interestRate / 100) / 12,
                principlePortion = (this.windfall[month] || this.emi) - interestPortion,
                balance = balance - principlePortion,
                date = new Date(this.date.getFullYear(), this.date.getMonth() + month),
                monthData = {"duration":month,
                    "interestRate":interestRate,
                    "EMIAmt":(interestPortion + principlePortion),
                    "interestAmt":interestPortion,
                    "principleAmt":principlePortion,
                    "balanceAmt":balance,
                    "date":date.toMonthYearLabel()};
            monthlyCalc.push(monthData);
            month++;
        }
        return monthlyCalc;
    }

    this.addWindfall = function (month, amount, repeat) {
        var endMonth = repeat ? this.tenure : month;
        for (var i = month; i <= endMonth; i++) {
            this.windfall[i] = amount;
        }
    }

    this.addInterestRates = function (month, percent) {
        this.interestRates[month] = percent;
    }

    this.getEffectiveTenure = function () {
        var monthlyCalc = this.calculate();
        var lastValue = monthlyCalc[monthlyCalc.length - 1]
        return lastValue.duration;
    }
}

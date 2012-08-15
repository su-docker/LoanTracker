function Loan(amount, tenure, emi) {
    this.amount = amount;
    this.tenure = tenure;
    this.emi = emi;
    this.windfall = {};
    this.interestRates = {};

    this.calculate = function () {
        var monthlyCalc = [],
            balance = this.amount,
            month = 1;
        while (month < this.tenure && balance > 0) {
            var interestPortion = (balance * this.interestRates[month] / 100) / 12,
                principlePortion = (this.windfall[month] || this.emi) - interestPortion,
                balance = balance - principlePortion,
                monthData = {"duration":month,
                    "interestRate":this.interestRates[month],
                    "EMIAmt":(interestPortion + principlePortion),
                    "interestAmt":interestPortion,
                    "principleAmt":principlePortion,
                    "balanceAmt":balance };
            monthlyCalc.push(monthData);
            month++;
        }
        return monthlyCalc;
    }

    this.addWindfall = function (month, amount) {
        this.windfall[month] = amount
    }

    this.addInterestRates = function (month, percent) {
        for (var i = month; i < this.tenure; i++) {
            this.interestRates[i] = percent;
        }
    }

    this.getEffectiveTenure = function () {
        var monthlyCalc = this.calculate();
        var lastValue = monthlyCalc[monthlyCalc.length - 1]
        return lastValue.duration;
    }
}

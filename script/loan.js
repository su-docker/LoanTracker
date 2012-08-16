function Loan(details) {
    this.name = details["name"] || "default";
    this.amount = details["amount"];
    this.tenure = details["tenure"];
    this.emi = details["emi"];
    this.windfall = details["windfall"] || {};
    this.interestRates = details["interestRates"] || {};

    this.calculate = function () {
        var monthlyCalc = [],
            balance = this.amount,
            month = 1;
        while (month < this.tenure && balance > 0) {
            var interestRate = 0;
            interestRate = this.interestRates[month] || interestRate;

            var interestPortion = (balance * interestRate / 100) / 12,
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
        this.interestRates[i] = percent;
    }

    this.getEffectiveTenure = function () {
        var monthlyCalc = this.calculate();
        var lastValue = monthlyCalc[monthlyCalc.length - 1]
        return lastValue.duration;
    }
}

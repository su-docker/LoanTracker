function LoanDetails(amount, tenure, emi) {
    this.amount = amount;
    this.tenure = tenure;
    this.emi = emi;
    this.windfall = {};
    this.interestRates = {};

    this.toHumanTimeFrame = function (value) {
        var timeframe = "",
            year = Math.floor(value / 12),
            month = value % 12;
        if (year > 0) timeframe += (year + " years ");
        if (month > 0) timeframe += (month + " months ");
        return timeframe;
    }

    this.calculate = function () {
        var monthlyCalc = [],
            balance = this.amount,
            month = 1;
        while (month < this.tenure && balance > 0) {
            var interestPortion = (balance * this.interestRates[month] / 100) / 12,
                principlePortion = (this.emi + (this.windfall[month] || 0)) - interestPortion,
                balance = balance - principlePortion,
                monthData = {"duration":this.toHumanTimeFrame(month),
                    "interestRate":this.interestRates[month],
                    "EMIAmt" : new Rupee(interestPortion + principlePortion).prettyPrint(),
                    "interestAmt": new Rupee(interestPortion).prettyPrint(),
                    "principleAmt" : new Rupee(principlePortion).prettyPrint(),
                    "balanceAmt" : new Rupee(balance).prettyPrint()};
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
}
;
function Loan(amount, tenure, emi) {
    this.amount = amount;
    this.tenure = tenure;
    this.emi = emi;
    this.windfall = {};
    this.interestRates = {};

    function toHumanTimeFrame(value) {
        var timeframe = "",
            year = Math.floor(value / 12),
            month = value % 12;
        if (year > 0) timeframe += (year + " years ");
        if (month > 0) timeframe += (month + " months ");
        return timeframe;
    }

    this.calculate = function (pretty) {
        var monthlyCalc = [],
            balance = this.amount,
            month = 1;
        while (month < this.tenure && balance > 0) {
            var interestPortion = (balance * this.interestRates[month] / 100) / 12,
                principlePortion = (this.emi + (this.windfall[month] || 0)) - interestPortion,
                balance = balance - principlePortion,
                monthData = {"duration": toHumanTimeFrame(month),
                    "interestRate":this.interestRates[month],
                    "EMIAmt" : pretty ? new Rupee(interestPortion + principlePortion).prettyPrint() : (interestPortion + principlePortion),
                    "interestAmt": pretty ? new Rupee(interestPortion).prettyPrint() : interestPortion,
                    "principleAmt" : pretty ? new Rupee(principlePortion).prettyPrint() : principlePortion,
                    "balanceAmt" : pretty ? new Rupee(balance).prettyPrint() : balance };
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
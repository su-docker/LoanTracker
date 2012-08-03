function LoanDetails(amount, tenure, emi) {
    this.amount = amount;
    this.tenure = tenure;
    this.emi = emi;
    this.windfall = {};
    this.interestRates = {};

    this.round = function(value) {
        return Math.round(value * 100)/100;
    }

    this.toHumanTimeFrame = function(value) {
        var timeframe = "",
            year = Math.floor(value/12),
            month = value % 12;
        if(year > 0) timeframe += (year + " years ");
        if(month > 0) timeframe += (month + " months ");
        return timeframe;
    }

    this.getMonthlyStatement = function() {
        var statements = [],
            balance = this.amount,
            month = 1;
        statements.push(["-", "-", "-", "-", balance]); //Initial state
        while(month < this.tenure && balance > 0) {
            var interestPortion = (balance * this.interestRates[month] / 100) / 12,
                principlePortion = (this.emi + (this.windfall[month] || 0)) - interestPortion,
                balance = balance - principlePortion;
            statements.push([this.toHumanTimeFrame(month), this.interestRates[month], this.round(interestPortion), this.round(principlePortion), this.round(balance)]);
            month++;
        }
        return statements;
    }

    this.addWindfall = function(month, amount) {
        this.windfall[month] = amount
    }

    this.addInterestRates = function(month, percent) {
        for(var i=month; i<this.tenure; i++) {
            this.interestRates[i] = percent;
        }
    }
};
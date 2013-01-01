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
            var date = new Date(this.date.getFullYear(), this.date.getMonth() + month),
            	interestRate = this.interestRates[month] || interestRate,
                interestPortion = ((balance * interestRate / 100) / date.daysInYear()) * date.daysInMonth(),
                principlePortion = (this.windfall[month] || this.emi) - interestPortion,
                balance = balance - principlePortion,
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
    
    this.getBalance = function() {
    	var monthSplit = this.calculate(),
    		currentMonthYear = new Date().toMonthYearLabel();
    	for(var monthIndex in monthSplit) {
    		if(monthSplit[monthIndex].date == currentMonthYear) {
    			return monthSplit[monthIndex].balanceAmt
    		}
    	}
    	return 0;
    }

    this.addWindfall = function (month, amount, repeat) {
        var endMonth = repeat ? this.tenure : month;
        for (var i = month; i <= endMonth; i++) {
            this.windfall[i] = amount;
        }
        LoanStore.save(this);
    }

    this.addInterestRates = function (month, percent) {
        this.interestRates[month] = percent;
        LoanStore.save(this);
    }

    this.getEffectiveTenure = function() {
        var monthlyCalc = this.calculate();
        var lastValue = monthlyCalc[monthlyCalc.length - 1]
        return lastValue.duration;
    }
    
    this.getRemainingTenure = function() {
    	return this.getEffectiveTenure() - this.getCurrentMonthNumber();
    }
    
    this.getCurrentMonthNumber = function() {
    	var date1 = this.date,
    		date2 = new Date(),
        	months;
        var months = (date2.getFullYear() - date1.getFullYear()) * 12;
        months -= date1.getMonth() + 1;
        months += date2.getMonth() + 1;
        return (months > this.getEffectiveTenure()) ? this.getEffectiveTenure() : months;
    }
    
    this.forHuman = function() {
    	return {
    		name: this.name,
    		durationRemaining: this.getRemainingTenure().toHumanDuration(),
    		balance: Math.round(this.getBalance()).toRupees()
    	}
    }
    
    this.toSave = function() {
    	return {
    		name: this.name,
    		tenure: this.tenure,
    		amount: this.amount,
    		emi: this.emi,
    		windfall: this.windfall,
    		interestRates: this.interestRates,
    		date: this.date
    	}
    }
}

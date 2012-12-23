function LoanStore() {
}

LoanStore.save = function (loan) {
    var allLoanNames = localStorage["loans"] ? JSON.parse(localStorage["loans"]) : {};
    allLoanNames[loan.name.toString()] = "true";
    localStorage["loans"] = JSON.stringify(allLoanNames);
    localStorage[loan.name] = JSON.stringify(loan.toSave());
};

LoanStore.deleteLoan = function (loan) {
    var allLoanNames = localStorage["loans"] ? JSON.parse(localStorage["loans"]) : {};
    delete allLoanNames[loan.name];
    localStorage["loans"] = JSON.stringify(allLoanNames);
    localStorage.removeItem(loan.name);
}

LoanStore.fetchAll = function () {
    var allLoanNames = localStorage["loans"] ? JSON.parse(localStorage["loans"]) : {},
        loans = [];
    for (var loanName in allLoanNames) {
        var loanData = JSON.parse(localStorage[loanName]),
        	dateArr = loanData.date.split(/[-T]/);
        loanData.date = new Date(dateArr[0], dateArr[1]-1, dateArr[2]);
        loans.push(new Loan(loanData)); 
    }
    return loans;
};
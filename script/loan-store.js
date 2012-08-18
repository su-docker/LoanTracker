function LoanStore() {
}

LoanStore.save = function (loan) {
    var allLoanNames = localStorage["loans"] ? JSON.parse(localStorage["loans"]) : {};
    allLoanNames[loan.name.toString()] = "true";
    localStorage["loans"] = JSON.stringify(allLoanNames);

    localStorage[loan.name] = JSON.stringify(loan)
}

LoanStore.delete = function (loan) {
    var allLoanNames = localStorage["loans"] ? JSON.parse(localStorage["loans"]) : {};
    delete allLoanNames[loan.name];
    localStorage["loans"] = JSON.stringify(allLoanNames);
    localStorage.removeItem(loan.name);
}

LoanStore.fetchAll = function () {
    var allLoanNames = localStorage["loans"] ? JSON.parse(localStorage["loans"]) : {},
        loans = [];
    for (var loanName in allLoanNames) {
        var loanData = JSON.parse(localStorage[loanName]);
        loans.push(new Loan(loanData));
    }
    return loans;
}
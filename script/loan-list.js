function LoanList() {

    var that = this;

    function init() {
        $("#add-loan-create").live("tap", function () {
            that.create();
            that.refresh();
        });
        $("#list-loans li").live("tap", function () {
            var that = this;
            setTimeout(function () {
                var loan = $(that).data();
                window.loanVisualizer.load(loan);
            },  500);
        });
    }

    init();

    this.create = function () {
        var name = $("#add-loan-name").val(),
            amount = $("#add-loan-amount").val().replace(/,/g, ""),
            emi = $("#add-loan-emi").val().replace(/,/g, ""),
            interest = $("#add-loan-interest").val().replace(/%/g, ""),
            tenure = $("#add-loan-months").val();
        var interestRates = {1:interest};
        LoanStore.save(new Loan({"name":name, "amount":amount, "tenure":tenure, "emi":emi, "interestRates":interestRates }))
    }

    this.refresh = function () {
        var loans = LoanStore.fetchAll(),
            loansUl = $("#list-loans");

        loansUl.find("li").remove();
        ich.grabTemplates();
        for (var index in loans) {
            var loan = loans[index],
                li = ich.listItem(loan);
            li.data(loan);
            loansUl.append(li);
        }
        loansUl.listview('refresh');
    }


}
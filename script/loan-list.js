function LoanList() {

    var that = this;

    function init() {
        $("#add-loan-create").live("tap", function () {
            that.create();
            that.refresh();
        });

        $("#delete-loan-btn").live("tap", function () {
            var loan = $("#delete-confirmation").data();
            LoanStore.delete(loan);
            that.refresh();
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
            addListItemHandlers(li);
            li.data(loan);
            loansUl.append(li);
        }
        loansUl.listview('refresh');
    }

    function addListItemHandlers(listItem) {
        //But in jquery touch events will trigger the tap on taphold event! :-(
        var stopTap = false;

        $(listItem).on("tap", function () {
            if (!stopTap) {
                console.log("tap triggered");
                var that = this;
                setTimeout(function () {
                    var loan = $(that).data();
                    window.loanVisualizer.load(loan);
                }, 500);
                document.location.href = "#loan-details";
            }
            stopTap = false;
        });

        $(listItem).on("taphold", function (event) {
            stopTap = true;
            var loan = $(this).data();
            $("#add-loan-name").val(loan.name);
            $("#add-loan-name").attr("disabled", "true");
            $("#add-loan-amount").val(loan.amount);
            $("#add-loan-emi").val(loan.emi);
            $("#add-loan-interest").val(loan.interestRates[1]);
            $("#add-loan-months").val(loan.tenure);
            $.mobile.changePage("#add-loan", {transition:'pop', role:'dialog'})
        })

        $(listItem).on("swipe", function () {
            stopTap = true;
            var loan = $(this).data();
            $("#delete-confirmation").data(loan);
            $("#delete-confirmation").find(".name").html(loan.name);
            $.mobile.changePage("#delete-confirmation", {transition:'pop', role:'dialog'})
        })
    }


}
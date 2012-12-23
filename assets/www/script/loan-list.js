function LoanList() {

    var that = this;

    function init() {
        $("#add-loan-btn").on("tap", function() {
            initAddForm();
            $.mobile.changePage("#add-loan", {transition:'fade', role:'dialog'})
        });

        $("#add-loan-create").on("tap", function () {
            if($(this).hasClass('disabled')) return false;
        	that.create();
            that.refresh();
        });

        $("#delete-loan-btn").on("tap", function () {
            var loan = $("#delete-confirmation").data();
            LoanStore.deleteLoan(loan);
            that.refresh();
        });
    }

    init();

    this.create = function () {
        var name = $("#add-loan-name").val(),
            amount = $("#add-loan-amount").val().replace(/,/g, ""),
            emi = $("#add-loan-emi").val().replace(/,/g, ""),
            interest = $("#add-loan-interest").val().replace(/%/g, ""),
            dateStr = $("#add-loan-date-month").val() + "/" + $("#add-loan-date-year").val();
        var interestRates = {1:interest},
            date = dateStr.toDate();
        LoanStore.save(new Loan({"name":name, "amount":amount, "emi":emi, "interestRates":interestRates, "date":date}));
    }

    this.refresh = function () {
        var loans = LoanStore.fetchAll(),
            loansUl = $("#list-loans");

        loansUl.find("li").remove();
        ich.grabTemplates();
        for (var index in loans) {
            var loan = loans[index],
                li = ich.listItem(loan.forHuman());
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
            initAddForm(loan);
            $.mobile.changePage("#add-loan", {transition:'fade', role:'dialog'})
        })

        $(listItem).on("swipe", function () {
            stopTap = true;
            var loan = $(this).data();
            $("#delete-confirmation").data(loan);
            $("#delete-confirmation").find(".name").html(loan.name);
            $.mobile.changePage("#delete-confirmation", {transition:'fade', role:'dialog'})
        })
    }

    function initAddForm(loan) {
        $("#add-loan-name").val(loan ? loan.name : "");
        $("#add-loan-amount").val(loan ? loan.amount : "");
        $("#add-loan-emi").val(loan ? loan.emi : "");
        $("#add-loan-interest").val(loan ? loan.interestRates[1] : "");
        $("#add-loan-date").val(loan ? loan.date.toMonthYearLabel() : "");
        if(loan) {
            $("#add-loan-name").attr("disabled", "true");
        } else {
            $("#add-loan-name").removeAttr("disabled");
        }
        validate();
        $("#add-loan input").on("focusout", function() {
        	validate();
        });
    }
    
    function validate() {
    	inputFields = $("#add-loan input");
    	for(var fieldIdx=0; fieldIdx < inputFields.length; fieldIdx++) {
    		el = $(inputFields[fieldIdx]);
    		(el.val().trim() == "") ? el.addClass("error") : el.removeClass("error")
    	}
    	if ($("#add-loan input.error").length > 0) {
    		$("#add-loan-create").addClass("disabled");
    	} else {
    		$("#add-loan-create").removeClass("disabled");
    	}
    }
}
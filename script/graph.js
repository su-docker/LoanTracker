function Graph() {
    this.view = $(".graph-section")

    this.load = function (loan) {
        this.loan = loan;

        //Add handlers
        $(".bar").live("click", function () {
            var month = $(this).attr("data-month");
            $(".graph div").removeClass("highlight");
            $(this).addClass("highlight");
            $(".tile-" + month).attr("tabindex", -1).focus();
        });

        this.graphScroll = new iScroll('graph-scroll');

        this.refresh();
    }

    this.refresh = function () {
        var balanceData = [],
            loanData = this.loan.calculate();
        for (var i = 0; i < loanData.length; i++) {
            balanceData.push(loanData[i].balanceAmt);
        }

        $(".graph div").remove();
        for (var i = 0; i < balanceData.length; i++) {
            var bar = $(document.createElement("div"));
            bar.attr("class", "bar");
            bar.css("height",scaleHeight(balanceData, i));
            bar.attr("data-month", loanData[i].duration);
            $(".graph").append(bar);
        }

        var barsWidth = $(".bar").width() * loanData.length;
        $(".graph-section").css("width", barsWidth);
        setTimeout(refreshScroller(this), 0);

        $(".duration").html(this.loan.getEffectiveTenure().toHumanDuration());
    }

    function scaleHeight(balanceData, index) {
        var maxValue = Math.max.apply(Math, balanceData),
            currentValue = balanceData[index];
        return (currentValue/maxValue * 100) + "%";
    }

    function refreshScroller(self) {
        self.graphScroll.refresh();
    }

}
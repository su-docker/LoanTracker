function Scroller() {

    this.load = function (loan) {
        this.loan = loan;

        addInterestRatesEditorHandlers();
        addEmiEditorHandlers();

        this.stickyScroll = new iScroll('stickies-scroll');

        this.refresh();
    }

    this.refresh = function () {
        $(".details-section div").remove();
        var height = $(".details-section").height();
        datas = this.loan.calculate(true);
        for (var i = 0; i < datas.length; i++) {
            var tile = ich.detailTile(transformForHumans(datas[i]));
            $(".details-section").append(tile);
            $(".tile-" + datas[i].month).data(datas[i]);
        }
        $(".detail-tile").css("height", height);
        $(".details-section").css("width", $(".detail-tile").outerWidth(true) * datas.length); //iScroll needs the width of child div

        var that = this;
        setTimeout(function() {refreshScroll(that)}, 1000);
    }

    this.scrollTo = function(month) {
        var selector = ".detail-tile:nth-child(" + month + ")";
        this.stickyScroll.scrollToElement(selector, 100);
        this.highlight(month);
    }

    this.highlight = function(month) {
        var selector = ".detail-tile:nth-child(" + month + ")";
        $(".detail-tile").removeClass("detail-tile-highlight");
        $(selector).addClass("detail-tile-highlight");
    }

    function transformForHumans(monthlyData) {
        monthlyData.month = monthlyData.duration;
        monthlyData.duration = monthlyData.duration.toHumanDuration();
        monthlyData.EMIAmt = monthlyData.EMIAmt.toRupees();
        monthlyData.interestAmt = monthlyData.interestAmt.toRupees();
        monthlyData.principleAmt = monthlyData.principleAmt.toRupees();
        monthlyData.balanceAmt = monthlyData.balanceAmt.toRupees();
        return monthlyData;
    }

    function refreshScroll(self) {
        self.stickyScroll.refresh();
    }

    function addInterestRatesEditorHandlers() {
        $(".interest").live("tap", function () {
            var monthlyData = $(this).parent(".detail-tile").data();
            $("#edit-interest-month").val(monthlyData.month);
            $("#edit-interest-text").val(monthlyData.interestRate);
        });
        $("#edit-interest-close").live("tap", function () {
            var rate = $("#edit-interest-text").val(),
                loanVisualizer = $(".loan-visualizer").data(),
                month = $("#edit-interest-month").val();
            loanVisualizer.loan.addInterestRates(month, rate);
            loanVisualizer.refresh();
        });
    }

    function addEmiEditorHandlers() {
        $(".emi").live("tap", function() {
            var monthlyData = $(this).parent(".detail-tile").data();
            $("#edit-emi-month").val(monthlyData.month);
            $("#edit-emi-amount").val(monthlyData.EMIAmt.replace(",",""));
        });

        $("#edit-emi-close").live("tap", function() {
           var newEmi = $("#edit-emi-amount").val(),
               loanVisualizer = $(".loan-visualizer").data(),
               month = $("#edit-emi-month").val();
            console.log(month + "-" + newEmi);
            loanVisualizer.loan.addWindfall(month, new Number(newEmi));
            loanVisualizer.refresh();
        });
    }

}
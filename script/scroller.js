function Scroller() {

    this.load = function (loan) {
        this.loan = loan;

        //Add handlers
        $(".interest").live("tap", function () {
            var monthlyData = $(this).parent(".detail-tile").data();
            $("#edit-interest-month").val(monthlyData.month);
            $("#edit-interest-text").val(monthlyData.interestRate);
            $("#edit-interest").simpledialog2();
        });
        $("#edit-interest-close").live("tap", function () {
            var rate = $("#edit-interest-text").val(),
                loanVisualizer = $(".loan-visualizer").data(),
                month = $("#edit-interest-month").val();
            loanVisualizer.loan.addInterestRates(month, rate);
            loanVisualizer.refresh();
        });

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
        setTimeout(function () { this.stickyScroll.refresh(); }, 0);
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

}
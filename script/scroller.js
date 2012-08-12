function Scroller() {

    this.load = function (loan) {
        this.loan = loan;

        //Add handlers
        $(".interest").live("click", function () {
            var monthlyData = $(this).parent(".detail-tile").data();
            $("#edit-interest-month").val(monthlyData.month);
            $("#edit-interest-text").val(monthlyData.interestRate);
            $("#edit-interest").simpledialog2();
        });
        $("#edit-interest-close").live("touch", function () {
            var rate = $("#edit-interest-text").val(),
                loanVisualizer = $(".loan-visualizer").data(),
                month = $("#edit-interest-month").val();
            console.log(month+":"+rate);
            loanVisualizer.loan.addInterestRates(month, rate);
            loanVisualizer.refresh();
        });

        this.refresh();

        $(".details-section").dragscroll({
            scrollBars : true,
            autoFadeBars : true,
            smoothness : 18,
            mouseWheelVelocity : 2
        });
    }

    this.refresh = function () {
        $(".details-section table tr td").remove();
        var datas = this.loan.calculate(true);
        for (var i = 0; i < datas.length; i++) {
            var tile = ich.detailTile(transformForHumans(datas[i]));
            $(".details-section table tr").append(tile);
            $(".tile-" + datas[i].month).data(datas[i]);
        }
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
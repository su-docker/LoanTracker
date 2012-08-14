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
        var data = [];
        var loanData = this.loan.calculate();
        for (var i = 0; i < loanData.length; i++) {
            data.push(loanData[i].balanceAmt);
        }
        var widthPercent = 100 / (data.length),
            maxHeight = this.view.height(),
            heightScale = d3.scale.linear()
                .domain([0, d3.max(data)])
                .range(["0%", "100%"]);

        this.view.find(".graph div").remove();
        d3.select(".graph").selectAll("div")
            .data(data)
            .enter().append("div")
            .style("height", heightScale)
            .attr("class", "bar")
            .attr("data-month", function (d, i) {
                return loanData[i].duration
            });

        var barsWidth = $(".bar").width() * loanData.length;
        $(".graph-section").css("width", barsWidth);
        setTimeout( refreshScroller(this), 0);

        $(".duration").html(this.loan.getEffectiveTenure().toHumanDuration());
    }

    function refreshScroller(self) {
        self.graphScroll.refresh();
    }

}
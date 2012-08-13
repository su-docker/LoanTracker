function Graph() {
    this.view = $(".graph-section")

    this.load = function (loan) {
        this.loan = loan;

        //Add handlers
        $(".bar").live("click", function () {
            var month = $(this).attr("data-month");
            $(".tile-" + month).attr("tabindex", -1).focus();
        });

        this.refresh();
    }

    this.refresh = function () {
        $(".graph-section div").remove();

        var data = [];
        var loanData = this.loan.calculate();
        for (var i = 0; i < loanData.length; i++) {
            data.push(loanData[i].balanceAmt);
        }
        var widthPercent = 100 / (data.length),
            maxHeight = this.view.height(),
            heightScale = d3.scale.linear()
                .domain([0, d3.max(data)])
                .range(["0px", maxHeight + "px"]);
        d3.select(".graph-section").selectAll("div")
            .data(data)
            .enter().append("div")
            .style("height", heightScale)
            .style("width", widthPercent + "%")
            .attr("class", "bar")
            .attr("data-month", function (d, i) {
                return loanData[i].duration
            })
    }

}
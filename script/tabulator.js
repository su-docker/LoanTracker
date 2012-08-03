Tabulator = function() {
    this.render = function (loanData) {
        var table = d3.selectAll("#table_view").data([loanData]);
        var tr = table.selectAll("tr").data(function(d) {return d.getMonthlyStatement()})
            .enter().append("tr");

        var td = tr.selectAll("td").data(function(d) {return d})
            .enter().append("td")
            .text(function(d) { return d});
    }
}
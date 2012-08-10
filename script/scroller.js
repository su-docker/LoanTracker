Scroller = function() {
    this.populate = function(loan) {
        var datas = loan.calculate();
        for(var i=0; i<datas.length; i++) {
            var tile = ich.detailTile(datas[i]);
            $(".details-section table tr").append(tile);
        }
    }
}

$(document).ready(function() {
    var scroller = new Scroller(),
        loan = new LoanDetails(1617000, 240, 59000);
        loan.addInterestRates(1, 11.25);
    scroller.populate(loan);
})

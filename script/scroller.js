Scroller = function () {
    this.populate = function (loan) {
        var datas = loan.calculate();
        for (var i = 0; i < datas.length; i++) {
            var tile = ich.detailTile(datas[i]);
            $(".details-section table tr").append(tile);
        }
    }
}

$(document).ready(function () {
    var scroller = new Scroller(),
        loan = new LoanDetails(1617000, 240, 59000);
    loan.addInterestRates(1, 11.25);
    loan.addWindfall(2, 95000);
    loan.addWindfall(3, 60000);
    loan.addInterestRates(1, 11.25);
    loan.addInterestRates(12, 11);

    scroller.populate(loan);
})

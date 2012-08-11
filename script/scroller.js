Scroller = function () {
    this.populate = function (loan) {
        var datas = loan.calculate(true);
        for (var i = 0; i < datas.length; i++) {
            var tile = ich.detailTile(datas[i]);
            $(".details-section table tr").append(tile);
        }
        $(".details-section").dragscroll({
            scrollBars : true,
            autoFadeBars : true,
            smoothness : 18,
            mouseWheelVelocity : 2
        });
    }
}
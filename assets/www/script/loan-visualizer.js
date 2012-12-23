function LoanVisualizer() {

    function init(self) {
        adjustDifferentSectionHeights();
        self.scroller = new Scroller();
        self.graph = new Graph();
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

        //Add select handlers
        $(".bar").live("tap", function () {
            var month = $(this).attr("data-month");
            self.scroller.scrollTo(month);
            self.graph.highlight(month);
        });

        $(".detail-tile").live("tap", function () {
            var month = $(this).data().month;
            self.graph.scrollTo(month);
            self.scroller.highlight(month);
        })

    }

    init(this);

    function adjustDifferentSectionHeights() {
        var windowHeight = $(window).outerHeight(true),
            headerHeight = $(".header-section").outerHeight(true),
            availableHeight = windowHeight - headerHeight,
            detailsSectionHeight = 250;
        $(".details-section").height(detailsSectionHeight);
        $(".graph-section").height(availableHeight - detailsSectionHeight);
    }

    this.load = function (loan) {
        this.loan = loan;
        $(".loan-visualizer").data(this);
        $("#loan-details .header-section h1").html(loan.name);
        this.scroller.load(loan);
        this.graph.load(loan);
    }

    this.refresh = function () {
        this.scroller.refresh();
        this.graph.refresh();
    }
}
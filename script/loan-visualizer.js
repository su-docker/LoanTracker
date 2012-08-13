function LoanVisualizer() {

    function init(self) {
        adjustDifferentSectionHeights();
        self.scroller = new Scroller();
        self.graph = new Graph();
    }

    init(this);

    function adjustDifferentSectionHeights() {
        var windowHeight = $(window).height(),
            headerHeight = $(".header-section").height(),
            availableHeight = windowHeight - headerHeight;
        $(".details-section").height(availableHeight / 2)
        $(".graph-section").height(availableHeight / 2);
    }

    this.load = function (loan) {
        this.loan = loan;
        $(".loan-visualizer").data(this);
        this.scroller.load(loan);
        this.graph.load(loan);
    }

    this.refresh = function () {
        this.scroller.refresh();
        this.graph.refresh();
    }
}
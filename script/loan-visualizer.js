function LoanVisualizer() {

    function init(self) {
        var windowHeight = $(document).height();
        $(".graph-section").attr("style", "height:" + Math.round(windowHeight * 0.58) + "px");

        self.scroller = new Scroller();
        self.graph = new Graph();
    }
    init(this);

    this.load = function(loan) {
        this.loan = loan;
        $(".loan-visualizer").data(this);
        $(".summary-section").html(loan.getEffectiveTenure().toHumanDuration());
        this.scroller.load(loan);
        this.graph.load(loan);
    }

    this.refresh = function() {
        $(".summary-section").html(this.loan.getEffectiveTenure().toHumanDuration());
        this.scroller.refresh();
        this.graph.refresh();
    }
}
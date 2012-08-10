$(function () {
    var loan1 = new LoanDetails(1617000, 240, 59000);
    loan1.addWindfall(1, 50000);
    loan1.addWindfall(2, 95000);
    loan1.addWindfall(3, 60000);
    loan1.addInterestRates(1, 11.25);
    loan1.addInterestRates(12, 11);
    var tabu = new Tabulator();
    tabu.render(loan1);
    var visualizer = new Visualizer();
    visualizer.render();
});


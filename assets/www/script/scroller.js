function Scroller() {

    this.startIndex = 0;
    this.endIndex = 0;
	this.init = function () {
        addInterestRatesEditorHandlers();
        addEmiEditorHandlers(); 
        this.stickyScroll = new iScroll('stickies-scroll');
    }
    this.init();

    this.load = function (loan) {
        this.loan = loan;
        this.refresh();
    }

    this.refresh = function () {
    	var that = this;
    	$(".details-section div").remove();
    	this.startIndex = this.endIndex = 0;
        this.append(20);
        $(".detail-tile").live("touchstart", function(e) {
        	var tileIndex = $(this).attr("class").match("(.)* (tile\-)([0-9]*)").pop()
        	console.log("touche event : " + (parseInt(tileIndex)+5));
        	that.append(parseInt(tileIndex) + 5);
        });
    }
    
    this.append = function(selectedMonth) {
    	selectedIndex = parseInt(selectedMonth);
    	console.log("--- selected : " + selectedIndex + typeof selectedIndex);
    	console.log("--- endIndex : " + this.endIndex + typeof this.endIndex);
    	if(selectedIndex > this.endIndex) {
            var height = $(".details-section").height(),
        		fragment = document.createDocumentFragment(),
            	datas = this.loan.calculate(true);
            console.log("datas[0]: " + datas[0]);
    		selectedIndex = selectedIndex >= datas.length ? (datas.length-1) : selectedIndex; 
    		for (var i = this.endIndex; i < selectedIndex; i++) {
                var tile = ich.detailTile(transformForHumans(datas[i]));
                tile.data(datas[i]);
                fragment.appendChild(tile[0]);
            }
            $(".details-section").append(fragment);
            $(".detail-tile").css("height", height);
            $(".details-section").css("width", $(".detail-tile").outerWidth(true) * datas.length); //iScroll needs the width of child div
            this.endIndex = selectedIndex;
            
            var that = this;
            setTimeout(function() {refreshScroll(that)}, 1000);    		
    	}
    }

    this.scrollTo = function(month) {
    	this.append(month);
        var selector = ".tile-" + month;
        this.stickyScroll.scrollToElement(selector, 100);
        this.highlight(month);
    }

    this.highlight = function(month) {
        var selector = ".tile-" + month;
        $(".detail-tile").removeClass("detail-tile-highlight");
        $(selector).addClass("detail-tile-highlight");
    }

    function transformForHumans(monthlyData) {
        monthlyData.month = monthlyData.duration;
        monthlyData.duration = monthlyData.duration.toHumanDuration();
        monthlyData.EMIAmt = monthlyData.EMIAmt.toRupees();
        monthlyData.interestAmt = monthlyData.interestAmt.toRupees();
        monthlyData.principleAmt = monthlyData.principleAmt.toRupees();
        monthlyData.balanceAmt = monthlyData.balanceAmt.toRupees();
        return monthlyData;
    }

    function refreshScroll(self) {
        self.stickyScroll.refresh();
    }

    function addInterestRatesEditorHandlers() {
        $(".interest").live("tap", function () {
            var monthlyData = $(this).parent(".detail-tile").data();
            $("#edit-interest-month").val(monthlyData.month);
            $("#edit-interest-text").val(monthlyData.interestRate);
        });
        $("#edit-interest-close").live("tap", function () {
            var rate = $("#edit-interest-text").val(),
                loanVisualizer = $(".loan-visualizer").data(),
                month = $("#edit-interest-month").val();
            loanVisualizer.loan.addInterestRates(month, rate);
            loanVisualizer.refresh();
        });
    }

    function addEmiEditorHandlers() {
        $(".emi").live("tap", function() {
            var monthlyData = $(this).closest(".detail-tile").data();
            $("#edit-emi-month").val(monthlyData.month);
            $("#edit-emi-amount").val(monthlyData.EMIAmt.replace(/,/g,""));
        });
        
        $("#edit-emi-repeat").live("tap", function() {
        	$(this).find("img").toggleClass("show");
        	$(this).find("img").toggleClass("hide");
        });

        $("#edit-emi-close").live("tap", function() { 
           var newEmi = $("#edit-emi-amount").val(),
               loanVisualizer = $(".loan-visualizer").data(),
               month = $("#edit-emi-month").val(),
               repeat = $("#edit-emi-repeat img").hasClass("show");
            loanVisualizer.loan.addWindfall(month, new Number(newEmi), repeat);
            loanVisualizer.refresh();
        });
    }
}
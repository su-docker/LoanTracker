function Scroller() {

    this.startIndex = 0;
    this.endIndex = 0;
	this.init = function () {
        addInterestRatesEditorHandlers();
        addEmiEditorHandlers(); 
        addLoadMoreHandlers();
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
        this.append(1);
        $(".detail-tile").live("touchstart", function(e) {
        	var month = $(this).attr("class").match("(.)* (tile\-)([0-9]*)").pop()
        	that.highlight(month);
        });
    }
    
    this.append = function(selectedMonth) {
        var that = this;
    	var selectedIndex = parseInt(selectedMonth);    	
        var height = $(".details-section").height(),
			fragment = document.createDocumentFragment(),
    		datas = this.loan.calculate(true);

    	this.startIndex = (selectedIndex-5 < 0) ? 0 : selectedIndex-5;
    	this.endIndex = (this.startIndex+10 >= datas.length) ? datas.length-1 : this.startIndex+10;
        $(".details-section div").remove();
        
        if(this.startIndex > 0) {
        	$(".details-section").append(ich.loadMoreTile({direction: "left"}));
        } else {
        	$(".left-tile").remove();
        }
        for(var i=this.startIndex; i <= this.endIndex; i++) {
            var tile = ich.detailTile(transformForHumans(datas[i]));
            tile.data(datas[i]);
            fragment.appendChild(tile[0]);
    	}    	
        $(".details-section").append(fragment);
        if(this.endIndex < datas.length-1) {
        	$(".details-section").append(ich.loadMoreTile({direction: "right"}))
        } else {
        	$(".right-tile").remove();
        }
        
        $(".detail-tile").css("height", height);
        var tilesWidth = $(".detail-tile").outerWidth(true) * (this.endIndex - this.startIndex + 1);
        $(".details-section").css("width", $(".left-tile").outerWidth(true) + tilesWidth + $(".right-tile").outerWidth(true)); //iScroll needs the width of child div
        
    	refreshScroll(that);
        var selector = ".tile-" + selectedMonth;
        that.stickyScroll.scrollToElement(selector, 100);
        that.highlight(selectedMonth);
    }

    this.scrollTo = function(month) {
    	this.append(month);
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
    
    function addLoadMoreHandlers() {
    	$(".load-more-tile").live("tap", function() {
    		var it = window.loanVisualizer.scroller,
    			monthIndex = $(this).hasClass("left-tile") ? it.startIndex+1 : it.endIndex+1;
    		it.append(monthIndex);
    	});
    }
}
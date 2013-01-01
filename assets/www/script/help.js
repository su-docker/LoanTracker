document.addEventListener("deviceready", function() {
	$(".help-icon").live("tap", function(e) {
		e.preventDefault();
		$(this).closest(".page").find(".help").toggle();
		
	});
	
	$(".help").live("tap", function() {
		$(this).toggle();
	});	
});
	

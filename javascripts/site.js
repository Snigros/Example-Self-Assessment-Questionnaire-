// Author: Simon Nix
// Thanks: Malsup's Cycle2 JQuery slideshow plugin - refer: http://jquery.malsup.com/cycle2/

;$(function(){

	// Initialise page
	$(document).foundation();
	
	var lastquestionslide = 10;	// Slide number of last question, slides after this are recommendations.
	var currentslide = 0;		// Current slide number.
	var nextslide = 0;			// Next slide to display.
	var lastslide = 0;			// Last slide which was displayed.
	var progress = '0%';
	
	// Initialise progress bar
	$('#progress').html('');
	$('#progress').css('width', progress);
	
	var questions = [
        {
        	number:	"0",
            nextNo: "11",
			nextYes: "1",
			previous: "0"
    	},
		
		{
        	number:	"1",
            nextNo: "2",
			nextYes: "3",
			previous: "0"
    	},
		
		{
        	number:	"2",
            nextNo: "12",
			nextYes: "3",
			previous: "1"
    	},
		
		{
        	number:	"3",
            nextNo: "13",
			nextYes: "4",
			previous: "1"
    	},				
			
		{
        	number:	"4",
            nextNo: "5",
			nextYes: "14",
			previous: "3"
    	},		
			
		{
        	number:	"5",
            nextNo: "6",
			nextYes: "15",
			previous: "4"
    	},		

		{
        	number:	"6",
            nextNo: "7",
			nextYes: "16",
			previous: "5"
    	},	
			
		{
        	number:	"7",
            nextNo: "8",
			nextYes: "17",
			previous: "6"
    	},

		{
        	number:	"8",
            nextNo: "9",
			nextYes: "18",
			previous: "7"
    	},			
		
		{
        	number:	"9",
            nextNo: "10",
			nextYes: "19",
			previous: "8"
    	},

		{
        	number:	"10",
            nextNo: "21",
			nextYes: "20",
			previous: "9"
    	}		
	];
	
	
	// Actions...
	
	$('button').on('click', function() {
		lastslide = nextslide;
		currentslide = $('#questionnaire').data('cycle.opts').currSlide;
		var lastbutton = String($(this).attr("id"));
		var regExp = new RegExp("Yes");
		
		if (regExp.test(lastbutton)) {
			// Button pressed has an ID with "Yes" in it...
			nextslide = questions[currentslide].nextYes;
		} else {
			nextslide = questions[currentslide].nextNo;
		}
		displaySlide(nextslide);
	});
	
	
	$('#back').on('click', function() {
		currentslide = $('#questionnaire').data('cycle.opts').currSlide;
		
		if (currentslide <= lastquestionslide) {
			nextslide = questions[currentslide].previous;
		} else {
			nextslide = lastslide;
		}
		displaySlide(nextslide);
	});	

	
	$('#restart').on('click', function() {
		nextslide = 0;
		lastslide = 0;
		displaySlide(nextslide);
	});	
	
	
	function displaySlide(nextslide) {
	
		if (nextslide > 0) {
			// If not the first slide display the back and restart buttons.
			$('#back').fadeIn("slow");
			$('#restart').fadeIn("slow");
			
			// Calculate progress
			if (nextslide <= lastquestionslide) {
				// Question slide.
				progress = String((nextslide/(lastquestionslide+1) * 100).toFixed(0)) + "%";
			} else {											
				// Recommendation slide.
				progress = "100%";							
			}
		} else {
			progress="0%";
			$('#back').hide();
			$('#restart').hide();
		}
		
		// Update progress bar
		$('#progress').html(progress);
		$('#progress').css('width', progress);
		
		// Proceeed to next question (slide) in sequence.
		$('.cycle-slideshow').cycle('goto', nextslide);
	};
});
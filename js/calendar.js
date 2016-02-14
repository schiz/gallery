$(document).ready(function(){
// Датапикер

	var winWidth = $(document).width();

	

	if( $('.datepicker').length > 0 ){

		if(winWidth > 400) {
			$.datepicker.regional[''] = {

				dayNamesMin: ['SUN','MON','TUES','WED','THU','FRI','SAT'],

			};	
		}
		else {
			$.datepicker.regional[''] = {

				dayNamesMin: ['S','M','T','W','T','F','S'],

			};	
		}
	$.datepicker.setDefaults($.datepicker.regional['']);
	$('.datepicker').datepicker();		
	}

	$(window).resize(function(){
		$('.datepicker').datepicker('destroy');
		$.datepicker.setDefaults($.datepicker.regional['']);

		var winWidth = $(document).width();
		if(winWidth > 400) {
			$.datepicker.regional[''] = {

				dayNamesMin: ['SUN','MON','TUES','WED','THU','FRI','SAT'],

			};			
		}
		else {
			$.datepicker.regional[''] = {

				dayNamesMin: ['S','M','T','W','T','F','S'],

			};	
		}

		$('.datepicker').datepicker();
	});	
});
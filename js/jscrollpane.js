// Ipad Iphone
if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))||(navigator.userAgent.match(/Android/i))) {
 		var isTouchScreen = 1;
 	}else{
 		var isTouchScreen = 0;
 	}


$container.bind('touchstart', function(e){
	var cpos = dragPosition;					
	if(isTouchScreen){
		e = e.originalEvent.touches[0];
	}
	var sY = e.pageY;
	var sX = e.pageX;


	$container.bind('touchmove',function(ev){
		if(isTouchScreen){
			ev.preventDefault();
			ev = ev.originalEvent.touches[0];
		}						

		var top = cpos-(ev.pageY-sY);
		positionDrag(top);

	});

	$container.bind('touchend',function(ev){
		$container.unbind('touchmove touchend');
	});
});
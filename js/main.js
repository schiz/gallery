$(document).ready(function(){
	
	



	// Вспомогательная навигация для мобильных устройств

	var main_nav = $('.main_nav'),

		sidebar = $('.sidebar'),

		speed = 300;



	$('.nav_button').on('click', function(e){

		main_nav.stop();

		main_nav.slideToggle(speed);

	})



	$('body').on('click', function(event){

		var target = $(event.target);

		if(!target.parents().hasClass('dropdown') && !target.hasClass('menuButton')){

			//don't close main nav if its not mobile

			if($(window).width() < 768){

				main_nav.slideUp(speed);

			}

			sidebar.slideUp(speed);

		}

	});



	// Всплывающий сайдбар

	$('.menuButton').click(function(){

		var sidebar = $('.sidebar'),

			speed = 500;



		// sidebar.slideDown(speed);

		sidebar.slideDown(speed, function(){

			// sidebar.css({

			// 	minHeight: '100%',

			// 	height: 'auto'

			// });



		// if ( $.browser.opera ) {

		// 	sidebar.css({

		// 		minHeight: '100%',

		// 		height: '578px;'

		// 	});

		// }else{

		// 	sidebar.css({

		// 		// minHeight: '100%',

		// 		height: '578px;'

		// 	});

		// }

		if( $('#freewall').length > 0 ){

			$('html').css('overflow-x', 'hidden');

		$('html').css('overflow-y', '');

		wall.refresh();

		
		}

		})
	})



	// // Поддержка клика для iPad

	// var ua = navigator.userAgent, 

 //    event = (ua.match(/iPad/i) || ua.match(/iPhone/i)) ? "touchstart" : "click";

 	

	// $('body, .main_nav a').bind(event, function(){

	// 	var sidebar = $('.sidebar'),

	// 		speed = 300;



	// 	// sidebar.slideUp(speed);



	// 	if( sidebar.is(':hidden') ) return false;



	// 	sidebar.animate({

	// 		'height': 0

	// 	}, speed, function(){

	// 		sidebar.css({

	// 			height: '100%',

	// 			display: ''

	// 		});

	// 		$('html').css('overflow-x', '');

	// 	});



	// 	sidebar.css({

	// 		minHeight: '',

	// 		height: ''

	// 	});



	// 	$('html').css('overflow-y', '');



	// })



	// $('.menuButton, .sidebar').on('click touchstart', function(e){

	// 	e.stopPropagation();

	// })



	// Grid gallery

	// var temp = "<div class='cell' style='width:{width}px; height: {height}px; background-image: url(gallery_img/img{index}.jpg)'></div>";

	// var w = 480, h = 260, html = '', limitItem = 12;

	// for (var i = 0; i < limitItem; ++i) {

	// 	html += temp.replace(/\{height\}/g, h).replace(/\{width\}/g, w).replace("{index}", i + 1);

	// }



	// $("#freewall").html(html);

	// var gutter = 20;
	//     function cellSize(containerWidth) {
	//         if (containerWidth <= 800) {
	//             var colNum = 1;
	//         }
	//         return (containerWidth / colNum) - gutter;
	//     }

	if( $('#freewall').length > 0 ){
	var wall = new freewall("#freewall");
	wall.reset({
		selector: '.cell',
		animate: false,
		cellW: function(width) {
			if (width <= 800) {
				var cellWidth = width / 1;	
				return cellWidth - 20;
			}
			else {
		    	var cellWidth = width / 4;
		    	return cellWidth - 20;
			}
		},
		// cellW: 350, 
		// cellW: cellSize,
		cellH: 247,
		gutterX: 0,
		gutterY: 0,
		onResize: function() {
			wall.refresh();
		}
		// onResize: function (container) {
  //           var containerWidth = container.width();
            
  //           if (containerWidth <= 800) {
  //               container.attr("class", "full-width");
  //           }
  //           // wall.fitWidth();
  //           wall.refresh();
  //           document.title = containerWidth;
  //       }
	});
	wall.fitWidth();
	// for scroll bar appear;
	$(window).trigger("resize");
	// wall.container.find('.cell img').load(function () {
	//     $(window).trigger("resize");
	// });
}




	// Фильтр галереи

	$('.main_nav a').click(function(){

		$('.main_nav a').removeClass('active');

		var filter = $(this).addClass('active').data('filter');



		if ( $(this).hasClass('filterActive') ) return false;

		$(this).addClass('filterActive').siblings().removeClass('filterActive');



		// Решение бага со скролом

		var windowHeight = window.innerHeight,

			pageHeight = $('html').innerHeight(),

			gallery = $('#freewall'),

			galleryHeight = gallery.height(),

			galleryWidth = gallery.width(),

			photoHeight = $('.cell:visible', gallery).height(),

			photoWidth = $('.cell:visible', gallery).width(),

			photoNum =  $(filter, gallery).length || $('.cell:last-child', gallery).index()+1;



		var futureHeight = pageHeight - galleryHeight + (photoHeight * photoNum / Math.ceil(galleryWidth / photoWidth));



		// console.log('pageHeight: ' + pageHeight + ' futureHeight:' + futureHeight);



		$('html').css('overflow-x', 'hidden');



		if ( windowHeight > futureHeight){

			$('html').css('overflow-y', 'hidden');

		}else{

			$('html').css('overflow-y', 'scroll');

		}



		if (filter) {

			wall.filter(filter);

		} else {

			wall.unFilter();

		}



		// $('html').css('overflow', '');



		return false;

	})



	// Филтр-затухание галереи

	$('.main_nav a').mouseenter(function(){

		var filter = $(this).data('filter');



		$(this).addClass('active').siblings().removeClass('active');



		if (!filter){

			$('#freewall .cell').removeClass('hide');

			$('.gallery_2 .row').removeClass('hide');

		}else{

			$('#freewall .cell').addClass('hide');

			$('.gallery_2 .row').addClass('hide');

			$(filter, '#freewall').removeClass('hide');

			$(filter, '.gallery_2').removeClass('hide');

		}



	})



	

	// Селектбокс

	if( $('select').length > 0 ){

		$("select").selectbox();

	}

	// $(function () {

	// 	$("select").selectbox();

	// });



	// Табы

	$('.tabs_wrap').each(function(){

		var root = $(this),

			titles = $('.tabs_title a', root),

			content = $('.tabs_content li', root);



		content.first().show().siblings().hide();

		titles.first().addClass('active');



		titles.click(function(){

			var pos = $(this).index();



			$(this).addClass('active').siblings().removeClass('active');

			content.eq(pos).show().siblings().hide();



			return false;

		})

	})



	// Аккордион

	$('.accordion').each(function(){

		var root = $(this),

			titles = $('h3', root),

			speed = 400,

			block = false;



		titles.first().next('.accordion_text').siblings('.accordion_text').hide();



		titles.click(function(){

			if (block) return false; block = true;

			$(this).next('.accordion_text').slideDown(speed, function(){

				block = false;

			})

			.siblings('.accordion_text').slideUp(speed);

		})

	})



	// Слайдер

	$('.simpleSlider').each(function(){

		var root = $(this),

			slides = $('.slides', root),

			buttons = $('.prev, .next', root),

			pos = 0,

			slideWidth = 0,

			slidesLength = $('li', slides).length - 1,

			speed = 400,

			block = false;



		$(window).load(function(){

			slideWidth = $('li', slides).width();

		})



		buttons.click(function(){



			if(block) return false; block = true;

			if ( $(this).hasClass('prev') ){

				pos--;

			}else{

				pos++;

			}



			if ( pos < 0 ) pos = slidesLength;

			if ( pos > slidesLength ) pos = 0;



			slides.animate({

				'left': -(pos * slideWidth)

			}, function(){

				block = false;

			})



			return false;

		})

	})



	// Слайдер с пагинатором

	$('.pagerSlider').each(function(){

		var root = $(this),

			slides = $('.slides li', root),

			pager = $('.pager', root),

			pagerContent = '';



		slides.first().siblings().hide();



		for ( var i=0; i<slides.length; i++ ){

			pagerContent+= '<a href="#"></a> '

		}



		pager.append(pagerContent);

		$('.pager a').first().addClass('active');



		$('a', pager).click(function(e){

			var link = $(this),

				pos = link.index();



			link.addClass('active').siblings().removeClass('active');

			slides.eq(pos).show().siblings().hide();

			event.preventDefault();

		})



	})



	// Инпут количества товаров

	$('.select_num').each(function(){

		var root = $(this),

			buttons = $('.minus, .plus', root),

			input = $('input:text', root);



		buttons.click(function(){

			var text = input.val();



			if ($(this).hasClass('minus')){

				text--;

			}else{

				text++;

			}



			if(text < 1) text = 1;



			input.val(text);



		})

	})



	//smoothdivscroll - вызов горизонтальной прокрутки

	if ($('body').hasClass('gorizontal-scroll')) {

		$(".makeMeScrollable").smoothDivScroll({

		mousewheelScrolling: "allDirections",

		manualContinuousScrolling: true,

		touchScrolling: true,

		});

	}



    //bxslider - вызов слайдера

    if($('body').hasClass('resize-slider')) {

	    $('.bxslider').bxSlider();
	 //    $(window).resize(function() {
  //   		slider = $('.bxslider').bxSlider();
    		

  //   		setTimeout(function() {
		// 		slider.destroySlider();		
  //   		}, 10);
  //   		setTimeout(function() {
		// 		$('.bxslider').bxSlider();		
  //   		}, 20);

		// });

    }



	//section gallery on page 7_1_shortcodes

	if($(window).width() < 768) {

		$('.slide_galley_content').hide();

		$('.slide_gallery').each(function(){

		var $this = $(this),

			li = $this.find('li');



			li.on('click', function(){

				var $this = $(this);



				$this.addClass('open').siblings().removeClass('open');

				if ($this.hasClass('open')) {

					$('.slide_galley_content-mobile').show();

				};

			})

		})

	}





	 sliderHeight();

    function sliderHeight() {

        var sliderHeight = $(window).height();

            $('.fullscreen_slider .slide').height(sliderHeight);

            $('.prev_button,.next_button').css('margin-top',sliderHeight/2 - 50);

    }



    $(window).resize(function(){

          sliderHeight();

    });







    //Slider for рage 0_6_gallery_fullscreen



	window.sliderWidth = $(window).width();



    $('.prev_button').on('click', function(){

		$(this).siblings('.slide.animated')

		.first()

		.removeClass('animated')

		.animate({

			opacity:1

		},300);

	});



	$('.next_button').on('click', function(){

		var slides      = $(this).siblings('.slide'),

		    slidesCount = $('.fullscreen_slider .slide').length,

			animCount   = $('.fullscreen_slider .slide.animated').length;



		if(animCount >= slidesCount - 1){

			slides.removeClass('animated').animate({

				opacity:1

			},300);

			return;

		}

		slides

			.not('.animated')

			.last()

			.addClass('animated')

			.animate({

				opacity:0

			},300);



	});



	//hover on main page and on page page 0_4
	$('.cell,.row').hover(
		function (){
			if(!$(this).hasClass('hide')){
				$(this).find('.description').show();
			}
			else {
				$(this).find('.description').hide()
			}
		},
		function (){
			$(this).find('.description').hide();
		}
	);

	//hover on page 0_4
	// $('.row').hover(
	// 	function (){
	// 		if(!$(this).hasClass('hide')){
	// 			$(this).find('.description').show();
	// 		}
	// 		else {
	// 			$(this).find('.description').hide()
	// 		}
	// 	},
	// 	function (){
	// 		$(this).find('.description').hide();
	// 	}
	// );
})



$(window).load(function(){

	 	//freewall for page 0_4
if( $('.gallery_2').length > 0 ){
    var gallery_wall = new freewall(".gallery_2");

		gallery_wall.reset({

			selector: '.row',

			animate: false,

			cellW: 'auto',

			cellH: 260,

			gutterX: 60,

			// gutterY: 110,

			onResize: function() {

				gallery_wall.refresh();

			}

		});

		gallery_wall.fitWidth();

		// for scroll bar appear;

		$(window).trigger("resize");
}

	//нахождение ширины блока и подстройка description под эту ширину автоматически
	$('.wrap img').each(function(){
		var widthBlock = $(this).width();
		$(this).parents('.wrap').width(widthBlock);
	});

})
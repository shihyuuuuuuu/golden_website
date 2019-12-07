$(document).ready(function() {
	$('.ui.dropdown').dropdown({
		action: 'hide',
	});

    $('#main-wrap').waypoint(function(){
		$('#main-wrap').toggleClass('fade');
    },{offset:-1});

    $('.ui.fluid.card .image').dimmer({
        on: 'hover'
    });

    $('.hamburger').click(function(e){
		$menu = $(this).parent();
		if(!$(this).hasClass('active')) {
			$(this).addClass('active');
			$menu.addClass('open');
		} else {
			$(this).removeClass('active');
			$menu.removeClass('open');
		}
		e.preventDefault();
	});
});

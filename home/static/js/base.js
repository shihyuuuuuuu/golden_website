$(document).ready(function() {
    $('#main-wrap').waypoint(function(){
        $('#main-wrap').toggleClass('fade');
    },{offset:-10});

    $('.ui.fluid.card .image').dimmer({
        on: 'hover'
    });
});


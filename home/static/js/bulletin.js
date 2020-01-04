$(document).ready(function(){
    $('#hamburger .item:nth-child(-n+3)').css('display','none'); 

    $('.ui.list .item i').click(function(){
        $(this).toggleClass( 'circle outline');
        $(this).toggleClass( 'check circle');
    });
    $('.myclass .menu .item:first').addClass('active');
})
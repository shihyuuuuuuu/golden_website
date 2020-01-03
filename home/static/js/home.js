$(document).ready(function(){
    var value = JSON.parse(document.getElementById('course-data').textContent);

    var myTable = "";
    var width = $(window).width();
    for(var i = 0; i < Object.keys(value).length; ++i){
        var id = "class" + i.toString();
        myTable += "<tr><td id=\"" + id + "\">" + value[i].name + "</td></tr>";
    }
    if(i == 0){
        myTable += "<tr><td>" + "今天沒課喔！" + "</td></tr>";
    }
    document.getElementById('course_insert').innerHTML = myTable;
    
    $('#main-wrap').waypoint(function(){
        $("#about-us").addClass('animated fadeInUp');
        $("#about-us").css("visibility", "visible");
    },{offset:-12});

    $('#about-us').waypoint(function(){
        $("#english").addClass('animated fadeInUp');
        $("#english").css("visibility", "visible");
    },{offset:-12});

    $('#english').waypoint(function(){
        $("#math").addClass('animated fadeInUp');
        $("#math").css("visibility", "visible");
    },{offset:-12});

    $('#math').waypoint(function(){
        $("#tech").addClass('animated fadeInUp');
        $("#tech").css("visibility", "visible");
    },{offset:-12});

    $('.double.right.icon') 
        .transition('set looping')
        .transition('slide left', '800ms');

    /*$("#down-icon").mouseenter(function(){
        $(this).transition('jiggle');
    });*/

    $("#down-icon")
        .transition('set looping')
        .transition('jiggle', '1000ms');

    $("#down-icon").click(function(){
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#about-us").offset().top - 150
        }, 1000);
    });

    $("#bar_about").click(function(){
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#about-us").offset().top - 150
        }, 1000);
    });

    $("#bar_philo").click(function(){
        if(width >= 767){
            y_dist = 240;
        }else{
            y_dist = 300;
        }
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#about-us").offset().top + y_dist
        }, 1000);
    });
    
    $("#bar_eng").click(function(){
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#english").offset().top - 150
        }, 1000);
    });
    
    $("#bar_math").click(function(){
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#math").offset().top - 150
        }, 1000);
    });
    
    $("#bar_tech").click(function(){
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#tech").offset().top - 150
        }, 1000);
    });
    
    $("#child_english").modal('attach events', '.dimmer .button', 'show');
    $("#week_schedule").modal('attach events', '#schedule_link i, #schedule_link a', 'show');
    $("#week_schedule").modal('attach events', '#schedule_btn', 'show');

    if(width < 767){
        $('#sche_tbl table').removeClass('right aligned');
        $('#sche_tbl table').addClass('center aligned');
        $('#footer .very.relaxed.list').removeClass('horizontal');
    }
});


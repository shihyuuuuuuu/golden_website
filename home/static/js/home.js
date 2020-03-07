function schedule_tbl(courses) {
    var myTable = "";

    for (var i = 0; i < Object.keys(courses).length; ++i) {
        var id = "class" + i.toString();
        myTable += "<tr><td id=\"" + id + "\">" + courses[i].name + "</td></tr>";
    }
    if (i == 0) {
        myTable += "<tr><td>" + "今天沒課喔！" + "</td></tr>";
    }
    return myTable;
}

function click_and_scroll(clicked_id, scroll_id, top_offset) {
    $("#" + clicked_id).click(function () {
        $('.hamburger_icon').removeClass('active');
        $('.hamburger_icon').parent().removeClass('open');
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#" + scroll_id).offset().top - top_offset,
        }, 1000);
    });
}

$(document).ready(function () {
    var width = $(window).width();
    var courses = JSON.parse(document.getElementById('course-data').textContent);

    /* Render the schedule table */
    document.getElementById('course_insert').innerHTML = schedule_tbl(courses);

    /* Waypoints(Scroll the screen automatically) */
    $('#main-wrap').waypoint(function () {
        $("#vision").addClass('animated fadeInUp');
        $("#vision").css("visibility", "visible");
    }, { offset: -12 });

    /* Icon animations */
    $('.double.right.icon')
        .transition('set looping')
        .transition('flash', '3000ms');

    $("#down-icon")
        .transition('set looping')
        .transition('jiggle', '1000ms');

    $('#edit_banner').click(function () {
        $("#fileInput").click();
    })

    /* Menu buttons */
    click_and_scroll('down-icon', 'vision', 50);
    click_and_scroll('menu_eng', 'eng', 100);
    click_and_scroll('menu_math', 'math_sci', 100);
    click_and_scroll('menu_maker', 'maker', 20);

    /* Modals */
    $("#week_schedule").modal('attach events', '#schedule_link i, #schedule_link a', 'show');
    $("#week_schedule").modal('attach events', '#schedule_btn', 'show');

    /* For mobile devices */
    if (width < 767) {
        $('#sche_tbl table').removeClass('right aligned');
        $('#sche_tbl table').addClass('center aligned');
        $('#footer .very.relaxed.list').removeClass('horizontal');
    }
});


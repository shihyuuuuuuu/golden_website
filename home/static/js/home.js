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


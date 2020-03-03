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

function add_waypoint(id, direction, top_offset, offset) {
    return $('#' + id).waypoint(function () {
        if (scroll_direction == direction && mousedown == 0) {
            console.log(id, direction);
            $([document.documentElement, document.body]).animate({
                scrollTop: $('#' + id).offset().top - top_offset,
            }, 400);
        }
    }, { offset: offset })[0];
}

function waypoints_ctrl(waypoints, enable) {
    waypoints.forEach(function (item) {
        if (enable) {
            item.enable();
        } else {
            item.disable();
        }
    });
}

function click_and_scroll(waypoints, clicked_id, scroll_id, top_offset) {
    $("#" + clicked_id).click(function () {
        $('.hamburger_icon').removeClass('active');
        $('.hamburger_icon').parent().removeClass('open');
        waypoints_ctrl(waypoints, 0);
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#" + scroll_id).offset().top - top_offset,
        }, 1000, function () {
            if ($(window).width() >= 767)
                waypoints_ctrl(waypoints, 1);
        });
    });
}

$(document).ready(function () {
    var width = $(window).width();
    var waypoints = [];
    var courses = JSON.parse(document.getElementById('course-data').textContent);
    scroll_direction = 0; // 0 for downscroll, 1 for upscroll
    mousedown = 0;

    /* Render the schedule table */
    document.getElementById('course_insert').innerHTML = schedule_tbl(courses);

    /* Waypoints(Scroll the screen automatically) */
    $('#main-wrap').waypoint(function () {
        $("#vision").addClass('animated fadeInUp');
        $("#vision").css("visibility", "visible");
    }, { offset: -12 });
    waypoints.push(add_waypoint('class_struct', 1, 80, '65%'));
    waypoints.push(add_waypoint('class_struct', 0, 80, '-50%'));
    waypoints.push(add_waypoint('eng', 1, 100, '65%'));
    waypoints.push(add_waypoint('eng', 0, 100, '-30%'));
    waypoints.push(add_waypoint('math_sci', 1, 100, '65%'));
    waypoints.push(add_waypoint('math_sci', 0, 100, '-30%'));
    waypoints.push(add_waypoint('maker', 1, 20, '65%'));
    waypoints.push(add_waypoint('maker', 0, 20, '-30%'));

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
    click_and_scroll(waypoints, 'down-icon', 'vision', 50);
    click_and_scroll(waypoints, 'menu_eng', 'eng', 100);
    click_and_scroll(waypoints, 'menu_math', 'math_sci', 100);
    click_and_scroll(waypoints, 'menu_maker', 'maker', 20);

    /* Modals */
    $("#week_schedule").modal('attach events', '#schedule_link i, #schedule_link a', 'show');
    $("#week_schedule").modal('attach events', '#schedule_btn', 'show');

    /* For mobile devices */
    if (width < 767) {
        $('#sche_tbl table').removeClass('right aligned');
        $('#sche_tbl table').addClass('center aligned');
        $('#footer .very.relaxed.list').removeClass('horizontal');
        waypoints_ctrl(waypoints, 0);
    }

    /* Detect scroll and mouse events */
    var lastScrollTop = 0;
    window.addEventListener("scroll", function () {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            scroll_direction = 1; // upscroll
        } else {
            scroll_direction = 0; // downscroll
        }
        // For Mobile or negative scrolling
        lastScrollTop = st <= 0 ? 0 : st;
    }, false);

    window.addEventListener('mousedown', function () {
        mousedown = 1;
    });

    window.addEventListener('mouseup', function () {
        mousedown = 0;
    })

    /* Disable browser autoscroll after refresh */
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
});


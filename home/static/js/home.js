var value = JSON.parse(document.getElementById('course-data').textContent);

var myTable = "";
for(var i = 0; i < Object.keys(value).length; ++i){
    var id = "class" + i.toString();
    myTable += "<tr><td id=\"" + id + "\">" + value[i].name + "</td></tr>";
}
if(i == 0){
    myTable += "<tr><td>" + "今天沒課喔！" + "</td></tr>";
}
document.getElementById('course_insert').innerHTML = myTable;


$("#down-icon").mouseenter(function(){
    $(this).transition('jiggle');
});

$(document).ready(function(){
    $('#main-wrap').waypoint(function(){
        //$(".grey").transition({animation:'vertical flip', duratoin:'2s', disable:true});
    $("#about-us").addClass('animated fadeInUp');
    $("#about-us").css("visibility", "visible");
    },{offset:-40});
});

$("#down-icon").click(function(){
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#about-us").offset().top - 150
    }, 1000);
});

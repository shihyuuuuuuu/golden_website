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



$(document).ready(function(){
    $('#main-wrap').waypoint(function(){
        $("#about-us").addClass('animated fadeInUp');
        $("#about-us").css("visibility", "visible");
    },{offset:-30});
    
    $('#about-us').waypoint(function(){
        $("#english").addClass('animated fadeInUp');
        $("#english").css("visibility", "visible");
    },{offset:-30});

    $('#english').waypoint(function(){
        $("#math").addClass('animated fadeInUp');
        $("#math").css("visibility", "visible");
    },{offset:-30});
    
    $('#math').waypoint(function(){
        $("#tech").addClass('animated fadeInUp');
        $("#tech").css("visibility", "visible");
    },{offset:-30});
    
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

    $("#child_english").modal('attach events', '.dimmer .button', 'show');
    $("#week_schedule").modal('attach events', '#clock i, #clock a', 'show');
});


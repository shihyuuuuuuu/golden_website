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

$("#down-icon").click(function(){
    $([document.documentElement, document.body]).animate({
        scrollTop: $(".grey.content-block").offset().top - 150
    }, 1000);
});

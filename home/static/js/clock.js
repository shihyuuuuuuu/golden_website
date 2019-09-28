var c = document.querySelector("#clock canvas");
var ctx = c.getContext("2d");

var ww = $("#clock").innerWidth()-20;
var wh = $("#clock").innerHeight()-20;

c.width = ww;
c.height = wh;

colors = ["orange", "green", "rgb(244, 91, 105)"];
// 把課程時間轉成時鐘上的角度
var value = JSON.parse(document.getElementById('course-data').textContent);
function time_to_angle(time){
    var timeArray = time.split(":");
    var hr = timeArray[0];
    var min = timeArray[1];

    hr = (hr > 12) ? hr-12 : hr;
    var ang = 90 - (hr * 30) - (min/2);
    
    return (ang < 0) ? ang+360 : ang;
}

function getWindowSize(){
    ww = $("#clock").innerWidth()-20;
    wh = $("#clock").innerHeight()-20;
    c.width = ww;
    c.height = wh;

    //重新設定中心點
    center={x: ww/2,y: wh/2};

    //將畫布的零點偏移到中心
    ctx.restore();
    ctx.translate(center.x,center.y);
}

$(window).resize(getWindowSize);
getWindowSize();

var time = 0;

setInterval(draw, 10);
function draw(){

    //清除背景
    ctx.fillStyle = "#1a1a7fff";
    ctx.beginPath();
    //起點/長/寬
    ctx.rect(-2000,-2000,4000,4000);
    ctx.fill();

    //坐標軸
    ctx.strokeStyle="rgba(255,255,255,0.1)";
    ctx.lineWidth=1;
    //x
    ctx.moveTo(-ww/3,0);
    ctx.lineTo(ww/3,0);
    //y
    ctx.moveTo(0,-wh/3);
    ctx.lineTo(0,wh/3);
    ctx.stroke();

    //------------------------------
    //繪製變動弧線
    //設定半徑
    var r=ww/4.4;
    //將角度轉換為弧度
    var deg_to_pi=Math.PI/180;

    //重新開始繪製
    ctx.beginPath();
    ctx.lineWidth=1;
    for(var i=0;i<=200;i++){
        //設定變動的半徑跟角度
        // var var_r = r;
        var var_r = r + Math.sin(Math.PI*2*i/10+time/20)*1;
        var deg = (i/200)*360 * deg_to_pi;
        //連線
        ctx.lineTo(
            var_r * Math.cos(deg),
            var_r * Math.sin(deg)
        );
    }
    //設定顏色跟繪製
    ctx.strokeStyle="#FFF";
    ctx.stroke();

    //-----------------------------
    //繪製刻度（內圈）

    var r = ww/4;
    var count = 240;

    ctx.lineWidth=1;
    for(var i=0;i<=count;i++){

        //最基本的角度分佈
        var deg = 360*(i/count)*deg_to_pi;

        //往內偏移的量
        var pan=(i % 60 == 0 ? -4 : 0);

        //長度(用於數設定特定大小)
        var len= 4 + (i % 10 == 0?4:0) + (i % 60 == 0?8:0);
        var opacity=(len>4)?1:0.7;

        //開始分結束的半徑
        var start_r = r+pan;
        var end_r = r+pan+len;

        //重新開始繪製
        ctx.beginPath();
        ctx.moveTo(
            (start_r) * Math.cos(deg),
            (start_r) * Math.sin(deg)
        );
        ctx.lineTo(
            (end_r) * Math.cos(deg),
            (end_r) * Math.sin(deg)
        );

        //設定繪製顏色跟透明度
        ctx.strokeStyle="rgba(255,255,255,"+opacity+")";
        //繪製
        ctx.stroke();

    }
    //------------------------------
    //繪製刻度（外圈）

    var r = ww/3;
    var count = 60;

    ctx.lineWidth=1;
    for(var i=0;i<=count;i++){
        //往內偏移的量
        var pan=(i % 60 == 0?-4:0);
        //長度(用於數設定特定大小)
        var len= 4 + (i % 15 == 0?4:0);
        var opacity=(len>4)?1:0.7;
        var deg=360*(i/count)*deg_to_pi;

        var start_r=r;
        var end_r=r+len;

        //重新開始繪製
        ctx.beginPath();
        ctx.moveTo(
            (start_r)*Math.cos(deg),
            (start_r)*Math.sin(deg)
        );
        ctx.lineTo(
            (end_r)*Math.cos(deg),
            (end_r)*Math.sin(deg)
        );

        //設定繪製顏色跟透明度
        ctx.strokeStyle="rgba(255,255,255,"+opacity+")";
        //繪製
        ctx.stroke();

    }

    //-----抓取現在的時間
    var now=new Date();
    var sec=now.getSeconds();
    var min=now.getMinutes();
    var hour=now.getHours();



    //畫指針的函數
    function drawPointer(r,deg,lineWidth){

        //清空
        ctx.beginPath();
        ctx.lineWidth=lineWidth;

        //轉換角度(因為從右邊開始)
        var sec_deg = deg + 90;

        //從中心出發
        ctx.moveTo(0,0);

        //畫線
        ctx.lineTo(
            r*0.8*Math.cos( sec_deg * deg_to_pi ),
            r*0.8*Math.sin( sec_deg * deg_to_pi )
        );

        //繪製
        ctx.stroke();
    }

    //角度- 刻度/總數
    //小時會有分鐘偏誤
    drawPointer(ww/2.5, -360 * ( (sec) / 60 ) , 1 );
    drawPointer(ww/3.6, -360 * ( (min) / 60 ) , 1 );
    drawPointer(ww/6.3, -360 * ( (hour + min / 60 ) / 12.0 ) , 4 );


    //繪製外框
    function drawArc(r, w, deg_min, deg_max, color){
        var count = 240;
        ctx.beginPath();
        ctx.lineWidth=w;
        for(var i=0;i<=count;i++){
            //將240個點平均分布在圓周上，加上一點點時間
            deg= 360 * ( i / count) + time / 200;
    
            //如果課堂時間橫跨0度（3點）
            if(deg_max < deg_min){
                min = deg_max;
                max = deg_min;

                if ( deg%360 > min  && deg%360 < max ){
                    //不成立就只移動點，不繪製
                    ctx.moveTo(
                        r * Math.cos( deg * deg_to_pi),
                        r * Math.sin( deg * deg_to_pi)
                    );
                }else{
                    //如果成立就預設要畫
                    ctx.lineTo(
                        r * Math.cos( deg * deg_to_pi),
                        r * Math.sin( deg * deg_to_pi)
                    );
                }
                continue;
            }

            //如果每180度以內餘數 > 90度
            if ( deg%360 > deg_min  && deg%360 < deg_max ){
                //如果成立就預設要畫
                ctx.lineTo(
                    r * Math.cos( deg * deg_to_pi),
                    r * Math.sin( deg * deg_to_pi)
                );
            }else{
                //不成立就只移動點，不繪製
                ctx.moveTo(
                    r * Math.cos( deg * deg_to_pi),
                    r * Math.sin( deg * deg_to_pi)
                );
            }
        }


        //設定樣式跟繪製
        ctx.strokeStyle=color;
        //將剛剛預設要畫的都畫出來
        ctx.stroke();
    }

    // 畫課表弧線
    for(var i = 0; i < Object.keys(value).length; ++i){
        drawArc(ww/3.1+i*8, 8, time_to_angle(value[i].end_time), time_to_angle(value[i].start_time), colors[i]);
    }


    drawArc(ww/2.4, 4, 90, 180, "white");
    drawArc(ww/2.4, 4, 270, 360, "white");

    //更新繪製的時間
    time=time+1;
}


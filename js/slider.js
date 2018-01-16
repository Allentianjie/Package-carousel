/**
 * Created by zx on 2017/11/24.
 */

function slider(obj){
    obj = obj||{};
    obj.selector =  obj.selector||"#slider";
    obj.dian = obj.dian||"normal";
    obj.width = parseInt(obj.width)||"800";
    obj.hight = parseInt(obj.hight)||"400";
    let img = $(obj.selector+" figure>img");
    let imgIndex = 0;
    let clientX,clientX1,clientX2;
    let figure = $(obj.selector+" figure");
    let box = $(obj.selector+">div");
    let circle = $(".circlePoint");
    $("body").attr("ondragstart","return false");
    box.css("width",obj.width*(figure.length+1));
    $(obj.selector).append(`<div id="sliderCircle">
    </div>`);
    for(let i=0;i<figure.length;i++){
        $("#sliderCircle").append(`<span cNum="${i}" class="circlePoint">o</span>`)
    }
    $(obj.selector).append(`<div id="sliderPage">
    <span id="currentPage">1</span>/${figure.length}
    </div>`);

    var timer1= setInterval(slideLeft,5000);//自动轮播
    $(obj.selector).mouseenter(function(){
        clearTimeout(timer1);
    });
    $(obj.selector).mouseleave(function(){
        timer1= setInterval(slideLeft,5000)
    });
    function slideLeft(){
        let figure = $(obj.selector+" figure");
        imgIndex++;
        if(imgIndex==figure.length){
            imgIndex=0
        }
        circle.css("color","white");
        $(circle[imgIndex]).css("color","red");
        $("#currentPage").html(imgIndex+1);
        //console.log(imgIndex);
        box[0].style.marginLeft="-"+obj.width+"px";
        box[0].style.transition="all 1s";
        setTimeout(function(){
            box[0].appendChild(figure[0]);
            box[0].style.transition="all 0s";
            box[0].style.marginLeft="0";
            //console.log("left in",(new Date()).getTime());
        },1000)
    }
    function slideRight(){
        let figure = $(obj.selector+" figure");
        imgIndex--;
        if(imgIndex<0){
            imgIndex=figure.length-1
        }
        circle.css("color","white");
        $(circle[imgIndex]).css("color","red");
        $("#currentPage").html(imgIndex+1);
        box[0].style.transition="all 0s";
        box[0].insertBefore(figure[figure.length-1],figure[0]);
        box[0].style.marginLeft="-"+obj.width+"px";
        setTimeout(function(){
            box[0].style.transition="all 1s";
            box[0].style.marginLeft="0";
                //console.log("right in",(new Date()).getTime());
        },0)
    }
    window.onmousedown=function(e){
        clientX1=e.clientX;
        window.onmouseup=function(e){
            clientX2=e.clientX;
            clientX = clientX1-clientX2;
            if(clientX>100){
                console.log("left");
                slideLeft()
            }
            if(clientX<-100){
                slideRight();
                console.log("right")
            }
            //})()
        };
    };
    circle.click(function () {
        let currentPage = $(this).attr("cnum");
        box[0].style.transition="all 1s";
        if(currentPage>imgIndex){
            for(let i=0;i<currentPage-imgIndex-1;i++){
                let figure = $(obj.selector+" figure");
                box[0].appendChild(figure[0]);
            }
            slideLeft();
        }
        if(currentPage<imgIndex){
            for(let i=0;i<imgIndex-currentPage-1;i++) {
                let figure = $(obj.selector + " figure");
                box[0].insertBefore(figure[figure.length - 1], figure[0]);
            }
            slideRight();
        }
        imgIndex=parseInt(currentPage);
        $("#currentPage").html(imgIndex+1);
        circle.css("color","white");
        $(this).css("color","red");
    });

}





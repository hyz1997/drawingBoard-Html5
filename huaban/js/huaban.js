//$(function(){
var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");
var Img;
var red = new Image();
var orange = new Image();
var yellow = new Image();
var green = new Image();
var blue = new Image();
var purple = new Image();
var white = new Image();
var paint = false;
var index;
var index2;
var arr = [];
var sizeArr = [];
var state = context.getImageData(0,0,canvas.width,canvas.height);
history.pushState(state,null);

arr.push(red,orange,yellow,green,blue,purple,white)

function prepareCanvas() {
    red.onload = function() { context.drawImage(red,70,145,10,10); 
    };
    red.src = "img/red_pen.png";

    orange.onload = function() { context.drawImage(orange,80,145,10,10); 
    };
    orange.src = "img/orange_pen.png";

    yellow.onload = function() { context.drawImage(yellow,90,145,10,10); 
    };
    yellow.src = "img/yellow_pen.png";    

    green.onload = function() { context.drawImage(green,100,145,10,10); 
    };
    green.src = "img/green_pen.png";

    blue.onload = function() { context.drawImage(blue,110,145,10,10); 
    };
    blue.src = "img/blue_pen.png";

    purple.onload = function() { context.drawImage(purple,120,145,10,10); 
    };
    purple.src = "img/purple_png.png";

    white.onload = function() { context.drawImage(white,130,145,10,10); 
    };
    white.src = "img/white.png";
    // Add mouse events
    // ----------------
    function addClick(x,y,ft,img) {
        paint = ft;
        if(paint) {
            
            context.drawImage(img,x,y,sizeArr[index2],sizeArr[index2]);
        }
    }
    $('#canvas').mousedown(function(e){
        Img = arr[index];
        var sx = canvas.width/canvas.offsetWidth;
        var sy = canvas.height/canvas.offsetHeight;
        var x = sx*e.clientX - (Img.naturalWidth/2)-100;
        var y = sy*e.clientY - Img.naturalHeight/2;
        paint = true;
        
        //console.log(Img.naturalWidth);
        addClick(x,y,true,Img);
    });

    $('#canvas').mousemove(function(e){
        if(paint==true){
            Img = arr[index];
            var sx = canvas.width/canvas.offsetWidth;
            var sy = canvas.height/canvas.offsetHeight;
            var x = sx*e.clientX - (Img.naturalWidth/2)-100;
            var y = sy*e.clientY - Img.naturalHeight/2;
            addClick(x,y,true,Img);
        }
    });

    $('#canvas').mouseup(function(e){
        paint = false;
    });
    console.log(sizeArr[index2]);

}
$("#color li").click(function(){
    
    index = $("#color li").index(this);
    //console.log(index)    
    prepareCanvas();
});
$("#size li").click(function() {
    index2 = $("#size li").index(this);
    sizeArr = [1,2,3];

})
$(".imgChange li").click(function() {
    var index3 =$(".imgChange li").index(this);
    console.log(index3);
    var imgArr = ["img/bg1.jpg","img/bg2.jpg","img/bg3.jpg","img/bg4.jpg"];
    console.log(imgArr[index3]);
    $("#canvas").css("background-image",'url('+imgArr[index3]+')');
})
window.addEventListener("popstate",loadState,false);
function loadState(e) {
    context.clearRect(0,0,canvas.width,canvas.height);
    if (e.state) {
        context.putImageData(e.state,0,0);
    };
}
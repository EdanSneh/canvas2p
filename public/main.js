var canvas, ctx;

window.addEventListener('keydown',this.check,false);

var socket = io();

var Player1;
var Player2;

function init(){
    Player1 = new component(30,30,"red", 10, 120, "rect");
    Player2 = new component(30,30, "blue", 120, 10, "rect")
    myGameArea.start();
}

function sclick(ele){
  if(event.key === 'Enter') {
    Player1.Info.name = ele.value
    init();
    ele.style.display = "none";
    socket.emit('register', ele.value);
  }
}

function check(e){
    code = e.keyCode
    if(code == 39){
        Player1.Info.update('right')
        socket.emit('information', Player1.Info.position);
    }
    if(code == 40){
        Player1.Info.update('down')
        socket.emit('information', Player1.Info.position);
    }
    if(code == 38){
      Player1.Info.update('up')
        socket.emit('information', Player1.Info.position);
    }
    if(code == 37){
      Player1.Info.update('left')
        socket.emit('information', Player1.Info.position);
    }
}





var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    var Info = {
      name: "none",
      position: {
        x: "none",
        y: "none",
      }
    }
    this.type = type;
    this.width = width;
    this.height = height;
    this.color = color;
    Info.position.x = x;
    Info.position.y =y;
    this.update = function(action) {
        ctx = myGameArea.context
        ctx.fillStyle = this.color;
        // ctx.fillRect(Info.position.x, Info.position.y, this.width, this.height);
        if(action == 'right'){
            Info.position.x = Info.position.x+10      
        }
        if(action == 'left'){
            Info.position.x = Info.position.x-10
        }
        if(action == 'down'){
            Info.position.y = Info.position.y+10
        }
        if(action == 'up'){
            Info.position.y = Info.position.y-10
        }
        ctx.fillText(Info.name, Info.position.x,Info.position.y-5);
        ctx.fillRect(Info.position.x, Info.position.y, this.width, this.height);
    }
    this.setX = function(x){
      Info.position.x = x;
      ctx.fillText(Info.name, Info.position.x,Info.position.y-5);
      ctx.fillRect(Info.position.x, Info.position.y, this.width, this.height);
    }
    this.setY = function(y){
      Info.position.y = y;
      ctx.fillText(Info.name, Info.position.x,Info.position.y-5);
      ctx.fillRect(Info.position.x, Info.position.y, this.width, this.height);
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGameArea.frameNo += 1;
    Player1.update("none")
}

socket.on('information', (info)=>{
  Player2.setX(info.x);
  Player2.setY(info.y)
})
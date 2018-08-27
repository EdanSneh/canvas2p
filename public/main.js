var canvas, ctx;

window.addEventListener('keydown',this.check,false);

var PlayerPosition = {
  name: "none",
  position: {
    x: "none",
    y: "none",
  }
}

var socket = io();

function sclick(ele){
  if(event.key === 'Enter') {
    PlayerPosition.name = ele.value
    init();
    ele.style.display = "none";
    socket.emit('register', ele.value);
  }
}

function check(e){
    code = e.keyCode
    if(code == 39){
        Player.update('right')
        socket.emit('information', PlayerPosition.position);
    }
    if(code == 40){
        Player.update('down')
        socket.emit('information', PlayerPosition.position);
    }
    if(code == 38){
        Player.update('up')
        socket.emit('information', PlayerPosition.position);
    }
    if(code == 37){
        Player.update('left')
        socket.emit('information', PlayerPosition.position);
    }
}

var Player;

function init(){
    Player = new component(30,30,"red", 10, 120, "rect");
    myGameArea.start();
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
    this.type = type;
    this.width = width;
    this.height = height;
    this.color = color;
    PlayerPosition.position.x = x;
    PlayerPosition.position.y =y;
    this.update = function(action) {
        ctx = myGameArea.context
        ctx.fillStyle = this.color;
        // ctx.fillRect(PlayerPosition.position.x, PlayerPosition.position.y, this.width, this.height);
        if(action == 'right'){
            PlayerPosition.position.x = PlayerPosition.position.x+10      
        }
        if(action == 'left'){
            PlayerPosition.position.x = PlayerPosition.position.x-10
        }
        if(action == 'down'){
            PlayerPosition.position.y = PlayerPosition.position.y+10
        }
        if(action == 'up'){
            PlayerPosition.position.y = PlayerPosition.position.y-10
        }
        ctx.fillText(PlayerPosition.name, PlayerPosition.position.x,PlayerPosition.position.y-5);
        ctx.fillRect(PlayerPosition.position.x, PlayerPosition.position.y, this.width, this.height);
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGameArea.frameNo += 1;
    Player.update("none")
}
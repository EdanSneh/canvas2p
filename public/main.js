var canvas, ctx;



var socket = io();

var Player1;
var Player2;
var isheld = false;

function init(){
    Player1 = new component(30,30,"red", 10, 120, "rect");
    Player2 = new component(30,30, "blue", 120, 10, "rect")
    myGameArea.start();
    window.addEventListener('keydown',this.hold,false);
    window.addEventListener('keyup',this.letgo,false);
}



function component(width, height, color, x, y, type) {
  this.info = {
    name: "none",
    position: {
      x: "none",
      y: "none",
    },
    speed: {
      sx: "none",
      sy: "none",
    }
  }
  this.type = type;
  this.width = width;
  this.height = height;
  this.color = color;
  this.info.position.x = x;
  this.info.position.y =y;
  this.update = function(action) {
      ctx = myGameArea.context
      ctx.fillStyle = this.color;
      // ctx.fillRect(this.info.position.x, this.info.position.y, this.width, this.height);
      if(action == 'right'){
        this.info.position.x += 1  
      }
      if(action == 'left'){
        this.info.position.x -= 10        
      }
      if(action == 'down'){
        this.info.position.y += 10    
      }
      if(action == 'up'){
        this.info.position.y -= 10        

      }
      ctx.fillText(this.info.name, this.info.position.x,this.info.position.y-5);
      ctx.fillRect(this.info.position.x, this.info.position.y, this.width, this.height);
  }
  this.setX = function(x){
    this.info.position.x = x;
    ctx.fillText(this.info.name, this.info.position.x,this.info.position.y-5);
    ctx.fillRect(this.info.position.x, this.info.position.y, this.width, this.height);
  }
  this.setY = function(y){
    this.info.position.y = y;
    ctx.fillText(this.info.name, this.info.position.x,this.info.position.y-5);
    ctx.fillRect(this.info.position.x, this.info.position.y, this.width, this.height);

  }
  this.setName = function(name){
    this.info.name = name;
  }
  this.stopRight = function(){
    isheld = false
  }
}






function sclick(ele){
  if(event.key === 'Enter') {
    init();
    Player1.info.name = ele.value
    ele.style.display = "none";
    socket.emit('register', ele.value);
  }
}

//For key events
function hold(e){
  code = e.keyCode
  if(code == 39 && isheld == false){
    isheld = true;
    //TODO: fix isheld to have an update function
      // Player1.update('right')
    socket.emit('information', Player1.info.position);
  }
  if(code == 40){
    Player1.update('down')
    socket.emit('information', Player1.info.position);
  }
  if(code == 38){
    Player1.update('up')
    socket.emit('information', Player1.info.position);
  }
  if(code == 37){
    Player1.update('left')
    socket.emit('information', Player1.info.position);
  }
}

function letgo(e){
  code = e.keyCode
  if(code = 39){
    Player1.stopRight()
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
        this.interval = setInterval(updateGameArea, 60);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGameArea.frameNo += 1;
  if(isheld == true){
    Player1.update("right");
    myGameArea.clear();
    Player1.update("right");
    myGameArea.clear();
    Player1.update("right");
    myGameArea.clear();
    Player1.update("right");
    myGameArea.clear();
    Player1.update("right");
  }
  else{
    Player1.update("none");
  }
    Player2.update("none");
}

socket.on('information', (info) => {
  Player2.setX(info.x);
  Player2.setY(info.y);
})

socket.on('match', (info) => {
  Player2.setName(info);
})

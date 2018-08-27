var canvas, ctx;

window.addEventListener('keydown',this.check,false);

function sclick(ele){
    if(event.key === 'Enter') {
        init();
        ele.style.display = "none";
        socket.emit('register', ele.value);
    }
}

function check(e){
    code = e.keyCode
    if(code == 39){
        Player.update('right')
    }
    if(code == 40){
        Player.update('down')
    }
    if(code == 38){
        Player.update('up')
    }
    if(code == 37){
        Player.update('left')
    }
}

var Player;

function init(){
    Player = new component(30,30,"red", 10, 120, "rect");
    myGameArea.start();
}

var PlayerPosition = {
    x: "none",
    y: "none",
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
    this.x = x;
    this.y = y;
    this.update = function(action) {
        ctx = myGameArea.context
        ctx.fillStyle = this.color;
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        if(action == 'right'){
            this.x = this.x+10
            ctx.fillRect(this.x, this.y, this.width, this.height);  
            socket.emit('position', );        
        }
        if(action == 'left'){
            this.x = this.x-10
            ctx.fillRect(this.x, this.y, this.width, this.height);           
        }
        if(action == 'down'){
            this.y = this.y+10
            ctx.fillRect(this.x, this.y, this.width, this.height);           
        }
        if(action == 'up'){
            this.y = this.y-10
            ctx.fillRect(this.x, this.y, this.width, this.height);           
        }
        else{
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGameArea.frameNo += 1;
    Player.update("none")
}
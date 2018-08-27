var canvas, ctx;

function sclick(ele){
    if(event.key === 'Enter') {
        init(ele.value)
        ele.style.display = "none";
    }
}

function init(name){

    canvas = document.getElementById('gameCanvas');
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx = canvas.getContext('2d');
    
    console.log(canvas.style.width);
    console.log(canvas.style.height);
    ctx.beginPath();
    ctx.arc(100,75,50,0,2*Math.PI);
    ctx.stroke();
    ctx.moveTo(0,0);
    ctx.lineTo(window.innerWidth, window.innerHeight);
    ctx.beginPath();
}

// function component(width, height, color, x, y, type) {
//     this.type = type;
//     this.
// }
var canvas, ctx;
function init(){

    canvas = document.getElementById('gameCanvas');
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(window.innerWidth, window.innerHeight);
    ctx.stroke();
}

window.onload = init;
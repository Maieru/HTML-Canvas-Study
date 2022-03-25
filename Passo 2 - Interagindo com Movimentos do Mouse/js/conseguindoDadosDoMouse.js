var canvas;
var context;
var mouseX;
var moudeY;
var botaoApertado;

$(document).ready(function (){
    canvas = $('#canvasTeste');
    context = canvas[0].getContext("2d");
    mouseX = 0;
    moudeY = 0;

    canvas.on('mousedown', e =>{
        x = e.offsetX;
        y = e.offsetY;
        botaoApertado = true;
    });

    canvas.on('mouseup', e =>{
        if (botaoApertado){
            desenhaLinha(context, x, y, e.offsetX, e.offsetY);
            x = 0;
            y = 0;
            botaoApertado = false;
        }
    });

    canvas.on('mousemove', e => {
        if (botaoApertado) {
            desenhaLinha(context, x, y, e.offsetX, e.offsetY);
            x = e.offsetX;
            y = e.offsetY;
          }
    })
})

function desenhaLinha(context, x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
  }
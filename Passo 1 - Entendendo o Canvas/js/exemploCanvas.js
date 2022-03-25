$(document).ready(function () {
    var canvas = $('#canvasTeste')[0];

    // O contexto é como uma ferramenta que faz o desenho no canvas
    var context = canvas.getContext("2d");

    // O código abaixo coloca o cursor no ponto 0,0 e depois desenha uma linha reta 
    // até a outra extremidade do canvas
    context.moveTo(0, 0);
    context.lineTo(canvas.width, canvas.height);
    context.stroke();

    // Também é possivel desenhar figuras complexas. O sistema de pontos basicamente funcina como um autoCad
    var raioDoCirculo = 20;

    context.beginPath();
    context.arc(canvas.width / 2 - raioDoCirculo, canvas.height / 2 - raioDoCirculo, raioDoCirculo, 0, 2 * Math.PI,)
    context.rect(canvas.width / 2 - 2 * raioDoCirculo, canvas.height / 2 - 2 * raioDoCirculo, 2 * raioDoCirculo, 2* raioDoCirculo);
    context.stroke();
})
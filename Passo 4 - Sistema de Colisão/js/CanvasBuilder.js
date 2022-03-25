var canvas;
var context;
var mouseX;
var moudeY;
var botaoApertado = false;

var formasDentroDoCanvas = [];

$(document).ready(function () {
    var canvasJQuery = $('#canvasTeste');
    canvas = canvasJQuery[0];
    context = canvas.getContext('2d');

    formasDentroDoCanvas.push(new Rectangle(10, 10, 40, 40));
    formasDentroDoCanvas.push(new Rectangle(110, 110, 40, 40));
    formasDentroDoCanvas.push(new Rectangle(210, 210, 40, 40));

    formasDentroDoCanvas.forEach(element => {
        element.draw(context)
    });

    // Precisa ser o event listener, por que ele aciona em ordem
    canvas.addEventListener('mousemove', mouseArgs => {
        formasDentroDoCanvas.forEach(element => {
            if (element.isMouseOn(getRelativeMousePosition(canvasJQuery, mouseArgs))) {
                var movimentoDoMouse = getMouseMovement(mouseArgs);
                if (mouseArgs.buttons == 1 && botaoApertado) {
                    // O cara tá arrastando o objeto
                    element.move(context, movimentoDoMouse)
                }
            }
        });
    })

    canvas.addEventListener('mousedown', () => botaoApertado = true);
    canvas.addEventListener('mouseup', () => botaoApertado = false);
})
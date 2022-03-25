var canvas;
var canvasJQuery;
var context;
var mouseX;
var moudeY;
var elementClickedId;

var formasDentroDoCanvas = [];

$(document).ready(function () {
    canvasJQuery = $('#canvasTeste');
    canvas = canvasJQuery[0];
    context = canvas.getContext('2d');

    formasDentroDoCanvas.push(new Rectangle(10, 10, 40, 40));
    formasDentroDoCanvas.push(new Rectangle(110, 110, 40, 40));
    formasDentroDoCanvas.push(new Rectangle(210, 210, 40, 40));

    formasDentroDoCanvas.forEach(element => {
        element.draw(context)
    });

    // Precisa ser o event listener, por que ele aciona em ordem
    canvas.addEventListener('mousemove', mouseArgs => mouseMoveHandler(mouseArgs));
    canvas.addEventListener('mousedown', mouseArgs => mouseDownHandler(mouseArgs));
    canvas.addEventListener('mouseup', mouseArgs => mouseUpHandler(mouseArgs));
})

function mouseDownHandler(mouseArgs) {
    formasDentroDoCanvas.forEach(element => {
        if (element.isMouseOn(getRelativeMousePosition(canvasJQuery, mouseArgs))) {
            elementClickedId = element.id;
        }
    });
}

function mouseUpHandler(mouseArgs) {
    elementClickedId = undefined;
}

function mouseMoveHandler(mouseArgs) {
    var movimentoDoMouse = getMouseMovement(mouseArgs);
    if (elementClickedId != undefined) {
        formasDentroDoCanvas.forEach(element => {
            if (element.id == elementClickedId) {
                if (mouseArgs.buttons == 1) {
                    // O cara tá arrastando o objeto
                    element.move(context, movimentoDoMouse)
                }
            }
        })
    }
}
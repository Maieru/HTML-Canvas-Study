var canvas;
var canvasJQuery;
var context;
var mouseX;
var moudeY;

// Last Element Clicked representa qual foi o ultimo elemento que o usuário clickou. Ele só deve ser settado
// para undefined quando o usuário clickar em uma parte branca do canvas.   

var lastElementClicked = {
    IdInternal: undefined,
    IdChangeListener: function (newId) {
        if (newId != undefined){
            updateExternalFields(newId);
        }
    },
    set Id(id) {
        this.IdInternal = id;
        this.IdChangeListener(id);
    },
    get Id() { return this.IdInternal }
}

// Element Clicking Id representa qual elemento o usuário está clickando atualmente.

var elementClickingId;

var formasDentroDoCanvas = [];

$(document).ready(function () {
    canvasJQuery = $('#canvasTeste');
    canvas = canvasJQuery[0];
    context = canvas.getContext('2d');

    formasDentroDoCanvas.push(new Rectangle(10, 10, 40, 40, 'black'));
    formasDentroDoCanvas.push(new Rectangle(110, 110, 40, 40, 'black'));
    formasDentroDoCanvas.push(new Rectangle(210, 210, 40, 40, 'black'));

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
            elementClickingId = element.id;
            lastElementClicked.Id = element.id;
        }
    });
}

function mouseUpHandler(mouseArgs) {
    elementClickingId = undefined;

    if (!isClickingInAnyElement(mouseArgs)) {
        lastElementClicked.Id = undefined;
    }
}

function mouseMoveHandler(mouseArgs) {
    var movimentoDoMouse = getMouseMovement(mouseArgs);
    if (elementClickingId != undefined) {
        var element = getElementById(elementClickingId);
        if (mouseArgs.buttons == 1) {
            // O cara tá arrastando o objeto
            element.move(context, movimentoDoMouse);
            updateExternalFields(elementClickingId);
        }
    }
}

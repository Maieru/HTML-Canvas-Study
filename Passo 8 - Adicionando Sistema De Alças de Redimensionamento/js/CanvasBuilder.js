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
        if (newId != undefined) {
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
var alcasDentroDoCanvas = {
    alcasInternal: [],
    set alcas(alcas) {
        if (this.alcasInternal != undefined) {
            this.alcasInternal.forEach(element => {
                element.eraseObject(context);
            })
        }

        drawAllElements(context);

        this.alcasInternal = alcas;

        if (this.alcasInternal != undefined) {
            this.alcasInternal.forEach(element => {
                element.draw(context);
            })
        }
    },
    get alcas() { return this.alcasInternal }
};

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
    var clickouEmUmaAlca = false;

    if (alcasDentroDoCanvas.alcas != undefined) {
        alcasDentroDoCanvas.alcas.forEach(element => {
            if (element.isMouseOn(getRelativeMousePosition(canvasJQuery, mouseArgs))) {
                elementClickingId = element.id;
                lastElementClicked.Id = element.id;
                clickouEmUmaAlca = true;
            }
        });
    }

    if (!clickouEmUmaAlca) {
        var clickouEmUmElemento = false;
        formasDentroDoCanvas.forEach(element => {
            if (element.isMouseOn(getRelativeMousePosition(canvasJQuery, mouseArgs))) {
                elementClickingId = element.id;
                lastElementClicked.Id = element.id;

                alcasDentroDoCanvas.alcas = element.createAlcas(context, alcasDentroDoCanvas.alcas);
                clickouEmUmElemento = true;
            }
        });

        if (!clickouEmUmElemento)
            alcasDentroDoCanvas.alcas = undefined;
    }
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
            element.move(context, movimentoDoMouse);
            updateExternalFields(elementClickingId);
            if (!isElementAlca(elementClickingId)){
                alcasDentroDoCanvas.alcas = undefined;
            }
        }
    }
}

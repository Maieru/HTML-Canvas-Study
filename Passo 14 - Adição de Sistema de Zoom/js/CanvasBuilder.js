var canvas;
var canvasJQuery;
var context;
var mouseX;
var moudeY;
var isPamming = false;
var offsetX = 0;
var offsetY = 0;
var zoomX = 1;
var zoomY = 1;

// Last Element Clicked representa qual foi o ultimo elemento que o usuário clickou. Ele só deve ser settado
// para undefined quando o usuário clickar em uma parte branca do canvas.   

var lastElementClicked = {
    IdInternal: undefined,
    IdChangeListener: function (newId) {
        if (newId != undefined &&
            !isElementAlca(newId)) {
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

    formasDentroDoCanvas.push(new Rectangle(20, 20, 60, 60, 'black', 'quadrado 1'));
    formasDentroDoCanvas.push(new Rectangle(120, 120, 60, 60, 'black', 'quadrado 2'));
    formasDentroDoCanvas.push(new Rectangle(220, 220, 60, 60, 'black', 'quadrado 3'));

    formasDentroDoCanvas.push(new Rectangle(5, 5, 990, 5, 'black'));
    formasDentroDoCanvas.push(new Rectangle(5, 10, 5, 280, 'black'));
    formasDentroDoCanvas.push(new Rectangle(5, 290, 990, 5, 'black'));
    formasDentroDoCanvas.push(new Rectangle(990, 10, 5, 280, 'black'));

    formasDentroDoCanvas.forEach(element => {
        element.draw(context)
    });

    // Precisa ser o event listener, por que ele aciona em ordem
    canvas.addEventListener('mousemove', mouseArgs => mouseMoveHandler(mouseArgs));
    canvas.addEventListener('mousedown', mouseArgs => mouseDownHandler(mouseArgs));
    canvas.addEventListener('mouseup', mouseArgs => mouseUpHandler(mouseArgs));
    document.addEventListener('keypress', keyPressArgs => keyPressHandler(keyPressArgs));
})

function mouseDownHandler(mouseArgs) {
    var clickouEmUmaAlca = false;

    if (isAddingElement == true && addingElement != undefined) {
        if (!checkElementColision(addingElement)) {
            addElementToTheCanvas(addingElement);
            isAddingElement = false;
            addingElement = undefined;
            return;
        }
    }

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

                isAddingElement = false;

                if (addingElement != undefined) {
                    addingElement.eraseObject(context);
                    drawAllElements(context);
                    addingElement = undefined;
                }

                alcasDentroDoCanvas.alcas = element.createAlcas(context, alcasDentroDoCanvas.alcas);
                clickouEmUmElemento = true;
            }
        });

        if (!clickouEmUmElemento) {
            alcasDentroDoCanvas.alcas = undefined;

            if (mouseArgs.ctrlKey == true) {
                isPamming = true;
            }
        }
    }
}

function mouseUpHandler(mouseArgs) {
    elementClickingId = undefined;
    isPamming = false;

    if (!isClickingInAnyElement(mouseArgs)) {
        lastElementClicked.Id = undefined;
    }
}

function mouseMoveHandler(mouseArgs) {
    var movimentoDoMouse = getMouseMovement(mouseArgs);
    scaleMouseMovement(movimentoDoMouse);

    if (isAddingElement == true && addingElement != undefined) {
        addingElement.eraseObject(context);
        drawGhostElement(getRelativeMousePosition(canvasJQuery, mouseArgs))
    }

    if (isPamming) {
        eraseAllElements(context);

        offsetX += movimentoDoMouse.X;
        offsetY += movimentoDoMouse.Y;

        drawAllElements(context);
    }

    if (elementClickingId != undefined) {
        var element = getElementById(elementClickingId);

        if (mouseArgs.buttons == 1) {
            element.move(context, movimentoDoMouse);
            updateExternalFields(elementClickingId);
            if (!isElementAlca(elementClickingId)) {
                alcasDentroDoCanvas.alcas = undefined;
            }
        }
    }
}

function keyPressHandler(keyPressArgs) {
    // MUST erase before scaling
    eraseAlcas();
    eraseAllElements(context);

    var positiveZoomChange = 1.02;
    var negativeZoomChange = 0.98;

    if (keyPressArgs.key == 'z' || keyPressArgs.key == 'Z') {
        // Responsavel por fazer o zoom-in
        zoomX *= positiveZoomChange;
        zoomY *= positiveZoomChange;

        offsetX -= oldMouseCoordinates.X * positiveZoomChange - oldMouseCoordinates.X;
        offsetY -= oldMouseCoordinates.Y * positiveZoomChange - oldMouseCoordinates.Y;
    }
    else if (keyPressArgs.key == 'x' || keyPressArgs.key == 'X') {
        // Responsavel por fazer o zoom-out 
        zoomX *= negativeZoomChange;
        zoomY *= negativeZoomChange;
        
        offsetX -= oldMouseCoordinates.X * negativeZoomChange - oldMouseCoordinates.X;
        offsetY -= oldMouseCoordinates.Y * negativeZoomChange - oldMouseCoordinates.Y;
    }

    drawAllElements(context);
}

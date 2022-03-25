function getRelativeMousePosition(canvas, mouseEvent) {

    var rect = canvas[0].getBoundingClientRect();
    return {
        X: mouseEvent.clientX - rect.left,
        Y: mouseEvent.clientY - rect.top
    };
}

function getNextAvaibleId() {
    var nextId = 1;

    formasDentroDoCanvas.forEach(element => {
        if (nextId == element.id)
            nextId++;
    });

    return nextId;
}

function getElementById(searchId) {
    var retorno;
    formasDentroDoCanvas.forEach(element => {
        if (element.id == searchId) {
            retorno = element;
        }
    });
    return retorno;
}

var oldMouseCoordinates;
function getMouseMovement(mouseArgs) {
    if (oldMouseCoordinates == undefined)
        oldMouseCoordinates = { X: mouseArgs.x, Y: mouseArgs.y };

    var retorno = {
        X: mouseArgs.x - oldMouseCoordinates.X,
        Y: mouseArgs.y - oldMouseCoordinates.Y
    }

    oldMouseCoordinates = { X: mouseArgs.x, Y: mouseArgs.y };

    return retorno;
}

function checkElementColision(elementMoving) {
    var aux = false;

    formasDentroDoCanvas.forEach(element => {
        if (element.id != elementMoving.id &&
            elementMoving.x + elementMoving.width >= element.x &&
            elementMoving.x <= element.x + element.width &&
            elementMoving.y + elementMoving.height >= element.y &&
            elementMoving.y <= element.y + element.height)
            aux = true;
    });

    return aux;
}

function isClickingInAnyElement(mouseArgs) {
    var retorno = false;
    formasDentroDoCanvas.forEach(element => {
        if (element.isMouseOn(getRelativeMousePosition(canvasJQuery, mouseArgs))) {
            retorno = true;
        }
    });
    return retorno;
}
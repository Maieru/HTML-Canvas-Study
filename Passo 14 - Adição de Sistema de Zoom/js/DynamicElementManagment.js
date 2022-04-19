var isAddingElement = false;
var addingElement = undefined;

$(document).ready(function () {
    $('#adicionarQuadrado').on('click', function () {
        isAddingElement = true;
        addingElement = new Rectangle(0, 0, 40, 40, 'black');
    })
})

function addElementToTheCanvas(element) {
    if (formasDentroDoCanvas == undefined) {
        formasDentroDoCanvas = [];
    }

    formasDentroDoCanvas.push(element)
    element.draw(context);
}

function drawGhostElement(position) {
    if (addingElement == undefined)
        return

    scaleMouseMovement (position);
    
    addingElement.x.absolute = position.X - offsetX;
    addingElement.y.absolute = position.Y - offsetY;

    addingElement.color = "rgba(0, 0, 0, 0.2)";
    addingElement.draw(context);
    addingElement.color = "black";

    drawAllElements(context);
}
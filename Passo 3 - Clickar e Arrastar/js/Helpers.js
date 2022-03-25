function getRelativeMousePosition(canvas, mouseEvent) {

    var rect = canvas[0].getBoundingClientRect();
    return {
        X: mouseEvent.clientX - rect.left,
        Y: mouseEvent.clientY - rect.top
    };
}	

function getNextAvaibleId(){
    var nextId = 1;

    formasDentroDoCanvas.forEach(element => {
        if (nextId == element.id)
            nextId ++;
    });
    
    return nextId;
}

var oldMouseCoordinates;
function getMouseMovement(mouseArgs){
    if (oldMouseCoordinates == undefined)
        oldMouseCoordinates = {X: mouseArgs.x, Y: mouseArgs.y};

    var retorno = {
        X: mouseArgs.x - oldMouseCoordinates.X,
        Y: mouseArgs.y - oldMouseCoordinates.Y
    }
    
    oldMouseCoordinates = {X: mouseArgs.x, Y: mouseArgs.y};

    return retorno;
}
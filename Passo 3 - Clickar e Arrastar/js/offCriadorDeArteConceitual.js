class Rectangle
{
    constructor(x, y, width, height){
        this.id = getNextAvaibleId();
        this.isMoving = false;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(context){
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = "black"
        context.strokeStyle = "black"
        context.fill();
        context.stroke();
        context.closePath();
    }

    eraseObject(context){
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = "white"
        context.strokeStyle = "white"
        context.fill();
        context.stroke();
        context.closePath();
    }

    isMouseOn(mouseRealCoordinates){
        return mouseRealCoordinates.X > this.x && mouseRealCoordinates.X < this.x + this.width &&
               mouseRealCoordinates.Y > this.y && mouseRealCoordinates.Y < this.y + this.height;
    }

    move(context, mouseVariations){
        this.eraseObject(context);

        this.x += mouseVariations.X;
        this.y += mouseVariations.Y;

        this.draw(context);
    }
}
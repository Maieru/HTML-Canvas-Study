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
        context.fillStyle = "black";
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.fill();
        context.stroke();
        context.closePath();
    }

    eraseObject(context){
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = "white";
        context.strokeStyle = "white";
        context.lineWidth = 3;
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

        this.x += mouseVariations.X * 1.05;
        this.y += mouseVariations.Y * 1.05;

        this.draw(context);
    }
}
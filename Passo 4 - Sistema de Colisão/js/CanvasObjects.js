class Rectangle {
    constructor(x, y, width, height) {
        this.id = getNextAvaibleId();
        this.isMoving = false;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(context) {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = "black";
        context.strokeStyle = "black";
        context.lineWidth = 0.1;
        context.fill();
        context.stroke();
        context.closePath();
    }

    eraseObject(context) {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = "white";
        context.strokeStyle = "white";
        context.lineWidth = 3;
        context.fill();
        context.stroke();
        context.closePath();
    }

    isMouseOn(mouseRealCoordinates) {
        return this.containsPoint(mouseRealCoordinates);
    }

    containsPoint(point) {
        return point.X > this.x && point.X < this.x + this.width &&
               point.Y > this.y && point.Y < this.y + this.height;
    }

    move(context, mouseVariations) {

        this.eraseObject(context);

        var backupX = this.x;
        var backupY = this.y;

        this.x += mouseVariations.X * 1.02;
        this.y += mouseVariations.Y * 1.02;

        if (checkElementColision(this)) {
            this.x = backupX;
            this.y = backupY;
        }

        this.draw(context);
    }
}
class Rectangle {
    constructor(x, y, width, height, color) {
        this.id = getNextAvaibleId();
        this.isMoving = false;
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
    }

    draw(context) {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = this.color;
        context.strokeStyle = this.color;
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
        context.lineWidth = 1.5;
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

        this.x += mouseVariations.X;
        this.y += mouseVariations.Y;

        if (checkElementColision(this)) {
            this.x = backupX;
            this.y = backupY;
        }

        this.draw(context);
    }
}
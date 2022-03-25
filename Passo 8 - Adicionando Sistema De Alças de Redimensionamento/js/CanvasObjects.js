class Rectangle {
    constructor(x, y, width, height, color) {
        this.id = getNextAvaibleId();
        this.isMoving = false;
        this.alcasLigadas = false;
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
        context.lineWidth = 0;
        context.fill();
        context.stroke();
        context.closePath();
    }

    eraseObject(context) {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = "white";
        context.strokeStyle = "white";
        context.lineWidth = 2;
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

    createAlcas(context) {

        var larguraDaAlca = this.width / 5;
        var alturaDaAlca = this.height / 5;
        var id = getNextAvaibleId()
        var alcasArray = [];

        alcasArray.push(new Alca(this.x - this.width / 10, this.y - this.height / 10, larguraDaAlca, alturaDaAlca, this, id));
        id++;
        alcasArray.push(new Alca(this.x - this.width / 10, this.y + this.height * 0.9, larguraDaAlca, alturaDaAlca, this, id));
        id++;
        alcasArray.push(new Alca(this.x + this.width * 0.9, this.y - this.height / 10, larguraDaAlca, alturaDaAlca, this, id));
        id++;
        alcasArray.push(new Alca(this.x + this.width * 0.9, this.y + this.height * 0.9, larguraDaAlca, alturaDaAlca, this, id));

        id++;
        alcasArray.push(new Alca(this.x + this.width * 0.4, this.y - this.height / 10, larguraDaAlca, alturaDaAlca, this, id));
        id++;
        alcasArray.push(new Alca(this.x - this.width / 10, this.y + this.height * 0.4, larguraDaAlca, alturaDaAlca, this, id));
        id++;
        alcasArray.push(new Alca(this.x + this.width * 0.4, this.y + this.height * 0.9, larguraDaAlca, alturaDaAlca, this, id));
        id++;
        alcasArray.push(new Alca(this.x + this.width * 0.9, this.y + this.height * 0.4, larguraDaAlca, alturaDaAlca, this, id));

        alcasArray.forEach(element => {
            element.draw(context);
        });

        this.alcasLigadas = true;

        return alcasArray;
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

class Alca {
    constructor(x, y, width, height, fatherElement, id) {
        this.id = id;
        this.isMoving = false;
        this.x = x;
        this.y = y;
        this.color = 'red';
        this.width = width;
        this.height = height;
        this.fatherElement = fatherElement;
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
        context.lineWidth = 2;
        context.fill();
        context.stroke();
        context.closePath();

        this.fatherElement.alcasLigadas = false;
        this.fatherElement.draw(context);
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
        var backupWidth = this.fatherElement.width;
        var backupHeight = this.fatherElement.height;
        
        eraseAlcas();
        this.fatherElement.eraseObject(context);

        this.x += mouseVariations.X;
        this.y += mouseVariations.Y;
        this.fatherElement.width += mouseVariations.X;
        this.fatherElement.height += mouseVariations.Y;

        if (checkElementColision(this.fatherElement)) {
            this.x = backupX;
            this.y = backupY;
            this.fatherElement.width = backupWidth;
            this.fatherElement.height = backupHeight;
        }

        this.fatherElement.draw(context);
        alcasDentroDoCanvas.alcas = this.fatherElement.createAlcas(context);
    }
}
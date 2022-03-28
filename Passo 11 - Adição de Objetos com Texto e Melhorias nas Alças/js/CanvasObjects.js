class Rectangle {
    constructor(x, y, width, height, color, text) {
        this.id = getNextAvaibleId();
        this.isMoving = false;
        this.alcasLigadas = false;
        this.x = x;
        this.y = y;
        this.text = text;
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
        
        if (this.text != undefined){
            context.fillStyle = "#ffffff";
            context.fillText(this.text, this.x + (this.width - context.measureText(this.text).width) / 2, this.y + (this.height + getFontSize(context) / 2) / 2);    
        } 
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

        var larguraDaAlca = 12;
        var alturaDaAlca = 12;
        var id = getNextAvaibleId()
        var alcasArray = [];

        alcasArray.push(new Alca(this.x - larguraDaAlca / 2, this.y - alturaDaAlca / 2, larguraDaAlca, alturaDaAlca, this, id, -1, -1));
        id++;
        alcasArray.push(new Alca(this.x - larguraDaAlca / 2, this.y + this.height - larguraDaAlca / 2, larguraDaAlca, alturaDaAlca, this, id, -1, 1));
        id++;
        alcasArray.push(new Alca(this.x + this.width - larguraDaAlca / 2, this.y - alturaDaAlca / 2, larguraDaAlca, alturaDaAlca, this, id, 1, -1));
        id++;
        alcasArray.push(new Alca(this.x + this.width - larguraDaAlca / 2, this.y + this.height - alturaDaAlca / 2, larguraDaAlca, alturaDaAlca, this, id, 1, 1));

        id++;
        alcasArray.push(new Alca(this.x + (this.width - larguraDaAlca) / 2, this.y - alturaDaAlca  / 2, larguraDaAlca, alturaDaAlca, this, id, 0, -1));
        id++;
        alcasArray.push(new Alca(this.x - larguraDaAlca / 2, this.y + (this.height - alturaDaAlca) / 2, larguraDaAlca, alturaDaAlca, this, id, -1, 0));
        id++;
        alcasArray.push(new Alca(this.x + (this.width - larguraDaAlca) / 2, this.y + this.height  - alturaDaAlca / 2, larguraDaAlca, alturaDaAlca, this, id, 0, 1));
        id++;
        alcasArray.push(new Alca(this.x + this.width - larguraDaAlca / 2, this.y + (this.height - alturaDaAlca) / 2, larguraDaAlca, alturaDaAlca, this, id, 1, 0));

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
    constructor(x, y, width, height, fatherElement, id, coeficienteX, coeficienteY) {
        this.id = id;
        this.isMoving = false;
        this.x = x;
        this.y = y;
        this.color = 'red';
        this.coeficienteX = coeficienteX;
        this.coeficienteY = coeficienteY;
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
        var backupFatherX = this.fatherElement.x;
        var backupFatherY = this.fatherElement.y;
        var backupWidth = this.fatherElement.width;
        var backupHeight = this.fatherElement.height;
        
        eraseAlcas();
        this.fatherElement.eraseObject(context);

        this.x += mouseVariations.X * this.coeficienteX;
        this.y += mouseVariations.Y * this.coeficienteY;

        if (this.coeficienteX == -1){
            this.fatherElement.x += mouseVariations.X;
            this.fatherElement.width += mouseVariations.X * this.coeficienteX;
        }
        else{
            this.fatherElement.width += mouseVariations.X * this.coeficienteX;
        }

        if (this.coeficienteY == -1){
            this.fatherElement.y += mouseVariations.Y;
            this.fatherElement.height += mouseVariations.Y * this.coeficienteY;
        }
        else 
        {
            this.fatherElement.height += mouseVariations.Y * this.coeficienteY;
        }

        if (checkElementColision(this.fatherElement)) {
            this.x = backupX;
            this.y = backupY;
            this.fatherElement.x = backupFatherX;
            this.fatherElement.y = backupFatherY;
            this.fatherElement.width = backupWidth;
            this.fatherElement.height = backupHeight;
        }

        this.fatherElement.draw(context);
        alcasDentroDoCanvas.alcas = this.fatherElement.createAlcas(context);
    }
}
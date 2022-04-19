class Rectangle {
    constructor(x, y, width, height, color, text) {
        this.id = getNextAvaibleId();
        this.isMoving = false;
        this.alcasLigadas = false;
        this.x = {
            internalX: x,
            get absolute() { return this.internalX },
            set absolute(newValue) { this.internalX = newValue },
            get relative() { return Math.round((this.internalX + offsetX) * zoomX) }
        };
        this.y = {
            internalY: y,
            get absolute() { return this.internalY },
            set absolute(newValue) { this.internalY = newValue },
            get relative() { return Math.round((this.internalY + offsetY) * zoomY) }
        };
        this.text = text;
        this.color = color;
        this.width = {
            internalWidth: width,
            get absolute() { return this.internalWidth },
            set absolute(newValue) { this.internalWidth = newValue },
            get relative() { return Math.round((this.internalWidth) * zoomX) }
        };
        this.height = {
            internalHeight: height,
            get absolute() { return this.internalHeight },
            set absolute(newValue) { this.internalHeight = newValue },
            get relative() { return Math.round((this.internalHeight) * zoomY) }
        };
    }

    draw(context) {
        context.beginPath();
        context.rect(this.x.relative, this.y.relative, this.width.relative, this.height.relative);
        context.fillStyle = this.color;
        context.strokeStyle = this.color;
        context.lineWidth = 0;
        context.fill();
        context.stroke();
        context.closePath();

        if (this.text != undefined) {
            context.fillStyle = "#ffffff";
            context.fillText(this.text, this.x.relative + (this.width.relative - context.measureText(this.text).width) / 2, this.y.relative + (this.height.relative + getFontSize(context) / 2) / 2);
        }
    }

    eraseObject(context) {
        context.beginPath();
        context.rect(this.x.relative, this.y.relative, this.width.relative, this.height.relative);
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
        return point.X > this.x.relative && point.X < this.x.relative + this.width.relative &&
            point.Y > this.y.relative && point.Y < this.y.relative + this.height.relative;
    }

    createAlcas(context) {

        var larguraDaAlca = 12;
        var alturaDaAlca = 12;
        var id = getNextAvaibleId()
        var alcasArray = [];

        alcasArray.push(new Alca(this.x.absolute - larguraDaAlca / 2, this.y.absolute - alturaDaAlca / 2, larguraDaAlca, alturaDaAlca, this, id, -1, -1));
        id++;
        alcasArray.push(new Alca(this.x.absolute - larguraDaAlca / 2, this.y.absolute + this.height.absolute - larguraDaAlca / 2, larguraDaAlca, alturaDaAlca, this, id, -1, 1));
        id++;
        alcasArray.push(new Alca(this.x.absolute + this.width.absolute - larguraDaAlca / 2, this.y.absolute - alturaDaAlca / 2, larguraDaAlca, alturaDaAlca, this, id, 1, -1));
        id++;
        alcasArray.push(new Alca(this.x.absolute + this.width.absolute - larguraDaAlca / 2, this.y.absolute + this.height.absolute - alturaDaAlca / 2, larguraDaAlca, alturaDaAlca, this, id, 1, 1));

        id++;
        alcasArray.push(new Alca(this.x.absolute + (this.width.absolute - larguraDaAlca) / 2, this.y.absolute - alturaDaAlca / 2, larguraDaAlca, alturaDaAlca, this, id, 0, -1));
        id++;
        alcasArray.push(new Alca(this.x.absolute - larguraDaAlca / 2, this.y.absolute + (this.height.absolute - alturaDaAlca) / 2, larguraDaAlca, alturaDaAlca, this, id, -1, 0));
        id++;
        alcasArray.push(new Alca(this.x.absolute + (this.width.absolute - larguraDaAlca) / 2, this.y.absolute + this.height.absolute - alturaDaAlca / 2, larguraDaAlca, alturaDaAlca, this, id, 0, 1));
        id++;
        alcasArray.push(new Alca(this.x.absolute + this.width.absolute - larguraDaAlca / 2, this.y.absolute + (this.height.absolute - alturaDaAlca) / 2, larguraDaAlca, alturaDaAlca, this, id, 1, 0));

        alcasArray.forEach(element => {
            element.draw(context);
        });

        this.alcasLigadas = true;

        return alcasArray;
    }

    move(context, mouseVariations) {

        this.eraseObject(context);

        var backupX = this.x.absolute;
        var backupY = this.y.absolute;

        this.x.absolute += mouseVariations.X;
        this.y.absolute += mouseVariations.Y;

        if (checkElementColision(this)) {
            this.x.absolute = backupX;
            this.y.absolute = backupY;
        }

        this.draw(context);
    }
}

class Alca {
    constructor(x, y, width, height, fatherElement, id, coeficienteX, coeficienteY) {
        this.id = id;
        this.isMoving = false;
        this.x = {
            internalX: x,
            get absolute() { return this.internalX },
            set absolute(newValue) { this.internalX = newValue },
            get relative() { return Math.round((this.internalX + offsetX) * zoomX) }
        };
        this.y = {
            internalY: y,
            get absolute() { return this.internalY },
            set absolute(newValue) { this.internalY = newValue },
            get relative() { return Math.round((this.internalY + offsetY) * zoomY) }
        };
        this.color = 'red';
        this.coeficienteX = coeficienteX;
        this.coeficienteY = coeficienteY;
        this.width = {
            internalWidth: width,
            get absolute() { return this.internalWidth },
            set absolute(newValue) { this.internalWidth = newValue },
            get relative() { return Math.round(this.internalWidth * zoomX) }
        };
        this.height = {
            internalHeight: height,
            get absolute() { return this.internalHeight },
            set absolute(newValue) { this.internalHeight = newValue },
            get relative() { return Math.round(this.internalHeight * zoomX) }
        };
        this.fatherElement = fatherElement;
    }

    draw(context) {
        context.beginPath();
        context.rect(this.x.relative, this.y.relative, this.width.relative, this.height.relative);
        context.fillStyle = this.color;
        context.strokeStyle = this.color;
        context.lineWidth = 0.1;
        context.fill();
        context.stroke();
        context.closePath();
    }

    eraseObject(context) {
        context.beginPath();
        context.rect(this.x.relative, this.y.relative, this.width.relative, this.height.relative);
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
        return point.X > this.x.relative && point.X < this.x.relative + this.width.relative &&
            point.Y > this.y.relative && point.Y < this.y.relative + this.height.relative;
    }

    move(context, mouseVariations) {

        this.eraseObject(context);

        var backupX = this.x.absolute;
        var backupY = this.y.absolute;
        var backupFatherX = this.fatherElement.x.absolute;
        var backupFatherY = this.fatherElement.y.absolute;
        var backupWidth = this.fatherElement.width.absolute;
        var backupHeight = this.fatherElement.height.absolute;

        eraseAlcas();
        this.fatherElement.eraseObject(context);

        this.x.absolute += mouseVariations.X * this.coeficienteX;
        this.y.absolute += mouseVariations.Y * this.coeficienteY;

        if (this.coeficienteX == -1) {
            this.fatherElement.x.absolute += mouseVariations.X;
            this.fatherElement.width.absolute += mouseVariations.X * this.coeficienteX;
        }
        else {
            this.fatherElement.width.absolute += mouseVariations.X * this.coeficienteX;
        }

        if (this.coeficienteY == -1) {
            this.fatherElement.y.absolute += mouseVariations.Y;
            this.fatherElement.height.absolute += mouseVariations.Y * this.coeficienteY;
        }
        else {
            this.fatherElement.height.absolute += mouseVariations.Y * this.coeficienteY;
        }

        if (checkElementColision(this.fatherElement)) {
            this.x.absolute = backupX;
            this.y.absolute = backupY;
            this.fatherElement.x.absolute = backupFatherX;
            this.fatherElement.y.absolute = backupFatherY;
            this.fatherElement.width.absolute = backupWidth;
            this.fatherElement.height.absolute = backupHeight;
        }

        this.fatherElement.draw(context);
        alcasDentroDoCanvas.alcas = this.fatherElement.createAlcas(context);
    }
}
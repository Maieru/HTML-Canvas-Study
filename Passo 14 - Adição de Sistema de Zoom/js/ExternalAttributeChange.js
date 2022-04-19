$(document).ready(function () {
    $('#PosicaoX').on('change', event => attributeChageValueHandler(event.target));
    $('#PosicaoY').on('change', event => attributeChageValueHandler(event.target));
    $('#Largura').on('change', event => attributeChageValueHandler(event.target));
    $('#Altura').on('change', event => attributeChageValueHandler(event.target));
    $('#Cor').on('change', event => attributeChageValueHandler(event.target));
    $('#Texto').on('change', event => attributeChageValueHandler(event.target));
});

function attributeChageValueHandler(element) {
    var elementJquerry = $(`#${element.id}`);
    var parametroAlterado = elementJquerry.attr("valueFor");

    if (lastElementClicked.Id != undefined) {
        switch (parametroAlterado) {
            case 'X': alteraValorDeX(elementJquerry.val()); break;
            case 'Y': alteraValorDeY(elementJquerry.val()); break;
            case 'width': alteraValorDeLargura(elementJquerry.val()); break;
            case 'height': alteraValorDeAltura(elementJquerry.val()); break;
            case 'color': alteraCor(elementJquerry.val()); break;
            case 'text' : alteraTexto(elementJquerry.val()); break;
        }
    }
}

function alteraValorDeX(novoValor) {
    var element = getElementById(lastElementClicked.Id);

    element.eraseObject(context);
    element.x.absolute = Number(novoValor);
    element.draw(context);
    alcasDentroDoCanvas.alcas = element.createAlcas(context);

    if (element.alcasLigadas == true)
        alcasDentroDoCanvas.alcas.forEach(element => {
            element.draw(context);
        })
}

function alteraValorDeY(novoValor) {
    var element = getElementById(lastElementClicked.Id);

    element.eraseObject(context);
    element.y.absolute = Number(novoValor);
    element.draw(context);
    alcasDentroDoCanvas.alcas = element.createAlcas(context);

    if (element.alcasLigadas == true)
        alcasDentroDoCanvas.alcas.forEach(element => {
            element.draw(context);
        })
}

function alteraValorDeAltura(novoValor) {
    var element = getElementById(lastElementClicked.Id);

    element.eraseObject(context);
    element.height.absolute = Number(novoValor);
    element.draw(context);
    alcasDentroDoCanvas.alcas = element.createAlcas(context);

    if (element.alcasLigadas == true)
        alcasDentroDoCanvas.alcas.forEach(element => {
            element.draw(context);
        })
}

function alteraValorDeLargura(novoValor) {
    var element = getElementById(lastElementClicked.Id);

    element.eraseObject(context);
    element.width.absolute = Number(novoValor);
    element.draw(context);
    alcasDentroDoCanvas.alcas = element.createAlcas(context);

    if (element.alcasLigadas == true)
        alcasDentroDoCanvas.alcas.forEach(element => {
            element.draw(context);
        })
}

function alteraCor(novoValor) {
    var element = getElementById(lastElementClicked.Id);

    element.eraseObject(context);
    element.color = novoValor;
    element.draw(context);

    if (element.alcasLigadas == true)
        alcasDentroDoCanvas.alcas.forEach(element => {
            element.draw(context);
        })
}

function alteraTexto(novoValor) {
    var element = getElementById(lastElementClicked.Id);

    element.eraseObject(context);
    element.text = novoValor;
    element.draw(context);

    if (element.alcasLigadas == true)
        alcasDentroDoCanvas.alcas.forEach(element => {
            element.draw(context);
        })
}

function updateExternalFields(id) {
    var element = getElementById(id);
    $('#PosicaoX').val(element.x.absolute);
    $('#PosicaoY').val(element.y.absolute);
    $('#Largura').val(element.width.absolute);
    $('#Altura').val(element.height.absolute);
    $('#Cor').val(element.color);
    $('#Texto').val(element.text);
}
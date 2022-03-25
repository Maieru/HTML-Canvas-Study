$(document).ready(function () {
    $('#PosicaoX').on('change', event => attributeChageValueHandler(event.target));
    $('#PosicaoY').on('change', event => attributeChageValueHandler(event.target));
    $('#Largura').on('change', event => attributeChageValueHandler(event.target));
    $('#Altura').on('change', event => attributeChageValueHandler(event.target));
    $('#Cor').on('change', event => attributeChageValueHandler(event.target));
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
        }
    }
}

function alteraValorDeX(novoValor) {
    var element = getElementById(lastElementClicked.Id);

    element.eraseObject(context);
    element.x = Number(novoValor);
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
    element.y = Number(novoValor);
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
    element.height = Number(novoValor);
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
    element.width = Number(novoValor);
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

function updateExternalFields(id) {
    var element = getElementById(id);
    $('#PosicaoX').val(element.x);
    $('#PosicaoY').val(element.y);
    $('#Largura').val(element.width);
    $('#Altura').val(element.height);
    $('#Cor').val(element.color);
}
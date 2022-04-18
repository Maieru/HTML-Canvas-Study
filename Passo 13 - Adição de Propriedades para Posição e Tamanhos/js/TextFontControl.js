$(document).ready(function () {
    $('#FonteTexto').on('change', event => globalAttributeChageValueHandler(event.target));
    $('#TamanhoTexto').on('change', event => globalAttributeChageValueHandler(event.target));
});

function globalAttributeChageValueHandler(element) {
    var elementJquerry = $(`#${element.id}`);
    var parametroAlterado = elementJquerry.attr("valueFor");

    switch (parametroAlterado) {
        case 'fontSize': updateFont(); break;
        case 'textFont': updateFont(); break;
    }
}

function updateFont(){
    context.font = `${$('#TamanhoTexto').val()}px ${$('#FonteTexto').val()}`;
    drawAllElements(context);
}
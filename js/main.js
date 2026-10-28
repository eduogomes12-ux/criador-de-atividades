$(function(){
    if (typeof M !== 'undefined' && M.FormSelect) {
        M.FormSelect.init(document.querySelectorAll('select'));
    }

    $("#botao").on("click", function(event){
        event.preventDefault();
        inserirTarefa();
    });
});

function inserirTarefa(){
    var tabela = $(".tarefas").find("tbody");
    var campoTitulo = $(".campoTitulo").val().trim();
    var campoObs = $(".campoObs").val().trim();
    var campoPrioridade = $(".campoPrioridade").val();

    if(campoTitulo === "" || campoObs === "")
        {
        alert("Preencha Título e Observações!");
        return;
    }

    if(campoPrioridade === "" || campoPrioridade === null)
        {
        campoPrioridade = "Sem prioridade";
    }

    var linha = funLinha(campoTitulo, campoObs, campoPrioridade);
    linha.find(".botaoDeletar").on("click", deletaLinha);
    tabela.append(linha);

    $(".campoTitulo").val("");
    $(".campoObs").val("");
    $(".campoPrioridade").val("");
    $(".campoTitulo").focus();
}
 
function funLinha(campoTitulo, campoObs, campoPrioridade){
    var linha = $("<tr>");
    var colunaTarefa = $("<td>").text(campoTitulo);
    var colunaObs = $("<td>").text(campoObs);
    var prioridadeTexto = formatarPrioridade(campoPrioridade);
    var colunaPrioridade = $("<td>").text(prioridadeTexto);

    if(campoPrioridade === "baixa" || campoPrioridade === "media" || campoPrioridade === "alta")
        {
        colunaPrioridade.addClass("prioridade-" + campoPrioridade);
    }

    var colunaConcluir = $("<td>");
    var colunaDelete = $("<td>");

    var botaoConcluir = $("<button>")
        .addClass("botaoConcluir")
        .attr({ type: "button" });

    botaoConcluir.on("click", function(){
        $(this).toggleClass("ativo");
    });

    colunaConcluir.append(botaoConcluir);

    var bDeletar = $("<a>").addClass("botaoDeletar").attr("href", "#");
    var icone = $("<i>").addClass("material-icons").text("delete");
    bDeletar.append(icone);
    colunaDelete.append(bDeletar);

    linha.append(colunaTarefa);
    linha.append(colunaObs);
    linha.append(colunaPrioridade);
    linha.append(colunaConcluir);
    linha.append(colunaDelete);

    return linha;
}

function formatarPrioridade(prioridade){
    if(prioridade === "baixa") return "Baixa";
    if(prioridade === "media") return "Média";
    if(prioridade === "alta") return "Alta";
    if(prioridade === "Sem prioridade") return "Sem prioridade";
    return prioridade;
}

function deletaLinha(event){
    event.preventDefault();
    $(this).parent().parent().remove();
}
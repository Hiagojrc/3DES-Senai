var numjo = document.querySelector("#numjog");
var corpoTabela = document.querySelector("#tableBody");
var botao = document.querySelector("#botao");
var template = document.querySelector("#templateLinhas");
var num = document.querySelector("#num");

function gerarNumeros() {
    let result = "";
    var n;
    arryInput = new Array(numjo);
    arryInput = numjog.value.split(' ');

    for (i = 0; i < parseInt(arryInput[1]); i++) {
        for (j = 0; j < parseInt(arryInput[0]); j++) {
            result += Math.floor(Math.random() * 59 + 1) + " ";
        }
    }
    n = result.substring(0, result.length - 1);
    num.setAttribute("value", n);
}

function tbodyToCSV(tbody) {
    let csv = "";
    let linhas = tbody.getElementsByTagName("tr");
    if (linhas.length > 0) {
        for (let lin = 0; lin < linhas.length; lin++) {
            let colunas = linhas[lin].getElementsByTagName("td");
            for (let col = 0; col < colunas.length - 1; col++) {
                csv += colunas[col].textContent + ";";
            }
            csv += "\r\n";
        }
    }
    return csv;
}

function criaLinhasTemplate(event) {
    event.preventDefault();
    if (numjo.value != "") {
        lista = template.content.querySelectorAll("td");
        lista[0].textContent = numjo.value;
        let novaLinha = document.importNode(template.content, true);
        corpoTabela.appendChild(novaLinha);
        numjo.value = "";
    } else {
        alert("Preencha os campos obrigatórios para registrar a simulação.");
    }
}

function salvarArquivo() {
    if (corpoTabela.getElementsByTagName("tr").length > 0) {
        let a = document.createElement("a");
        a.href = "data:," + tbodyToCSV(corpoTabela);// data significa dados
        a.download = "financiamentos.csv";
        a.click();
    } else {
        alert("Não há dados na tabela para serem salvos.");
    }
}

function abrirArquivo() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        let arquivoSelecionado = document.getElementById("abrir");
        arquivoSelecionado.addEventListener(
            "change",
            function (e) {
                let extensaoArquivo = /text.*/;
                let arquivoLido = arquivoSelecionado.files[0];
                if (arquivoLido.type.match(extensaoArquivo)) {
                    let leitorDeArquivo = new FileReader();
                    leitorDeArquivo.onload = function (e) {
                        let linhas = leitorDeArquivo.result.split("\r\n");
                        linhas.forEach((lin) => {
                            let col = lin.split(";");
                            lista = template.content.querySelectorAll("td");
                            lista[0].textContent = col[0];
                            let novaLinha = document.importNode(template.content, true);
                            corpoTabela.appendChild(novaLinha);
                        });
                    };
                    leitorDeArquivo.readAsText(arquivoLido);
                } else {
                    alert("Por favor selecione arquivo de texto");
                }
            },
            false
        );
    } else {
        alert("Arquivo(s) não suportado(s)");
    }
}

numjo.addEventListener("keyup", gerarNumeros);
botao.addEventListener("click", criaLinhasTemplate);
window.onload = abrirArquivo();
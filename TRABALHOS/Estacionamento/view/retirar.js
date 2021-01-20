const msg = document.querySelector("#mensagem");
const xhr = new XMLHttpRequest();
const tableServicos = document.querySelector("#servicos");
const urlServicos = "http://localhost/Estacionamento/src/controll/routes/route.servicos.php?id_servico=0";


function carregaServicos() {
    /*alert("SEJA BEM VINDO");*/
    fetch(urlServicos)
        .then(function (resp) {
            //Obtem a resposta da URL no formato JSON
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status);
            return resp.json();
        })
        .then(function (data) {
            //Se obteve a resposta explora os dados recebidos
            data.forEach((val) => {
                let row = document.createElement("tr");
                row.innerHTML = `<tr><td>${val.id_servico}</td>`;
                row.innerHTML += `<td>${val.tipo}</td>`;
                row.innerHTML += `<td>${val.placa}</td>`;
                row.innerHTML += `<td>${val.data_de_registro}</td>`;
                row.innerHTML += `<td>${val.entrada}</td>`;
                row.innerHTML += `<td>${val.saida}</td>`;
                row.innerHTML += `<td>${val.valor}</td>`;
                row.innerHTML += `<td style="padding:3px"><button onclick='editServicos(this)'>Edit</button><button onclick='delServicos(this)'>Del</button></td></tr>`;
                tableServicos.appendChild(row);
            });
        }) //Se obteve erro no processo exibe no console do navegador
        .catch(function (error) {
            console.error(error.message);
        });
}


/*-------------------------------CRIAR VEICULOS--------------------------------------*/
function criaServicos() {
    let url = "http://localhost/Estacionamento/src/controll/routes/route.servicos.php";
    let tipo = document.querySelector("#tipo");
    let placa = document.querySelector("#placa");
    let data_de_registro = document.querySelector("#data_de_registro");
    let entrada = document.querySelector("#entrada");
    let saida = document.querySelector("#saida");
    let valor = document.querySelector("#valor");

    if (tipo.value != "" && placa.value != "" && data_de_registro.value != "" && entrada.value != "" && saida.value != "" && valor.value != "") {
        let dados = new FormData();
        dados.append("tipo", tipo.value);
        dados.append("placa", placa.value);
        dados.append("data_de_registro", data_de_registro.value);
        dados.append("entrada", entrada.value);
        dados.append("saida", saida.value);
        dados.append("valor", valor.value); 
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Veículo Registrado com sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    } else {
        msg.innerHTML = "Favor preencher todos os campos.";
        setTimeout(() => { msg.innerHTML = ""; }, 3000);
    }
}


/*----------------------------EDITAR VEÍCULOS---------------------------------------*/
function editServicos(p) {
    p.parentNode.parentNode.cells[1].setAttribute("contentEditable", "true");
    p.parentNode.parentNode.cells[2].setAttribute("contentEditable", "true");
    p.parentNode.parentNode.cells[3].setAttribute("contentEditable", "true");
    p.parentNode.parentNode.cells[4].setAttribute("contentEditable", "true");
    p.parentNode.parentNode.cells[5].setAttribute("contentEditable", "true");
    p.parentNode.parentNode.cells[6].setAttribute("contentEditable", "true");
    p.parentNode.parentNode.cells[7].innerHTML = "<button onclick='putServicos(this)'>Enviar</button>";
}

function putServicos(p) {
    let url = "http://localhost/Estacionamento/src/controll/routes/route.servicos.php";
    let id_servico = p.parentNode.parentNode.cells[0].innerHTML;
    let tipo = p.parentNode.parentNode.cells[1].innerHTML;
    let placa = p.parentNode.parentNode.cells[2].innerHTML;
    let data_de_registro = p.parentNode.parentNode.cells[3].innerHTML;
    let entrada = p.parentNode.parentNode.cells[4].innerHTML;
    let saida = p.parentNode.parentNode.cells[5].innerHTML;
    let valor = p.parentNode.parentNode.cells[6].innerHTML;
    

    let dados = "id_servico=" + id_servico;
    dados += "&tipo=" + tipo;
    dados += "&placa=" + placa;
    dados += "&data_de_registro=" + data_de_registro;
    dados += "&entrada=" + entrada;
    dados += "&saida=" + saida;
    dados += "&valor=" + valor;
    
    if (window.confirm("Confirma Alteração dos dados?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Veículo alterado com sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("PUT", url);
        xhr.send(dados);
    }
}


function delServicos(p) {
    let url = "http://localhost/Estacionamento/src/controll/routes/route.servicos.php";
    let id_servico = p.parentNode.parentNode.cells[0].innerText;
    let dados = "id_servico=" + id_servico;
    if (window.confirm("Confirma Exclusão do id_servico " + id_servico + "?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Veículo excluído com sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("DELETE", url);
        xhr.send(dados);
    }
}
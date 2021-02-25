const tableUsuario = document.querySelector("#bodyUsuarios");
const tablePessoa = document.querySelector("#bodyPessoas");
const urlPessoa = "http://localhost/usuarios/src/controll/processa.pessoa.php?id=0";
const urlUsuario = "http://localhost/usuarios/src/controll/processa.usuario.php?id=0";
const urlId = location.search.slice(1).split("=")[2];
const urlLogin = location.search.slice(1).split("&")[0].split("=")[1];
const nome = document.querySelector("#nome");
const login = document.querySelector("#login");
const telefone = document.querySelector("#telefone");
const telefones = document.querySelector("#telefones");
const senha = document.querySelector("#senha");
const urlPerfil = "http://localhost/usuarios/src/controll/processa.pessoa.php?id=" + urlId;
const urlProcessaPessoa = "http://localhost/usuarios/src/controll/processa.pessoa.php?id=";
const xhr = new XMLHttpRequest();

function carregaPerfil() {
    fetch(urlPerfil)
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status);
            return resp.json();
        })
        .then(function (data) {
            data.forEach((val) => {
                let div = document.createElement("div");
                div.className = "textbox";
                let i = document.createElement("i");
                i.className = "fa fa-phone";
                let input = document.createElement("input");
                input.id = "telefone";
                input.value = val.telefone;
                div.appendChild(i);
                div.appendChild(input);
                telefones.appendChild(div);
                nome.value = val.nome;
                login.value = urlLogin;
            });
        })
        .catch(function (error) {
            console.error(error.message);
        });
}
/*
function atualizar() {
    let data = "id=" + urlId;
    data += "&nome=" + nome.value;
    data += "&telefone=" + telefone.value;
    data += "&senha=" + senha.value;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.response);
        }
    });
    xhr.open("PUT", urlProcessaPessoa);
    xhr.send(data);
}
*/

function atualizar(tipo) {
    let url = "../src/controll/processa.usuario.php";
    let dados = "";
    msg.innerHTML = "";

    //Envia alteração de senha
    let senha = document.getElementById("senha");
    let cSenha = document.getElementById("csenha");
    if (senha.value != "" || cSenha.value != "") {
        if (senha.value === cSenha.value) {
            dados = "login=" + urlLogin;
            dados += "&senha=" + senha.value;
            dados += "&tipo=" + tipo;
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                    msg.innerHTML = "Nova senha configurada.<br>";
                }
            });
            xhr.open("PUT", url);
            xhr.send(dados);
        } else {
            msg.innerHTML = "A confirmação de senha deve ser igual a senha.<br>";
        }
    }

    //Envia alteração de nome
    url = "../src/controll/processa.pessoa.php";
    dados = "id=" + urlId;
    dados += "&nome=" + nome.value;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            msg.innerHTML += "Nome atualizado com sucesso.";
        }
    });
    xhr.open("PUT", url);
    xhr.send(dados);
    setTimeout(() => { window.location.reload(); }, 3000);
}

function addTelefone() {
    let div = document.createElement("div");
    div.className = "textbox";
    let i = document.createElement("i");
    i.className = "fa fa-phone";
    let input = document.createElement("input");
    input.id = "telefone";
    //input.value = val.telefone;
    div.appendChild(i);
    div.appendChild(input);
    telefones.appendChild(div);
}

var div = document.getElementById("telefones");
function delTelefone() {
    div.parentNode.removeChild(div);
    location.reload();
}

function carregaPessoas() {
    fetch(urlPessoa)
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
                row.innerHTML = `<tr><td>${val.idPessoa}</td>`;
                row.innerHTML += `<td>${val.nome}</td>`;
                row.innerHTML += `<td>${val.telefone}</td>`;
                row.innerHTML += `<td style="padding:1px"><button onclick='editPessoa(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button onclick='delPessoa(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`;
                tablePessoa.appendChild(row);
            });
        }) //Se obteve erro no processo exibe no console do navegador
        .catch(function (error) {
            console.error(error.message);
        });
}

function criaPessoa() {
    let url = "../src/controll/processa.pessoa.php";
    let nom = document.querySelector("#nomePessoa");
    let telefone = document.querySelector("#telPessoa");
    if (nom.value != "" && telefone.value != "") {
        let dados = new FormData();
        dados.append("nome", nom.value);
        dados.append("telefone", telefone.value);
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Pessoa criada com sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    } else {
        msg.innerHTML = "Favor preencher o nome e o telefone.";
        setTimeout(() => { msg.innerHTML = "Mensagens do sistema"; }, 3000);
    }
}

function editPessoa(p) {
    p.parentNode.parentNode.cells[1].setAttribute("contentEditable", "true");
    p.parentNode.parentNode.cells[2].setAttribute("contentEditable", "true");
    p.parentNode.parentNode.cells[3].innerHTML = "<button onclick='putPessoa(this)'>Enviar</button>";
}

function putPessoa(p) {
    let url = "../src/controll/processa.pessoa.php";
    let id = p.parentNode.parentNode.cells[0].innerHTML;
    let nom = p.parentNode.parentNode.cells[1].innerHTML;
    let tel = p.parentNode.parentNode.cells[2].innerHTML;
    let dados = "id=" + id;
    dados += "&nome=" + nom;
    dados += "&telefone=" + tel;
    if (window.confirm("Confirma Alteração dos dados?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Pessoa alterada com sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("PUT", url);
        xhr.send(dados);
    }
}

function delPessoa(p) {
    let url = "../src/controll/processa.pessoa.php";
    let id = p.parentNode.parentNode.cells[0].innerText;
    let dados = "id=" + id;
    if (window.confirm("Confirma Exclusão do id " + id + "?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Pessoa excluída com sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("DELETE", url);
        xhr.send(dados);
    }
}

function carregaUsuarios() {
    fetch(urlUsuario)
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
                row.innerHTML = `<tr><td>${val.idPessoa}</td>`;
                row.innerHTML += `<td>${val.login}</td>`;
                row.innerHTML += `<td>${val.tipo}</td>`;
                row.innerHTML += `<td style="padding:3px"><button onclick='editUsuario(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button onclick='delUsuario(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`;
                tableUsuario.appendChild(row);
            });
        }) //Se obteve erro no processo exibe no console do navegador
        .catch(function (error) {
            console.error(error.message);
        });
}

function criaUsuario() {
    let url = "../src/controll/processa.usuario.php";
    let id = document.querySelector("#idUser");
    let loginUser = document.querySelector("#loginUser");
    let senha = document.querySelector("#senhaUser");
    let tipo = document.querySelector("#tipoUser");
    if (id.value != "" && loginUser.value != "" && senha.value != "") {
        let dados = new FormData();
        dados.append("id", id.value);
        dados.append("login", loginUser.value);
        dados.append("senha", senha.value);
        dados.append("tipo", tipo.value);
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Usuário criado com sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    } else {
        msg.innerHTML = "Favor preencher o id, login e a senha.";
        setTimeout(() => { msg.innerHTML = "Mensagens do sistema"; }, 3000);
    }
}

function editUsuario(u) {
    u.parentNode.parentNode.cells[2].innerHTML = "<input type='password' placeholder='Reset Senha' id='senh'>";
    u.parentNode.parentNode.cells[2].innerHTML += "<select id='tip'><option value='comum'>Comum</option><option value='adm'>Admin</option></select>";
    u.parentNode.parentNode.cells[3].innerHTML = "<button onclick='putUsuario(this)'>Enviar</button>";
}

function putUsuario(u) {
    let url = "../src/controll/processa.usuario.php";
    let login = u.parentNode.parentNode.cells[1].innerHTML;
    let senh = document.querySelector("#senh");
    let tip = document.querySelector("#tip");
    let dados = "login=" + login;
    dados += "&senha=" + senh.value;
    dados += "&tipo=" + tip.value;
    if (window.confirm("Confirma Alteração dos dados?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Usuário alterado com sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("PUT", url);
        xhr.send(dados);
    }
}

function delUsuario(u) {
    let url = "../src/controll/processa.usuario.php";
    let loginUser = u.parentNode.parentNode.cells[1].innerText;
    let dados = "login=" + loginUser;
    if (window.confirm("Confirma Exclusão do login " + loginUser + "?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Usuário excluído com sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("DELETE", url);
        xhr.send(dados);
    }
}

function sair() {
    window.location.href = "http://localhost/usuarios";
}
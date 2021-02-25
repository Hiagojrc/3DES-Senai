var nome = document.getElementById("nome");
var idade = document.getElementById("idade");
var result = document.getElementById("result");

function exer1() {
    if (idade.value < 10) {
        fase = "Criança";
    } else if (idade.value < 16) {
        fase = "Jovem";
    } else if (idade.value < 25) {
        fase = "Adulto";
    } else if (idade.value < 55) {
        fase = "Meia idade";
    } else {
        fase = "idoso";
    }
    alert(nome.value + " é " + fase);
}

const saidaw = document.getElementById("saidaw");
function exer2() {
    let result = "";
    var nom = document.getElementById("nom").value;
    var peso = document.getElementById("peso").value;
    var altura = document.getElementById("altura").value;
    var cal = parseFloat(peso) / (parseFloat(altura) * parseFloat(altura));

    if (cal < 20) {
        fase = "fitnis";
    } else if (cal < 22) {
        fase = "sarado";
    } else if (cal < 38) {
        fase = "fofinho";
    }
    result = nom + " Seu IMC È " + cal.toFixed(2) + " Considerado " + fase;
    saidaw.innerHTML = result;
}

function exer3() {
    var ladoA = document.getElementById("a");
    var ladoB = document.getElementById("b");
    var ladoC = document.getElementById("c");

    if (ladoA.value == ladoB.value && ladoA.value == ladoC.value) {
        fase = "Equilátero";
    } else if (ladoA.value != ladoB.value && ladoA.value != ladoC.value) {
        fase = "Escaleno";
    } else {
        fase = "Isósceles";
    }
    alert(" Triângulo " + fase);
}

/*function exer4() {
    var num = document.getElementById("numero").value;
    var total = num % 2;

    if (total == 0) {
        alert("Par " + num);
    } else {
        alert("Impar " + num);
    }
}*/
const num = document.getElementById("numero");
const saida = document.getElementById("saida");
var par = 0;
var impar = 0;

function exer4() {
    let vetor = num.value.split(' ');
    for (i = 0; i < vetor.length; i++) {
        if (vetor[i] % 2 != 1) {
            par++;
        } else {
            impar++;
        }
    }
    let result = "";
    if (par > 0) {
        if (par > 1) result += `${par} pares <br/>`;
        else result += `${par} par <br/>`;
    }
    if (impar > 0) {
        if (impar > 1) result += `${impar} impares <br/>`;
        else result += `${impar} impar <br/>`;
    }
    saida.innerHTML = result;
    impar = 0;
    par = 0;
}

function exer5() {
    var nom = document.getElementById("nom").value;
    var ida = document.getElementById("ida").value;
    var saida = parseInt(ida) + 1;
    alert(nom + " " + saida);
}

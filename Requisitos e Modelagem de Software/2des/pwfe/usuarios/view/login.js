const msg = document.querySelector("#mensagem");
const mensagem = location.search.slice(1);
if (mensagem.split("=")[0] == "erro") {
    msg.innerHTML = decodeURIComponent(mensagem.split("=")[1]);
    setTimeout(() => { window.location.href = "?" }, 3000);
}
function myFunction() {
    var x = document.getElementById("myInput");
    var y = document.getElementById("hide1");
    var z = document.getElementById("hide2");

    if (x.type === 'password') {
        x.type = "text";
        y.style.display = "block";
        z.style.display = "none";
    } else {
        x.type = "password";
        y.style.display = "none";
        z.style.display = "block";
    }
}
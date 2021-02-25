function gerarTap() {

    var objetivo = document.getElementById("objetivo");
    var rh = document.getElementById("rh");
    var patrocina = document.getElementById("patrocina");
    var gerente = document.getElementById("gerente");
    var cliente = document.getElementById("cliente");
    var data = document.getElementById("data");

    var doc = new jsPDF()
    doc.addImage('./princ.png', 'PNG', 20, 0, 165, 233)
    doc.text(objetivo.value, 50, 38)
    doc.text(rh.value, 80, 90)
    doc.text(patrocina.value, 50, 48)
    doc.text(patrocina.value, 75, 130)
    doc.text(gerente.value, 80, 122)
    doc.text(cliente.value, 80, 140)
    doc.text(data.value, 120, 153)
    doc.save('tap.pdf')
}
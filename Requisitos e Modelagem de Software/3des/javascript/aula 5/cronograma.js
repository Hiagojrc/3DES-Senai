function gerarTap() {

    var tit = document.getElementById("titulo");
    var sup = document.getElementById("supervisor");
    var ati = document.getElementById("atividade");
    var are = document.getElementById("area");
    var res = document.getElementById("responsavel");
    var ini = document.getElementById("inicio");
    var ter = document.getElementById("termino");

    var doc = new jsPDF()
    doc.addImage('./princ.png', 'PNG', 5, 2, 202, 140)
    doc.text(sup.value, 170, 20)
    doc.text(tit.value, 90, 29)
    doc.text(ati.value, 8, 48)
    doc.text(are.value, 53, 48)
    doc.text(res.value, 80, 48)
    doc.text(ini.value, 110, 48)
    doc.text(ter.value, 136, 48)
    doc.save('cronograma.pdf')
}
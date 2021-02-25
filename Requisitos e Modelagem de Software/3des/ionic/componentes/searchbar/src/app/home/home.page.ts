import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //Criando um objeto do tipo string irá receber um array
  public carros: String[] = ["S10", "Golf", "Gol", "Argo", "Polo", "Toro", "Uno", "Estrada", "Corola", "Civic"];
  //Criando um objeto para retornar os dados anteriores: filtra
  public carrosFilter: String[] = this.carros;

  constructor() { }

  public pesquisar(ev: CustomEvent) {//Função pesquisa que esta recebendo um evento sempre que acontecer uma alteração no searchbar
    let val = ev.detail.value;  //Variavel val vai receber qualquer alteração no searchbar
    if (val && val.trim() !== '') { // se a variavel tem algum conteúdo e não tem espaço no começo e no fim; (trim() verifica se tem um valor em branco no começo e no fim)
      //filtrar os valores digitados
      this.carrosFilter = this.carros.filter(term =>
        term.toLocaleLowerCase().indexOf(val.toLowerCase().trim()) > -1) //coloca cada letra com minuscúla
    } else { // Se o conteúdo for apagado retorna o objeto global
      this.carrosFilter = this.carros;
    }
  }
}

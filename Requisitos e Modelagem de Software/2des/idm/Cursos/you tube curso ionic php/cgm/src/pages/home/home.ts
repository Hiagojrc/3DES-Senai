import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServidorProvider } from '../../providers/servidor/servidor'; //criado
import { DetalhesContatosPage } from '../detalhes-contatos/detalhes-contatos'; //criado

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //criado
  contatos;

  pessoa: Array<{ codigo: any; nome: string; telefone: string; email: string }>; //filtra dados do banco de dados
  pessoaTodos: Array<{ codigo: any; nome: string; telefone: string; email: string }>; //Seta os dados. Quando apagar a escrita retornar os dados de volta
  constructor(public navCtrl: NavController, public servidor: ServidorProvider) {
    this.pessoa = [];
    this.getRetornar();
  }
  //criado
  getRetornar() {
    this.servidor.getPegar()
      .subscribe(
        data => {
          this.contatos = data;
          for (let i = 0; i < data.length; i++) { //enquanto tiver items proximo percorre o for
            this.pessoa.push({  //Chamando a variavel pessoa
              codigo: data[i]["codigo"],
              nome: data[i]["nome"],
              telefone: data[i]["telefone"],
              email: data[i]["email"]
            });
          }
          this.pessoaTodos = this.pessoa; //Atribuindo dados de pessoa para pessoaTodos
        }
      )
    err => console.log(err);
  }
  //criado
  getContatos(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() != "") {  //Verifica se a variavel estiver vazia
      this.pessoa = this.pessoaTodos.filter((contato) => { //se não estiver vazia retornará os dados. filtrando
        return (contato.nome.toLowerCase().indexOf(val.toLowerCase()) > -1); //Está filtrando atraves do nome
      })
    } else {
      this.pessoa = this.pessoaTodos;
    }
  }

  //Pagina detalhe
  detalhe(contato: any) {  //Ação para botão
    this.navCtrl.push(DetalhesContatosPage, { detalhes: contato });  //apontando qual tela irá
  }
}

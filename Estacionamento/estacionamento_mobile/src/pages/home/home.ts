import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Estacionamento } from '../../models/estacionamento';
import { EstacionamentoService } from '../../services/estaci.service';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  login: string;
  senha: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public estacionamentoService: EstacionamentoService,
    public alertController: AlertController) {
  }

  logar() {
    if (this.login == "admim" && this.senha == "admim") {
      this.navCtrl.setRoot("AdministradorPage");
    } else {
      if (this.login != "" && this.senha != "admim" || this.login != "admim" && this.senha != "" && this.login != "" && this.senha != "" || this.login != "" && this.senha != "") {
        this.presenAlert("Por favor preencha Com o Login e Senha Cadastrado !");
      }
    }
  }

  presenAlert(messagem: string) {
    let alert = this.alertController.create({
      title: "Aviso ",
      subTitle: messagem,
      buttons: [
        {
          text: 'Ver Dica de Senha',
          handler: () => {
            this.presenAlert("administrador");
          }
        },
        {
          text: 'Tentar Novamente',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }
}
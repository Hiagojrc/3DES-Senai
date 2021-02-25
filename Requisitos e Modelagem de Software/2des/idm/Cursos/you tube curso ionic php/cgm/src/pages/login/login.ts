import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  senha: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public servidor: ServidorProvider,
    public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logar() {
    if (this.email == undefined || this.senha == undefined) {  //Se o email ou a senha estiver vazia mostra o alert
      let alert = this.alertCtrl.create({
        title: 'Ateção',  //titulo da mensagem
        message: 'Preencha todos os campos',
        buttons: ['ok'] //botão para sair
      })
      alert.present();
    } else {  //Testando a conexao
      //Se o email e a senha for engual a senha e o email do banco de dados mostrar os dados 
      this.http.get(this.servidor.urlGet() + 'login.php?email=' + this.email + '&senha=' + this.senha).pipe(map(res => res.json()))
        .subscribe(
          dados => {
            if (dados.msg.logado == "sim") {

              if (dados.dados.status == "Ativo") {
                this.navCtrl.setRoot(HomePage);
              } else {
                let alert = this.alertCtrl.create({
                  title: 'Ateção',
                  message: 'Usuários sem permissão!',
                  buttons: ['ok']
                })
                alert.present();
              }

            } else {
              let alert = this.alertCtrl.create({
                title: 'Ateção',
                message: 'Usuários inválido!',
                buttons: ['ok']
              })
              alert.present();
            }
          }
        )
    }
  }
}

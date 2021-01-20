import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Estacionamento } from '../../models/estacionamento';
import { EstacionamentoService } from '../../services/estaci.service';

/**
 * Generated class for the AdministradorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-administrador',
  templateUrl: 'administrador.html',
})
export class AdministradorPage {

  esss: Estacionamento[];
  valorTotal: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public estacionamentoService: EstacionamentoService) {
  }

  ionViewDidLoad() {
    let estacionamento: Estacionamento = { id_servico: "0", tipo: "", placa: "", data_de_registro: "", entrada: "", saida: "" , valor: "" }
    this.estacionamentoService.get(estacionamento).subscribe(
      (resposta: Estacionamento[]) => {
        this.esss = resposta;
        for (let i = 0; i < this.esss.length; i++) {
          this.valorTotal += parseFloat(this.esss[i].valor);
        }
      },
      (error) => {
        console.log(error)
      }
    );
  }
}

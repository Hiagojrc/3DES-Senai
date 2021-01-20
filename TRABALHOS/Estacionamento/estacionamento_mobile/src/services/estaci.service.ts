import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URLBASE } from "../config/api.config";
import { Estacionamento } from "../models/estacionamento";

@Injectable()
export class EstacionamentoService {

    constructor(public HttpClient: HttpClient) { }

    get(estacionamento: Estacionamento) {
        var url = URLBASE.urlBase + "/route.servicos.php?id_servico=" + estacionamento.id_servico;
        return this.HttpClient.get<Estacionamento[]>(url);
    }
}
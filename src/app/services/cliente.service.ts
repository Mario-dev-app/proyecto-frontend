import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { LoginService } from './login.service';
import { Cliente } from './../models/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  desde: number = 0;
  limite: number = 5;
  clientes: Cliente[] = [];

  constructor(
    private http: HttpClient,
    private ls: LoginService
    ) { }

  obtenerClientes(){
    return this.http.get(`${URL}/cliente?desde=${this.desde}&limite=${this.limite}`, {
      headers: {
        token: this.ls.token
      }
    });
  }

  guardarCliente(cliente: any){
    return this.http.post(`${URL}/cliente`, cliente, {
      headers: {
        token: this.ls.token
      }
    });
  }

  actualizarCliente(cliente: any, id: string){
    return this.http.put(`${URL}/cliente/${id}`, cliente, {
      headers: {
        token: this.ls.token
      }
    });
  }

  eliminarCliente(id: string){
    return this.http.delete(`${URL}/cliente/${id}`, {
      headers: {
        token: this.ls.token
      }
    });
  }

}

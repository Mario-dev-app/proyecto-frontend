import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { getUsuariosResponse, Usuario } from '../models/interfaces';
import { Observable } from 'rxjs';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  limite: number = 5;
  desde: number = 0;
  usuarios: Usuario[] = [];
  roles: string[] = ['ADMIN_ROLE', 'USER_ROLE', 'SELLER_ROLE'];

  constructor(
    private ls: LoginService,
    private http: HttpClient
  ) { }

  isLogged(){
    return this.ls.token.length > 3;
  }

  obtenerUsuarios(): Observable<getUsuariosResponse>{
    return this.http.get<getUsuariosResponse>(`${URL}/usuario?desde=${this.desde}&limite=${this.limite}`, {
      headers: {
        token: this.ls.token
      }
    });
  }

  cambiarEstado(estado: boolean, id: string){
    return this.http.delete(`${URL}/usuario/${id}/${estado.toString()}`, {
      headers:{
        token: this.ls.token
      }
    });
  }
}

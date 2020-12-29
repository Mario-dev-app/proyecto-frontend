import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from '../models/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string = '';

  usuario: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router
    ) {
    this.cargarLocalStorage();
  }

  login(email: string, password: string){
    const body = {email, password};
    return this.http.post(`${URL}/login`, body).pipe(
      map( (data : any) => {
        this.token = data.token;
        this.usuario = data.usuario;
        this.guardarLocalStorage(data.token, data.usuario);
      })
    )
  }

  guardarLocalStorage(token: string, usuario: any){
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  cargarLocalStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
    }
    if(localStorage.getItem('usuario')){
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.usuario = {};
    this.token = '';
    this.router.navigateByUrl('/login');
  }
}

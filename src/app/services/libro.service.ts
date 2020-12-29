import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { getLibrosResponse, Libro } from './../models/interfaces';
import { LoginService } from './login.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  desde: number = 0;
  limite: number = 5;
  libros: Libro[] = [];

  constructor(
    private http: HttpClient,
    private ls: LoginService
    ) { }

  obtenerLibros(desde?: number) : Observable<getLibrosResponse>{
    if(desde != null){
      this.desde += desde;
    }
    return this.http.get<getLibrosResponse>(`${URL}/libro?desde=${this.desde}&limite=${this.limite}`);
  }

  buscarLibrosPorTermino(termino: string) : Observable<getLibrosResponse>{
    return this.http.get<getLibrosResponse>(`${URL}/libro/${termino}`);
  }

  guardarLibroNuevo(libroNuevo: any){
    return this.http.post(`${URL}/libro`, libroNuevo, {
      headers:{
        token: this.ls.token
      }
    });
  }

  actualizarLibro(libroToUpdate: any, id: string){
    return this.http.put(`${URL}/libro/${id}`, libroToUpdate, {
      headers: {
        token: this.ls.token
      }
    });
  }

  eliminarLibro(id: string){
    return this.http.delete(`${URL}/libro/${id}`, {
      headers: {
        token: this.ls.token
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { LibroService } from 'src/app/services/libro.service';
import { Libro } from './../../models/interfaces';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  libros: Libro[] = [];

  constructor(private lbs: LibroService) { }

  ngOnInit(): void {
  }

  buscarLibros(termino: string){
    if(termino.length == 0){
      return this.libros = [];
    }
    this.lbs.buscarLibrosPorTermino(termino).subscribe(
      data => {
        this.libros = data.libros;
      }
    );
  }

}

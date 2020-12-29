import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LibroService } from '../../services/libro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Libro } from './../../models/interfaces';
import { LoginService } from './../../services/login.service';

declare var M : any;

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit, AfterViewInit {

  formGroup: FormGroup;

  libro: Libro = {_id : null};

  prev: boolean;

  next: boolean;

  constructor(
    public lbs: LibroService,
    public ls: LoginService,
    private formBuilder: FormBuilder
    ) { }

  ngAfterViewInit(): void {
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
  }

  ngOnInit(): void {
    this.prev = false;
    this.cargarLibros();
    this.buildForm();
  }

  buildForm(){
    this.formGroup = this.formBuilder.group({
      autor: ['', [Validators.required, Validators.minLength(3)]],
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      codigo: ['', [Validators.required, Validators.minLength(3)]],
      cantidad: [0.00, [Validators.required, Validators.min(1)]],
      precio: [0, [Validators.required, Validators.min(1)]]
    });
    document.getElementById('cantidad-label').className = "active";
    document.getElementById('precio-label').className = "active";
  }

  clearValuesFormGroup(){
    this.libro = {_id: null};
    this.formGroup.setValue({
      autor: '',
      titulo: '',
      codigo: '',
      cantidad: 0.00,
      precio: 0
    });
    Object.values(this.formGroup.controls).forEach(control => {
      control.markAsUntouched();
    });

    document.getElementById('autor-label').className = "";
    document.getElementById('titulo-label').className = "";
    document.getElementById('codigo-label').className = "";
  }


  cargarLibros(desde?: number){
    this.lbs.obtenerLibros(desde).subscribe(data => {
      this.lbs.libros = data.libros;
    });
  }

  get autorValido(){
    return this.formGroup.get('autor').invalid && this.formGroup.get('autor').touched;
  }

  get tituloValido(){
    return this.formGroup.get('titulo').invalid && this.formGroup.get('titulo').touched;
  }

  get codigoValido(){
    return this.formGroup.get('codigo').invalid && this.formGroup.get('codigo').touched;
  }

  get cantidadValida(){
    return this.formGroup.get('cantidad').invalid && this.formGroup.get('cantidad').touched;
  }

  get precioValido(){
    return this.formGroup.get('precio').invalid && this.formGroup.get('precio').touched;
  }


  guardarActualizarLibro(){

    if(this.formGroup.invalid){
      return Object.values(this.formGroup.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    if(this.libro._id == null || this.libro._id == 'undefined'){
      this.libro = {
        autor: this.formGroup.get('autor').value,
        titulo: this.formGroup.get('titulo').value,
        codigo: this.formGroup.get('codigo').value,
        cantidad: this.formGroup.get('cantidad').value,
        precio: this.formGroup.get('precio').value
      }

      this.lbs.guardarLibroNuevo(this.libro).subscribe(
        () => {
          document.getElementById('close-my-modal').click();
          Swal.fire({
            title: 'Info',
            text: 'Se guardó el libro correctamente',
            icon: 'success',
            cancelButtonText: 'Hecho'
          });
          this.clearValuesFormGroup();
          this.cargarLibros();
        },
        error => {
          document.getElementById('close-my-modal').click();
          Swal.fire({
            title: 'Ooooops!',
            text: 'Hubo un error al momento de guardar el nuevo libro',
            icon: 'error',
            cancelButtonText: 'Hecho'
          });
          this.clearValuesFormGroup();
        }
      )
    }else{
      this.libro.autor = this.formGroup.get('autor').value;
      this.libro.titulo = this.formGroup.get('titulo').value;
      this.libro.codigo = this.formGroup.get('codigo').value;
      this.libro.cantidad = this.formGroup.get('cantidad').value;
      this.libro.precio = this.formGroup.get('precio').value;
      this.lbs.actualizarLibro(this.libro, this.libro._id).subscribe(
        () => {
          document.getElementById('close-my-modal').click();
          Swal.fire({
            title: 'Info',
            text: 'El libro ha sido actualizado correctamente',
            icon: 'success',
            confirmButtonText: 'Hecho'
          });
          this.clearValuesFormGroup();
          this.cargarLibros();
        },
        error => {
          document.getElementById('close-my-modal').click();
          Swal.fire({
            title: 'Ooooops!',
            text: 'Hubo un error al momento de actualizar el libro',
            icon: 'error',
            cancelButtonText: 'Hecho'
          });
          this.clearValuesFormGroup();
        }
      );
    }
  }

  cargarLibroToEdit(id: string){
    this.libro = this.lbs.libros.find(libro => libro._id == id);
    this.formGroup.setValue({
      autor: this.libro.autor,
      titulo: this.libro.titulo,
      codigo: this.libro.codigo,
      cantidad: this.libro.cantidad,
      precio: this.libro.precio
    });
    document.getElementById('autor-label').className = "active";
    document.getElementById('titulo-label').className = "active";
    document.getElementById('codigo-label').className = "active";
  }

  eliminarLibro(id: string){
    Swal.fire({
      title: 'Alerta',
      text: "¿Seguro que desea eliminar el libro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.isConfirmed) {
        this.lbs.eliminarLibro(id).subscribe(
          () => {
            Swal.fire({
              title: 'Info',
              text: 'El libro ha sido eliminado con éxito',
              icon: 'success',
              cancelButtonText: 'Hecho'
            });
            this.cargarLibros();
          },
          error => {
            Swal.fire({
              title: 'Ooooops!',
              text: 'Ocurrió un error al intentar eliminar el libro',
              icon: 'error',
              cancelButtonText: 'Hecho'
            });
          }
        );
      }
    });
  }

  paginador(numero: number){
    this.cargarLibros(numero);
  }

}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from './../../services/cliente.service';
import Swal from 'sweetalert2';
import { Cliente } from './../../models/interfaces';

declare var M : any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit, AfterViewInit {

  formGroup: FormGroup;

  cliente: Cliente;

  constructor(
    public cs: ClienteService,
    private formBuilder: FormBuilder
    ) { }


  ngAfterViewInit(): void {
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
  }

  ngOnInit(): void {
    this.cargarClientes();
    this.buildForm();
  }

  cargarClientes(){
    this.cs.obtenerClientes().subscribe( (data: any) => {
      this.cs.clientes = data.clientes
    });
  }

  buildForm(){
    this.formGroup = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(5)]],
      nroDoc: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', Validators.email],
      telefono: ''
    });
  }

  setearForm(){
    this.cliente = {_id: null};
    this.formGroup.setValue({
      nombre: '',
      apellidos: '',
      nroDoc: '',
      email: '',
      telefono: ''
    });
    Object.values(this.formGroup.controls).forEach(control => {
      control.markAsUntouched();
    });
  }

  get nombreValido(){
    return this.formGroup.get('nombre').invalid && this.formGroup.get('nombre').touched;
  }

  get apellidosValidos(){
    return this.formGroup.get('apellidos').invalid && this.formGroup.get('apellidos').touched;
  }

  get nroDocValido(){
    return this.formGroup.get('nroDoc').invalid && this.formGroup.get('nroDoc').touched;
  }

  get emailValido(){
    return this.formGroup.get('email').invalid && this.formGroup.get('email').touched;
  }

  guardarActualizarCliente(){
    if(this.formGroup.invalid){
      return Object.values(this.formGroup.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    this.cliente.nombre = this.formGroup.get('nombre').value;
    this.cliente.apellidos = this.formGroup.get('apellidos').value;
    this.cliente.nroDoc = this.formGroup.get('nroDoc').value;
    this.cliente.email = this.formGroup.get('email').value;
    this.cliente.telefono = this.formGroup.get('telefono').value;

    if(this.cliente._id == null){
      this.cs.guardarCliente(this.cliente).subscribe(
        () => {
          document.getElementById('close-my-modal').click();
          this.setearForm();
          Swal.fire({
            title: 'Info',
            text: 'Se guardó al cliente correctamente',
            icon: 'success',
            cancelButtonText: 'Hecho'
          });
          this.cargarClientes();
        },
        err => {
          document.getElementById('close-my-modal').click();
          this.setearForm();
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al intentar guardar al cliente',
            icon: 'error',
            cancelButtonText: 'Hecho'
          });
        }
      )
    }else{
      this.cs.actualizarCliente(this.cliente, this.cliente._id).subscribe(
        () => {
          document.getElementById('close-my-modal').click();
          this.setearForm();
          Swal.fire({
            title: 'Info',
            text: 'Se guardó al cliente correctamente',
            icon: 'success',
            cancelButtonText: 'Hecho'
          });
          this.cargarClientes();
        },
        err => {
          document.getElementById('close-my-modal').click();
          this.setearForm();
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al intentar guardar al cliente',
            icon: 'error',
            cancelButtonText: 'Hecho'
          });
        }
      )
    }
  }

  cargarClienteToEdit(id: string){
    this.cliente = this.cs.clientes.find(cliente => cliente._id == id);
    this.formGroup.setValue({
      nombre: this.cliente.nombre,
      apellidos: this.cliente.apellidos,
      nroDoc: this.cliente.nroDoc,
      email: this.cliente.email,
      telefono: this.cliente.telefono
    });
    document.getElementById('nombre-label').className = "active";
    document.getElementById('apellidos-label').className = "active";
    document.getElementById('nroDoc-label').className = "active";
    if(this.cliente.email.length > 0){
      document.getElementById('email-label').className = "active";
    }
    if(this.cliente.telefono.length > 0){
      document.getElementById('telefono-label').className = "active";
    }
  }

  eliminarCliente(id: string){
    Swal.fire({
      title: 'Alerta',
      text: "¿Seguro que desea eliminar el cliente?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cs.eliminarCliente(id).subscribe(
          () => {
            Swal.fire({
              title: 'Info',
              text: 'El cliente ha sido eliminado con éxito',
              icon: 'success',
              cancelButtonText: 'Hecho'
            });
            this.cargarClientes();
          },
          error => {
            Swal.fire({
              title: 'Ooooops!',
              text: 'Ocurrió un error al intentar eliminar el cliente',
              icon: 'error',
              cancelButtonText: 'Hecho'
            });
          }
        );
      }
    });
  }

}

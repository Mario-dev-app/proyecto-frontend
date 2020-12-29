import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UsuarioService } from './../../services/usuario.service';
import { LoginService } from './../../services/login.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../models/interfaces';

declare var M : any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, AfterViewInit {

  formGroupNew: FormGroup;

  formGroupUpdate: FormGroup;

  usuario: Usuario;

  constructor(
    public us: UsuarioService,
    private ls: LoginService,
    private formBuilder: FormBuilder
    ) { }

  ngAfterViewInit(): void {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);

    elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.buildFormNew();
    this.buildFormUpdate();
  }

  buildFormNew(){
    this.formGroupNew = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ''
    });
  }

  buildFormUpdate(){
    this.formGroupUpdate = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  cargarUsuarios(){
    this.us.obtenerUsuarios().subscribe(
      data => {
        this.us.usuarios = data.usuarios;
      }
    );
  }

  usuarioStateChange(value: boolean, id: string){
    if(this.ls.usuario._id == id){
      Swal.fire({
        title: 'Info',
        text: 'No puedes modificar el estado de un usuario con sesión activa',
        icon: 'info',
        confirmButtonText: 'Hecho'
      });
      return this.cargarUsuarios();
    }

    this.us.cambiarEstado(value, id).subscribe(
      () => {
        Swal.fire({
          title: 'Info',
          text: 'Estado modificado correctamente',
          icon: 'success',
          confirmButtonText: 'Hecho'
        });
        this.cargarUsuarios();
      },
      err => {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al intentar modificar el estado del usuario',
          icon: 'error',
          confirmButtonText: 'Hecho'
        });
        this.cargarUsuarios();
      }
    )
  }

  cargarUsuarioToEdit(id: string){
    this.usuario = this.us.usuarios.find(usuario => usuario._id == id);
    console.log(this.usuario);
    this.formGroupUpdate.setValue({
      nombre: this.usuario.nombre,
      apellido: this.usuario.apellido,
      email: this.usuario.email
    });
    document.getElementById('nombre-label').className = "active";
    document.getElementById('apellido-label').className = "active";
    document.getElementById('email-label').className = "active";
  }

  changeRole(e){
    console.log(e);
  }

  guardarUsuario(){
    console.log(this.formGroupNew.value);
  }

}

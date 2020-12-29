import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ls: LoginService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.buildForm();
    if(localStorage.getItem('email')){
      this.formGroup.get('email').setValue(localStorage.getItem('email'));
      document.getElementById('usuario-label').className = "active";
    }
  }

  get usuarioValido(){
    return this.formGroup.get('email').invalid && this.formGroup.get('email').touched;
  }

  get passwordValido(){
    return this.formGroup.get('password').invalid && this.formGroup.get('password').touched;
  }

  login(){
    if(this.formGroup.invalid){
      return Object.values(this.formGroup.controls).forEach( control => {
        control.markAsTouched();
      });
    }

    if(this.formGroup.get('recuerdame').value){
      localStorage.setItem('email', this.formGroup.get('email').value);
    }else{
      localStorage.removeItem('email');
    }


    this.ls.login(this.formGroup.get('email').value, this.formGroup.get('password').value).subscribe(
      () => {
        this.router.navigateByUrl('/ventas');
      },
      err => {
        Swal.fire({
          title: 'Info',
          text: err.error.error,
          icon: 'warning',
          cancelButtonText: 'Hecho'
        });
      }
    );
  }

  buildForm(){
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      recuerdame: [true]
    });
  }

}

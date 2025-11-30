import { Component, inject } from '@angular/core';
// Formularios reactivos -> cada cosa que el usuario escriba sea ercnocido por el sistema
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '../../interfaces/credentials';
import { LoginService } from '../../services/login';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private _loginService = inject(LoginService);
  private router = inject(Router);

  loginForm = new FormGroup({
    emailLogin: new FormControl('', [Validators.required, Validators.email]),
    passwordLogin: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  // manejo de eventos
  handleSubmit() {
    // const email = this.loginForm.value.emailLogin;
    // const password = this.loginForm.value.passwordLogin;
    // console.log(email,password );

    const credencials: Credentials = {
      emailLogin: this.loginForm.value.emailLogin || '',
      passwordLogin: this.loginForm.value.passwordLogin || ''
    };
    console.log('Credenciales para Login', credencials);
    //Logica de autenticacion al back va aqui
    this._loginService.login(credencials).subscribe({
      //manejo de la respuesta exitosa o error
      next: (res: any) => {
        console.log(res);
        if (res) {
          //guardar el token en el local storage
          localStorage.setItem('token', res.token);
          console.log("token guardado", res.token);

          if (res) {
            localStorage.setItem('usuarioId', res._id);
            console.log('ID de usuario guardado:', res._id);
          }

            Swal.fire({
              title: "Excelente!",
              icon: "success",
              text: res.mensaje,
              draggable: true
            }).then(() => {
              // this.router.navigate(['/admin']);
              this._loginService.redirectTo();
            })
          }
        },
        error: (err: any) => {
          console.error('Error en login', err.error.mensaje);
          Swal.fire({
            title: "Oops!",
            icon: "error",
            draggable: true
          });
        }

      });
  }
}

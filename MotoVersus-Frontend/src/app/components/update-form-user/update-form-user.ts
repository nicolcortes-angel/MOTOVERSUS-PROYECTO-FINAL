import { Component, inject, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/users';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-form-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-form-user.html',
  styleUrl: './update-form-user.css'
})


export class UpdateFormUser implements OnInit {
  @Input() userId: string | null = null;

  private _userService = inject(UserService);
  private _router = inject(Router);

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    number: new FormControl<number | null>(null),
    photo: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  ngOnInit(): void {
    if (this.userId) {
      this._userService.getUserById(this.userId).subscribe({
        next: (res: any) => {
          const user = res.data;
          this.registerForm.patchValue({
            name: user.nombre,
            lastname: user.apellido,
            username: user.user,
            email: user.correo,
            number: user.numero,
            photo: user.fotoPerfil,
            password: user.contrasena
          });
        },
        error: (err) => console.error('Error al cargar usuario:', err)
      });
    }
  }

//   handleSubmit() {
//     if (!this.userId) return;

//     const userData: User = {
//       _id: this.userId,
//       nombre: this.registerForm.value.name || '',
//       apellido: this.registerForm.value.lastname || '',
//       user: this.registerForm.value.username || '',
//       correo: this.registerForm.value.email || '',
//       numero: this.registerForm.value.number || 0,
//       contrasena: this.registerForm.value.password || '',
//       fotoPerfil: this.registerForm.value.photo || '',
//       role: 'user'
//     };

//     this._userService.putUser(userData, this.userId).subscribe({
//       next: (res: any) => {
//         Swal.fire({
//           title: 'Actualizado correctamente',
//           text: res.mensaje,
//           icon: 'success'
//         }).then(() => {
//   location.reload(); 
// });
//       },
//       error: (err: any) => {
//         Swal.fire({
//           title: 'Error',
//           text: err.error.mensaje || 'No se pudo actualizar el usuario',
//           icon: 'error'
//         });
//       }
//     });
//   }
}
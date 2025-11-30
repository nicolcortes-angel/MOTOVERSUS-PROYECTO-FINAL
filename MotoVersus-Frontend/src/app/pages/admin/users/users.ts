import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/users';
import { User } from '../../../interfaces/user';
import Swal from 'sweetalert2';
import { UpdateFormUser } from '../../../components/update-form-user/update-form-user';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UpdateFormUser],
  templateUrl: './users.html',
  styleUrl: './users.css'
})


export class Users implements OnInit {
  private _userService = inject(UserService);
  allUsers: User[] = [];

  selectedUserId: string | null = null;
  showUpdateForm = false;

  ngOnInit(): void {
    this.showUsers();
  }

 showUsers() {
  this._userService.getUser().subscribe({
    next: (res: any) => {
      console.log('Respuesta completa del backend:', res);
      // observa qué propiedad realmente contiene los usuarios
      this.allUsers = res.data || res.users || res; 
      console.log('Usuarios asignados:', this.allUsers);
    },
    error: (err: any) => {
      console.error('Error al obtener usuarios:', err);
    }
  });
}


  deleteUser(id: string) {
    this._userService.deleteUser(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: 'Usuario eliminado',
          text: res.mensaje,
          icon: 'success'
        }).then(() => this.showUsers());
      },
      error: (err: any) => console.error('Error al eliminar usuario:', err)
    });
  }

  updateUsersInfo(id: string) {
    this.selectedUserId = id;
    this.showUpdateForm = true;
  }
}
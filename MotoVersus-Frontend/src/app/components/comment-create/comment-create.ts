import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-create.html',
  styleUrl: './comment-create.css'
})
export class CommentCreate implements OnInit {

  userId: string | null = null;
  userName: string = '';
  userPhoto: string = '';

  // No usamos la interfaz completa aquí para evitar el error de tipo
  newComment = {
    texto: '',
    fecha: new Date()
  };

  showForm = false;

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('usuarioId');
    this.userName = localStorage.getItem('usuarioNombre') || '';
    this.userPhoto = localStorage.getItem('usuarioFoto') || '';
  }

  // Mostrar / ocultar el formulario
  toggleForm() {
    this.showForm = !this.showForm;
  }

  // Crear comentario
  createComment() {
    if (!this.newComment.texto.trim()) {
      Swal.fire('Error', 'Debes escribir un comentario', 'error');
      return;
    }

    if (!this.userId) {
      Swal.fire('Error', 'Por favor, inicia sesión para dejar tu comentario.', 'error');
      return;
    }

    // 👇 Cuerpo ajustado al formato que requiere tu API
    const commentToSend = {
      texto: this.newComment.texto,
      usuario: this.userId,
      fecha: new Date()
    };

    this.commentsService.postComments(commentToSend as any).subscribe({
      next: () => {
        Swal.fire('✅ Éxito', 'Comentario creado correctamente', 'success');
        this.resetForm();
      },
      error: (err) => {
        console.error('❌ Error al crear comentario:', err);
        Swal.fire('Error', 'No se pudo crear el comentario', 'error');
      }
    });
  }

  // Limpiar y ocultar formulario
  resetForm() {
    this.newComment = {
      texto: '',
      fecha: new Date()
    };
    this.showForm = false;
  }
}

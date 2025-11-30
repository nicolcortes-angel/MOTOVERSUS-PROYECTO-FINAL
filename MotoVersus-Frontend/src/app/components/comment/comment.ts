import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments';
import { Comments } from '../../interfaces/comments';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment.html',
  styleUrl: './comment.css'
})
export class CommentsComponent implements OnInit {

  baseUrl: string = environment.appUrl;
  commentsList: Comments[] = [];

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this.commentsService.getComments().subscribe({
      next: (res) => {
        // ⚠️ Tu API envuelve los datos en la propiedad "data"
        this.commentsList = res.data;
        console.log('✅ Comentarios cargados:', this.commentsList);
      },
      error: (err) => console.error('Error al cargar comentarios:', err)
    });
  }

  // ✅ Método auxiliar para crear las diapositivas del carrusel (3 comentarios por slide)
  getSlidesCount(): number[] {
    const totalSlides = Math.ceil(this.commentsList.length / 3);
    return Array.from({ length: totalSlides }, (_, i) => i);
  }
}
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comments } from '../interfaces/comments';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private _httpClient = inject(HttpClient);
  private apiUrl = environment.appUrl;

  // metodos para hacer las peticiones a la api

  //peticion post
  postComments(commentToCreate: Comments): Observable<Comments> {
    return this._httpClient.post<Comments>(`${this.apiUrl}/comments/crear`, commentToCreate);
  }

  //peticion get
  getComments(): Observable<{ mensaje: string; data: Comments[] }> {
    return this._httpClient.get<{ mensaje: string; data: Comments[] }>(
      `${this.apiUrl}/comments/mostrar`
    );
  }

  // peticion get por usuario
  getCommentsByUser(userId: string): Observable<Comments[]> {
    return this._httpClient.get<Comments[]>(`${this.apiUrl}/comments/usuario/${userId}`);
  }

  // peticion put
  putComments(commentToUpdate: Comments, id: string): Observable<Comments> {
    return this._httpClient.put<Comments>(`${this.apiUrl}/comments/actualizar/${id}`, commentToUpdate);
  }

  // peticion delete
  deleteComments(id: string): Observable<{ message: string }> {
    return this._httpClient.delete<{ message: string }>(`${this.apiUrl}/comments/eliminar/${id}`);
  }
}

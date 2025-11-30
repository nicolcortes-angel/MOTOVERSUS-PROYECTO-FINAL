import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // inyeccion de dependencias
  private _httpClient = inject(HttpClient);

  // definir la ruta de acceso a la api
  private apiUrl = environment.appUrl;

  // metodos para hacer las peticiones a la api

  //peticion post
  postProduct(productToCreate: Product) {
    return this._httpClient.post(this.apiUrl + '/products/crear', productToCreate);
  }

  //peticion get
  getProduct() {
     const token = localStorage.getItem('token'); // o sessionStorage si lo guardas ahí
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this._httpClient.get(`${this.apiUrl}/products/mostrar`, { headers });
      }

   getProductById(id: string) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this._httpClient.get(`${this.apiUrl}/products/mostrar/${id}`, { headers });
    }

    // peticion get por categoria
      getProductByCategory(category: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._httpClient.get(`${this.apiUrl}/products/mostrar/${category}`, { headers });
  }


  // peticion put
  putProduct(productToUpdate: Product | FormData, id: string) {
  return this._httpClient.put(`${this.apiUrl}/products/actualizar/${id}`, productToUpdate);
  }

  // peticion delete
  deleteProduct(id: string) {
    return this._httpClient.delete(this.apiUrl + '/products/eliminar/' + id);
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ProductService } from '../../services/products';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-carrusel',
  imports: [],
  templateUrl: './carrusel.html',
  styleUrl: './carrusel.css',
})
export class Carrusel {
  _productService = inject(ProductService);
  allProducts: Product[] = []; 
  baseUrl: string = environment.appUrl;

  showProducts() {
    this._productService.getProduct().subscribe({
      next: (response: any) => {
        this.allProducts = response.data;
        console.log(this.allProducts);
      }, 
      error: (error: any) => {
        console.error(error);
      }, 
    });
  }

  ngOnInit(): void {

    this.showProducts();
  }
}

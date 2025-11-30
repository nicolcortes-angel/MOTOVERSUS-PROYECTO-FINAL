import { Component, inject, OnInit, Input } from '@angular/core';
import { ProductService } from '../../services/products';
import { Product } from '../../interfaces/product';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card implements OnInit {
  _productService = inject(ProductService);
  allProducts: Product[] = [];
  baseUrl: string = environment.appUrl;

  @Input() categoriaFiltro: string = '';

  ngOnInit(): void {
    this.loadProducts();
  }

  // Cargar productos según la categoría
  loadProducts() {
    if (this.categoriaFiltro) {
      this.showProductsByCategory(this.categoriaFiltro);
    } else {
      this.showAllProducts();
    }
  }

  // Traer todos los productos
  showAllProducts() {
    this._productService.getProduct().subscribe({
      next: (response: any) => {
        this.allProducts = response.data;
        console.log('Todos los productos:', this.allProducts);
      },
      error: (error: any) => console.error(error)
    });
  }

  // Traer productos por categoría
  showProductsByCategory(categoria: string) {
    this._productService.getProductByCategory(categoria).subscribe({
      next: (response: any) => {
        this.allProducts = response.data;
        console.log(`Productos filtrados por ${categoria}:`, this.allProducts);
      },
      error: (error: any) => console.error(error)
    });
  }
}
 
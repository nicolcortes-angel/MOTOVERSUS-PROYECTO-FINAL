import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../services/products';
import { Product } from '../../../interfaces/product';
import Swal from 'sweetalert2';
import {UpdateFormProduct} from '../../../components/update-form-product/update-form-product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  imports: [UpdateFormProduct, CommonModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class Inventory implements OnInit {
    private _ProductService = inject(ProductService);
  allProducts: Product[] = [];

  // 2. formgroups y formcontrols que necesite
  // ...
  selectedProductId: string | null = null;
  showUpdateForm = false;

  ngOnInit(): void {
    this.showProducts();
  }

  // 3. metodos que permiten hacer las peticiones y gestionar las respuestas
  showProducts() {
    // hace la peticion GET
    this._ProductService.getProduct().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allProducts = res.data;
        console.log(this.allProducts);
      },
      error: (err: any) => {
        console.error(err.error.mensaje);
      },
    });
  }

  deleteProduct(id: string) {
    // hace la petición DELETE
    console.log('Producto a Eliminar: ', id);
    this._ProductService.deleteProduct(id).subscribe({
      next: (res: any) => {
        console.log(res);
        Swal.fire({
          title: 'Producto eliminado',
          text: res.mensaje,
          icon: 'success',
        }).then(() => {
          this.showProducts();
        });
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  updateProductsInfo(productId: string) {
    if (this.showUpdateForm && this.selectedProductId === productId) {
    this.showUpdateForm = false;
    this.selectedProductId = null;
    return;
  }

  // 🟢 Si es otro producto o estaba cerrado, lo abre
  this.showUpdateForm = true;
  this.selectedProductId = productId;
}

}
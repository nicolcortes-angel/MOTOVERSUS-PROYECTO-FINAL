import { Component, inject, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import {Product} from '../../interfaces/product';
import { ProductService } from '../../services/products';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-update-form-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-form-product.html',
  styleUrl: './update-form-product.css'
})
export class UpdateFormProduct implements OnInit {
  @Input() productId: string | null = null;

  private _productService = inject(ProductService);
  private _router = inject(Router);

  // Formulario reactivo
  registerForm = new FormGroup({
  name: new FormControl(''),
  description: new FormControl(''),
  cilind: new FormControl<number | null>(null),
  motors: new FormControl(''),
  potence: new FormControl(''),
  transmition: new FormControl(''),
  size: new FormControl<number | null>(null),
  price: new FormControl<number | null>(null),
  category: new FormControl(''),
});

  // Variables para la imagen
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  ngOnInit(): void {
    if (this.productId) {
      this._productService.getProductById(this.productId).subscribe({
        next: (res: any) => {
          const product = res.data;
          this.registerForm.patchValue({
            name: product.nombre,
            description: product.descripcion,
            cilind: product.cilindraje,
            motors: product.motor,
            potence: product.potencia,
            transmition: product.transmision,
            size: product.peso,
            price: product.precio,
            category: product.categoria
          });
          // Cargar la imagen existente
          this.previewUrl = product.imagenUrl;
        },
        error: (err) => console.error('Error al cargar producto:', err)
      });
    }
  }

  // Manejar la selección de archivo y mostrar la vista previa
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Enviar la actualización
  handleSubmit() {
  if (!this.productId) return;

  const formData = new FormData();

  const data = this.registerForm.value;

  // Solo agregar al formData los campos que tienen valor
  if (data.name) formData.append('nombre', data.name);
  if (data.description) formData.append('descripcion', data.description);
  if (data.cilind) formData.append('cilindraje', String(data.cilind));
  if (data.motors) formData.append('motor', data.motors);
  if (data.potence) formData.append('potencia', data.potence);
  if (data.transmition) formData.append('transmision', data.transmition);
  if (data.size) formData.append('peso', String(data.size));
  if (data.price) formData.append('precio', String(data.price));
  if (data.category) formData.append('categoria', data.category);

  // Imagen solo si se cambió
  if (this.selectedFile) {
    formData.append('imagenUrl', this.selectedFile);
  } else if (this.previewUrl) {
    // Enviar la URL existente para no perderla
    formData.append('imagenUrl', this.previewUrl.toString());
  }

  this._productService.putProduct(formData, this.productId).subscribe({
    next: (res: any) => {
      Swal.fire({
        title: 'Actualizado correctamente',
        text: res.mensaje,
        icon: 'success'
      }).then(() => location.reload());
    },
    error: (err: any) => {
      Swal.fire({
        title: 'Error',
        text: err.error.mensaje || 'No se pudo actualizar el producto',
        icon: 'error'
      });
    }
  });
}
}
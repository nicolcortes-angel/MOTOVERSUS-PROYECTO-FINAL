# MotoVersusFrontend

Este proyecto fue generado utilizando [Angular CLI](https://github.com/angular/angular-cli) versión 20.3.2.  

MotoVersusFrontend es una aplicación web enfocada en la gestión de productos y usuarios, ofreciendo funcionalidades de perfil de usuario, panel de administración, comentarios y formularios de registro y login.

---

## Funcionalidades principales

### Gestión de usuarios
- Registro y login de usuarios con validaciones.
- Perfil de usuario con actualización de datos y foto de perfil.
- Panel de administración para gestionar usuarios (agregar, editar, eliminar).

### Gestión de productos
- Relación de productos con bases de datos.
- Panel de administración para agregar, editar y eliminar productos.
- Filtrado de productos por categoría.

### Comentarios
- Lógica de comentarios para usuarios sobre productos o publicaciones.
- Formularios para registrar y visualizar comentarios.

### Formularios
- Formulario de registro de usuario.
- Formulario de login con validaciones.
- Formulario de creación y edición de productos.

---

## Arquitectura del proyecto

Frontend (Angular)
┌────────────────────┐
│ src/app/components │ ← Componentes de usuarios, productos y comentarios
│ src/app/services │ ← Servicios para consumir API del backend
│ src/app/interfaces │ ← Interfaces de tipado TypeScript
│ src/assets │ ← Imágenes, estilos y recursos estáticos
│ src/environments │ ← Configuración de URLs y variables de entorno
└────────────────────┘

Backend (Node.js + Express)
┌──────────────────────┐
│ Controllers │ ← Lógica de usuarios, productos y comentarios
│ Models (Mongoose) │ ← Esquemas de MongoDB
│ Routes │ ← Endpoints de la API
│ Middleware │ ← Autenticación, subida de archivos, validaciones
└──────────────────────┘

Base de datos (MongoDB)
┌─────────────┐
│ Users │
│ Products │
│ Comments │
└─────────────┘


### Flujo de datos

1. El **usuario interactúa** con los componentes Angular (login, perfil, productos, comentarios).
2. Angular envía **peticiones HTTP** a los servicios (`UserService`, `ProductService`, `CommentService`).
3. Los servicios consumen los **endpoints del backend**.
4. El backend procesa la solicitud, valida datos y realiza operaciones en **MongoDB**.
5. La respuesta se devuelve al frontend para **actualizar la interfaz**.

---

## Tecnologías utilizadas

- Angular 20  
- TypeScript  
- Bootstrap (CSS y layout)  
- SweetAlert2 (notificaciones)  
- Node.js y Express (backend)  
- MongoDB / Mongoose (base de datos)  

---

## Requisitos del sistema

- Node.js >= 18  
- Angular CLI >= 20  
- MongoDB  
- npm >= 9  

---

## Instalación

1. Clonar el repositorio:

git clone https://github.com/tu-usuario/MotoVersusFrontend.git
cd MotoVersusFrontend
npm install

2. Configurar variables de entorno en src/environments/environment.ts:

export const environment = {
  production: false,
  appUrl: 'http://localhost:3000'
};

3. Ejecutar el servidor de desarrollo:

ng serve
Abrir el navegador en http://localhost:4200/.

## Endpoints del backend (resumen):
### Usuarios
| Método | Endpoint     | Descripción                  | Ejemplo request |
|--------|------------|-----------------------------|----------------|
| GET    | /users     | Obtener todos los usuarios   | -              |
| GET    | /users/:id | Obtener usuario por ID       | -              |
| POST   | /users     | Crear usuario                | { "nombre": "Juan", "correo": "juan@mail.com", "contrasena": "1234" } |
| PUT    | /users/:id | Actualizar usuario           | { "nombre": "Juan", "correo": "juan@mail.com" } |
| DELETE | /users/:id | Eliminar usuario             | -              |


### Productos
| Método | Endpoint                        | Descripción                        | Ejemplo request |
|--------|---------------------------------|------------------------------------|----------------|
| GET    | /products                        | Obtener todos los productos        | -              |
| GET    | /products/:id                     | Obtener producto por ID            | -              |
| GET    | /products/category/:category      | Filtrar productos por categoría    | -              |
| POST   | /products                        | Crear producto                     | { "nombre": "MotoX", "categoria": "motos", "precio": 2000 } |
| PUT    | /products/:id                     | Actualizar producto                | { "precio": 2200 } |
| DELETE | /products/:id                     | Eliminar producto                  | -              |


### Comentarios
| Método | Endpoint        | Descripción                  | Ejemplo request |
|--------|----------------|-----------------------------|----------------|
| GET    | /comments       | Obtener todos los comentarios | -              |
| POST   | /comments       | Crear comentario             | { "userId": "123", "productoId": "456", "mensaje": "Excelente!" } |
| DELETE | /comments/:id   | Eliminar comentario          | -              |



### Edición de perfil de usuario

Hacer click en “Editar perfil”.
Modificar datos y/o contraseña.
Guardar cambios.

### Panel de administración

Gestionar productos y usuarios.
Acceder a comentarios y eliminarlos si es necesario.

### Buenas prácticas

Mantener consistencia en nombres de componentes, servicios e interfaces.
Validar datos de formularios antes de enviarlos al backend.
Documentar cualquier cambio en los endpoints o servicios.

### Contribución

Para contribuir:
Crear un fork del repositorio.
Crear una rama (git checkout -b feature-nombre).
Hacer commit de los cambios (git commit -m "Descripción del cambio").
Enviar pull request.


## Licencia
MIT License © Duwar Rippe, Nicol Cortes, Duvan Arroyave
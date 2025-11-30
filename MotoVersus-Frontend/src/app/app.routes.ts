import { Routes } from '@angular/router';
//1. Importar todos nuestros componentes pagina
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Admin } from './pages/admin/admin';
import { Deportivas } from './pages/deportivas/deportivas';
import { Enduro } from './pages/enduro/enduro';
import { Hibrida } from './pages/hibrida/hibrida';
import { NotFound } from './pages/not-found/not-found';
import { Register } from './pages/register/register';
import { Usuario } from './pages/usuario/usuario';
import { Details } from './pages/details/details';
import { Login } from './pages/login/login';
import { Users } from './pages/admin/users/users';
import { Inventory } from './pages/admin/inventory/inventory';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', component: Home, title: 'Motoversus' },

    {
        path: 'dashboard', // path: 'admin' -> ruta principal
        component: Admin,
        title: 'Dashboard',
        canActivate: [authGuard],
        canActivateChild: [authGuard], //Proteger rutas hijas
        children: [
            {path: '', component: Users},
            {path: 'inventory', component: Inventory} //title es opcional
        ]
    },

    { path: 'about', component: About, title: 'About' },
    { path: 'admin', component: Admin, title: 'Admin' },
    { path: 'deportivas', component: Deportivas, title: 'Deportivas' },
    { path: 'enduro', component: Enduro, title: 'Enduro' },
    { path: 'hibrida', component: Hibrida, title: 'Hibrida' },
    { path: 'details/:id', component: Details, title: 'Product Details' },
    { path: 'register', component: Register, title: 'Register' },
    { path: 'usuario', component: Usuario, title: 'Usuario' },
    { path: 'login', component: Login, title: 'Login' },
    { path: '**', component: NotFound, title: '404' }
];

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LibrosComponent } from './libros/libros.component';
import { ClientesComponent } from './clientes/clientes.component';
import { VentasComponent } from './ventas/ventas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {path: 'ventas', component: VentasComponent},
  {path: 'libros', component: LibrosComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: '', pathMatch: 'full', redirectTo: '/ventas'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class PagesRoutingModule {}

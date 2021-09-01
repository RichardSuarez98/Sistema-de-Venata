//import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudCategoriaComponent } from '../inventario/-moduloinventario/crud-categoria/crud-categoria.component';
import { CrudInventarioComponent } from '../inventario/-moduloinventario/crud-inventario/crud-inventario.component';
import { CrudMarcaComponent } from '../inventario/-moduloinventario/crud-marca/crud-marca.component';
import { CrudProductoComponent } from '../inventario/-moduloinventario/crud-producto/crud-producto.component';
import { ListarCategoriaComponent } from '../inventario/listar-categoria/listar-categoria.component';
import { ListarInventarioComponent } from '../inventario/listar-inventario/listar-inventario.component';
import { ListarMarcaComponent } from '../inventario/listar-marca/listar-marca.component';
import { ListarPersonaComponent } from '../inventario/listar-persona/listar-persona.component';
import { ListarProductoComponent } from '../inventario/listar-producto/listar-producto.component';
import { ListarFacturaComponent } from '../ventas/listar-factura/listar-factura.component';
import { RegistrarFacturaComponent } from '../ventas/registrar-factura/registrar-factura.component';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { ReportesComponent } from './reportes/reportes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


const routes: Routes = [
  {path:'',component:DashboardComponent,children:[
    {path:'', component:InicioComponent},
    {path:'usuario', component:UsuariosComponent},
    {path:'reportes', component:ReportesComponent},
    {path:'categoria', component:ListarCategoriaComponent},
    {path:'regitrarcategoria',component:CrudCategoriaComponent},
    {path:'regitrarcategoria/:id',component:CrudCategoriaComponent},
    {path:'marca',component:ListarMarcaComponent},
    {path:'regitrarmarca',component:CrudMarcaComponent},
    {path:'regitrarmarca/:id',component:CrudMarcaComponent},
    {path:'producto',component:ListarProductoComponent},
    {path:'registrarproducto',component:CrudProductoComponent},
    {path:'registrarproducto/:id',component:CrudProductoComponent},
    {path:'inventario',component:ListarInventarioComponent},
    {path:'registrarinventario',component:CrudInventarioComponent},
    {path:'registrarinventario/:id',component:CrudInventarioComponent},
    {path:'venta',component:ListarFacturaComponent},
    {path:'registrarFactura',component:RegistrarFacturaComponent},
    {path:'listarpersona',component:ListarPersonaComponent},

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

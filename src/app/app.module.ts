import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './components/shared/shared.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';



//componentes
import { LoginComponent } from './components/login/login.component';
import { ListarCategoriaComponent } from './components/inventario/listar-categoria/listar-categoria.component';
import { CrudCategoriaComponent } from './components/inventario/-moduloinventario/crud-categoria/crud-categoria.component';
import { ListarMarcaComponent } from './components/inventario/listar-marca/listar-marca.component';
import { CrudMarcaComponent } from './components/inventario/-moduloinventario/crud-marca/crud-marca.component';
import { ListarProductoComponent } from './components/inventario/listar-producto/listar-producto.component';
import { CrudProductoComponent } from './components/inventario/-moduloinventario/crud-producto/crud-producto.component';
import { ListarInventarioComponent } from './components/inventario/listar-inventario/listar-inventario.component';
import { CrudInventarioComponent } from './components/inventario/-moduloinventario/crud-inventario/crud-inventario.component';
import { ListarFacturaComponent } from './components/ventas/listar-factura/listar-factura.component';
import { RegistrarFacturaComponent } from './components/ventas/registrar-factura/registrar-factura.component';
import { JwtInterceptor } from './components/Security/jwt.interceptor';
import { DialogComponent } from './components/inventario/listar-categoria/dialog/dialog.component';
import { ListarPersonaComponent } from './components/inventario/listar-persona/listar-persona.component';
//import { ServicePersonaComponent } from './components/inventario/listar-persona/service/service-persona.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListarCategoriaComponent,
    CrudCategoriaComponent,
    CrudMarcaComponent,
    ListarMarcaComponent,
    ListarProductoComponent,
    CrudProductoComponent,
    ListarInventarioComponent,
    CrudInventarioComponent,
    ListarFacturaComponent,
    RegistrarFacturaComponent,
    DialogComponent,
    ListarPersonaComponent,
   // ServicePersonaComponent,
   // DialogElementsExampleDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule
    
    //MatSliderModule
   
  ],
  
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

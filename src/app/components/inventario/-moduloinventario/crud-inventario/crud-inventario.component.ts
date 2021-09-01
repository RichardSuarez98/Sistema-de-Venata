import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ServiceInventarioService } from './service/service-inventario.service';

@Component({
  selector: 'app-crud-inventario',
  templateUrl: './crud-inventario.component.html',
  styleUrls: ['./crud-inventario.component.css']
})
export class CrudInventarioComponent implements OnInit {
  listProducto:any[]=['producto'];

  loading = false;
  form!: FormGroup
  constructor(
    private route:Router,
    private invenService:ServiceInventarioService,
    private fb :FormBuilder,
    private _snackBar: MatSnackBar,
  ) { 
    this.form= this.fb.group({
      idProducto:['',Validators.required],      
      //idInventario?:   number;          
      iva:['',Validators.required],
      precioUnitario:['',Validators.required],
      cantidad: ['',Validators.required],
    })
  }

  ngOnInit(): void {
    this.getProdu();
  }


  ingresar() {
    //const usuario = this.form.value.usuario;
    //const password= this.form.value.password;
  
    this.invenService.add(this.form.value).subscribe(inventario =>{
      if(inventario.exito==1){
          (inventario.mensaje)  
           this.form.reset();
              //window.location.reload();
              this._snackBar.open('Registro exitoso de inventario','', { duration: 1500 });
              //this.fakeloading();
             this.route.navigate(['dashboard/inventario']);
      }
      else{
          (inventario.mensaje)
          this._snackBar.open('Error al Registrar inventario','', { duration: 5000 });
      }
      
    }, () =>{
        ("Error de conexion");
        this._snackBar.open('Digite valores numericos o decimales','', { duration: 5000 });
    })
  }

  getProdu(){
    this.invenService.getProducto().subscribe(producto=>{
      this.listProducto=producto;
     // this.datasource=new MatTableDataSource(this.listProducto);
    })
  }


    fakeloading() {
      this.loading = true;
      setTimeout(() => {
        this.route.navigate(['dashboard/categoria']);
        //lo redireccionamos al dashboard
        // this.loading=false; 
      },300);
    }

}

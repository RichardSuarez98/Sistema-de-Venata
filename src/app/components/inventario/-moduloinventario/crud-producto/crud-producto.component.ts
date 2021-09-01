import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductoServiceService } from './service/producto-service.service';

@Component({
  selector: 'app-crud-producto',
  templateUrl: './crud-producto.component.html',
  styleUrls: ['./crud-producto.component.css']
})
export class CrudProductoComponent implements OnInit {
 
  loading=false;
  listCategoria:any[]=['categoria'];
  listMarca:any[]=['marca'];
  id:any
  producto:any
  prod : any 

  form!: FormGroup
  
  constructor(
    private route:Router,
    private producService: ProductoServiceService,
    private fb:FormBuilder,
    private _snackBar: MatSnackBar,
  ) {
    this.form=this.fb.group({
      nombreProducto:['',Validators.required],      
      descripcionProducto:['',Validators.required], 
      idMarca:['',Validators.required],             
      idCategoria:['',Validators.required] 
     // idMarca:['',Validators.required],             
     // idCategoria:['',Validators.required]        
    })
   }


  ngOnInit(): void {
    this.getCategoria();
    this.getMar();
  }

  
   ingresar(){
    //this.route.navigate(['inicio']);
    
     this.producService.add(this.form.value).subscribe(prod=>{
       if(prod.exito==1){
          (prod.mensaje)
          this.form.reset();
          this._snackBar.open('Registro exitoso de producto','', { duration: 1500 });
          this.route.navigate(['dashboard/producto']);
          //window.location.reload();      
         // this.route.navigate(['dashboard/producto']);
       }else{
         (prod.mensaje)
         this._snackBar.open('Error al Registrar producto','', { duration: 5000 });

       }
     },()=>{
       ("Error de conexion");
       this._snackBar.open('Error al Registrar Categoria,complete los campos','', { duration: 5000 });

     })
   }

   getCategoria(){
    this.producService.getCategoria().subscribe(categoria=>{
      this.listCategoria=categoria;
     // this.datasource=new MatTableDataSource(this.listProducto);
    })
  }

  getMar(){
    this.producService.getMarca().subscribe(marca=>{
      this.listMarca=marca;
     // this.datasource=new MatTableDataSource(this.listProducto);
    })
  }


  
  fakeloading() {
    this.loading = true;
    setTimeout(() => {
      this.route.navigate(['dashboard/producto']);
      //lo redireccionamos al dashboard
      // this.loading=false; 
    },300);
  }
   

}

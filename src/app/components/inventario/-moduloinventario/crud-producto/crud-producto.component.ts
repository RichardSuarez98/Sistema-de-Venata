import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoServiceService } from './service/producto-service.service';
import { IProducto } from 'src/app/interfaces/IProducto';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-crud-producto',
  templateUrl: './crud-producto.component.html',
  styleUrls: ['./crud-producto.component.css']
})
export class CrudProductoComponent implements OnInit {
 
  loading=false;
  listCategoria:any[]=[];
  listMarca:any[]=[];


  id:any
  producto:any
  prod : any 

  form!: FormGroup
  
  constructor(
    private route:Router,
    private producService: ProductoServiceService,
    private fb:FormBuilder,
    private _snackBar: MatSnackBar,
    private router: ActivatedRoute,
  ) {
    this.form=this.fb.group({
      nombreProducto:['',Validators.required],      
      descripcionProducto:['',Validators.required], 
      //idMarca:['',Validators.required],             
    //  idCategoria:['',Validators.required] ,
      idMarca:[''],             
      idCategoria:[''],
       idProducto:['']
    })
   }


  ngOnInit(): void {
    this.getCategoria();
    this.getMar();
    this.SetEditar();

  
  }


  SetEditar(){
    this.producto = this.router.snapshot.paramMap.get('id');
  
    if(this.producto!= null)
      {
        this.prod=JSON.parse(this.producto)
        this.form.setValue({
          nombreProducto:this.prod.nombreProducto, 
          descripcionProducto: this.prod.descripcionProducto,
          idMarca:this.prod.nombreMarca,
          idCategoria:this.prod.nombreCategoria, 
          idProducto:this.prod.idProducto      
        });
        this.id=Number(this.prod.idProducto)
      }
  }
  
   ingresar(){
    //this.route.navigate(['inicio']);
    let pro2 : IProducto;
    pro2={
      nombreProducto:this.form.value.nombreProducto, 
      descripcionProducto: this.form.value.descripcionProducto,
      idMarca:this.form.value.idMarca,
      idCategoria:this.form.value.idCategoria    
    }
    if(!this.id){
      this.producService.add(pro2).subscribe(prod=>{
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
        this._snackBar.open('Error al Registrar producto,complete los campos','', { duration: 5000 });
      })
    }else if(this.id>0){
      this.producService.EditarProducto(this.form.value).subscribe(prod=>{
        if(prod.exito==1){
           (prod.mensaje)
           this.form.reset();
           this._snackBar.open('Actualizacion exitoso de producto','', { duration: 1500 });
           this.route.navigate(['dashboard/producto']);
           //window.location.reload();      
          // this.route.navigate(['dashboard/producto']);
        }else{
          (prod.mensaje)
          this._snackBar.open('Error al Registrar producto','', { duration: 5000 });
 
        }
      },()=>{
        ("Error de conexion");
        this._snackBar.open('Error al Registrar producto,complete los campos','', { duration: 5000 });
      })
    }

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

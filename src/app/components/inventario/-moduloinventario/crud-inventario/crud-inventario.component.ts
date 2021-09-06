import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IInventario } from 'src/app/interfaces/IInventario';
import { ServiceInventarioService } from './service/service-inventario.service';

@Component({
  selector: 'app-crud-inventario',
  templateUrl: './crud-inventario.component.html',
  styleUrls: ['./crud-inventario.component.css']
})
export class CrudInventarioComponent implements OnInit {
  listProducto:any[]=[''];

  loading = false;
  id:any
  inventario:any
  inv : any 


  form!: FormGroup
  constructor(
    private route:Router,
    private invenService:ServiceInventarioService,
    private fb :FormBuilder,
    private _snackBar: MatSnackBar,
    private router:ActivatedRoute,
  ) { 
    this.form= this.fb.group({
      idProducto:['',Validators.required],      
      //idInventario?:   number;          
      iva:['',Validators.required],
      precioUnitario:['',Validators.required],
      cantidad: ['',Validators.required],
      idInventario:['']
    })
  }

  ngOnInit(): void {
    this.getProdu();
    this.setInventario();

  }

  setInventario(){
    this.inventario = this.router.snapshot.paramMap.get('id');
  
    if(this.inventario!= null)
      {
        this.inv=JSON.parse(this.inventario)
        console.log(this.inv)
        this.form.setValue({
          idProducto:this.inv.nombreProducto, 
          iva: this.inv.iva,
          precioUnitario:this.inv.precioUnitario,
          cantidad:this.inv.cantidad,
          idInventario:this.inv.idInventario,
        });
        this.id=Number(this.inv.idInventario)
        
       /// editar();
      }
  }

  ingresar() {
    //const usuario = this.form.value.usuario;
    //const password= this.form.value.password;
    if(!this.id){
      let inv2 : IInventario;
      inv2={
        idProducto:this.form.value.idProducto,               
      iva:this.form.value.iva,
      precioUnitario:this.form.value.precioUnitario,
      cantidad:this.form.value.cantidad,
      }
    this.invenService.add(inv2).subscribe(inventario =>{
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
        }else if(this.id>0){
          this.invenService.editarInventario(this.form.value).subscribe(inventario =>{
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router,ActivatedRoute } from '@angular/router';
import { ICategoria } from 'src/app/interfaces/ICategoria';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-crud-categoria',
  templateUrl: './crud-categoria.component.html',
  styleUrls: ['./crud-categoria.component.css']
  })
  export class CrudCategoriaComponent implements OnInit {
  loading = false;
  id:any
  categoria:any
  cate : any 

  form!: FormGroup
  constructor(
    private route:Router,
    private categoriaService:CategoriaService,
    private fb :FormBuilder,
    private _snackBar: MatSnackBar,
    private router:ActivatedRoute
  
    ) {
    this.form= this.fb.group({
      nombreCategoria:['',Validators.required],
      descripcionCategoria:['',Validators.required],
      idCategoria:['']
    })
   }

    ngOnInit(): void {
     this.pepito()
     
      //this.form.setValue();
    }

    /*actualizarPrueba(cat:ICategoria){ 
      cat.idCategoria=this.id;
      this.categoriaService.actualizar(cat).subscribe()
    }*/

pepito(){
  this.categoria = this.router.snapshot.paramMap.get('id');

  if(this.categoria!= null)
    {
      this.cate=JSON.parse(this.categoria)
      console.log(this.cate)
      this.form.setValue({
        nombreCategoria:this.cate.nombreCategoria, 
        descripcionCategoria: this.cate.descripcionCategoria,
        idCategoria:this.cate.idCategoria
      });
      this.id=Number(this.cate.idCategoria)
      
     /// editar();
    }
}


ingresar() {
     //catte : ICategoria
  if(!this.id){
    let ca2 : ICategoria;
    ca2={
      nombreCategoria:this.form.value.nombreCategoria,
      descripcionCategoria:this.form.value.descripcionCategoria,
     //idCategoria:this.form.value.idCategoria
    } 
    this.categoriaService.add(ca2).subscribe(categoria =>{
      if(categoria.exito==1){
          (categoria.mensaje)  
           this.form.reset();
              //window.location.reload();
              this._snackBar.open('Categoria registrada con exito','', { duration: 1500 });
              this.fakeloading();
             // this.route.navigate(['dashboard/categoria']);
      }
      else{
          (categoria.mensaje)
          this._snackBar.open('Error al Registrar Categoria','', { duration: 5000 });
      }
      
    }, () =>{
        ("Error de conexion");
    })

  }
  else if(this.id>0){
    this.categoriaService.EditarCategoria(this.form.value).subscribe(categoria =>{
      if(categoria.exito==1){
          (categoria.mensaje)  
           this.form.reset();
              //window.location.reload();
              this._snackBar.open('La Categoria ha sido actualizado con exito','', { duration: 1500 });
              this.fakeloading();
             // this.route.navigate(['dashboard/categoria']);
      }
      else{
          (categoria.mensaje)
          this._snackBar.open('Error al Actualizar Categoria','', { duration: 5000 });
      }
      
    }, () =>{
        ("Error de conexion");
    })
  }
  
    
   // this.loading=true;
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

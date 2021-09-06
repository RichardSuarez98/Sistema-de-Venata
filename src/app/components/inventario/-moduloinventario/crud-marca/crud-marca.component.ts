import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IMarca } from 'src/app/interfaces/IMarca';
import { MarcaServiceService } from './Services/marca-service.service';

@Component({
  selector: 'app-crud-marca',
  templateUrl: './crud-marca.component.html',
  styleUrls: ['./crud-marca.component.css']
})
export class CrudMarcaComponent implements OnInit {
  loading = false;
  id:any
  marca:any
  mar : any 

  form!: FormGroup
  constructor(
    private route:Router,
    private router: ActivatedRoute,
    private marcaServcice: MarcaServiceService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
  ) {
    this.form=this.fb.group({
      nombreMarca:['',Validators.required],
      descripcionMarca:['',Validators.required],
      idMarca:['']
    })
   }

  ngOnInit(): void {
    this.SetEditar();
  }


  SetEditar(){
    this.marca = this.router.snapshot.paramMap.get('id');
  
    if(this.marca!= null)
      {
        this.mar=JSON.parse(this.marca)
        this.form.setValue({
          nombreMarca:this.mar.nombreMarca, 
          descripcionMarca: this.mar.descripcionMarca,
          idMarca:this.mar.idMarca
        });
        this.id=Number(this.mar.idMarca)
        
       /// editar();
      }
  }


  ingresar(){

    if(!this.id){
      let mar2 : IMarca;
      mar2={
        nombreMarca: this.form.value.nombreMarca,
        descripcionMarca: this.form.value.descripcionMarca
      }
     this.marcaServcice.add(mar2).subscribe(marca =>{
      if(marca.exito==1){
        (marca.mensaje)
        this._snackBar.open('Registro exitoso de marca','', { duration: 1500 });
              this.fakeloading();
       // window.location.reload();      
      }else{
        (marca.mensaje)
        this.loading = true;
        setTimeout(() => {
          this.route.navigate(['dashboard/marca'])
        },7000);
      }
    },()=>{
      ("Error de conexion");
    })
  }else if(this.id>0){
    this.marcaServcice.EditarMarca(this.form.value).subscribe(marca =>{
      if(marca.exito==1){
        (marca.mensaje)
        this._snackBar.open('Actualización exitoso de marca','', { duration: 1500 });
              this.fakeloading();
       // window.location.reload();      
      }else{
        (marca.mensaje)
        this.loading = true;
        setTimeout(() => {
          this.route.navigate(['dashboard/marca'])
        },7000);
      }
    },()=>{
      ("Error de conexion");
    })
  }



  }



  fakeloading() {
    this.loading = true;
    setTimeout(() => {
      this.route.navigate(['dashboard/marca'])
    },300);
  }






}

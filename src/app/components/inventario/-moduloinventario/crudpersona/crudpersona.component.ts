import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IPersona } from 'src/app/interfaces/IPersona';
import { ServicePersonaService } from '../../listar-persona/service-persona.service';

@Component({
  selector: 'app-crudpersona',
  templateUrl: './crudpersona.component.html',
  styleUrls: ['./crudpersona.component.css']
})
export class CrudpersonaComponent implements OnInit {
  loading=false;
  //listTipoPersona:any[]=[];

  id:any
  persona:any
  per : any 

  form!: FormGroup
  constructor(
    private route:Router,
    private persoService: ServicePersonaService,
    private fb:FormBuilder,
    private _snackBar: MatSnackBar,
    private router: ActivatedRoute,
  ) {
    this.form=this.fb.group({
      nombrePersona:['',Validators.required],      
      cedula:['',Validators.required], 
       edad:[''],             
       idTipoPersona:[''],
       idPersona:['']
       //idPersona
    })
   }

  ngOnInit(): void {
    this.SetEditar();
    //this.getCategoria();
    
  }
  /*getCategoria(){
    this.persoService.get().subscribe(persona=>{
      console.log(persona)
      this.listTipoPersona=persona;
     // this.datasource=new MatTableDataSource(this.listProducto);
    })
  }*/

  SetEditar(){
    this.persona = this.router.snapshot.paramMap.get('id');
  
    if(this.persona!= null)
      {
        this.per=JSON.parse(this.persona)
        console.log(this.per)
        this.form.setValue({
          nombrePersona:this.per.nombrePersona,
          cedula:this.per.cedula,
          edad:this.per.edad,
          idTipoPersona:this.per.nombreTipoPersona,
          idPersona:this.per.idPersona
        });
        this.id=Number(this.per.idPersona)
        
      }
      
  }

ingresar(){

  if(!this.id){
    let pe2 : IPersona;
    pe2={
      nombrePersona:this.form.value.nombrePersona,
      cedula:this.form.value.cedula,
      edad:this.form.value.edad,
      idTipoPersona:this.form.value.idTipoPersona
    }
  this.persoService.add(pe2).subscribe(prod=>{
    if(prod.exito==1){
       (prod.mensaje)
       this.form.reset();
       this._snackBar.open('Registro exitoso de producto','', { duration: 1500 });
       this.route.navigate(['dashboard/listarpersona']);
    }else{
      (prod.mensaje)
      this._snackBar.open('Error al Registrar persona','', { duration: 5000 });

    }
  },()=>{
    ("Error de conexion");
    this._snackBar.open('Error al Registrar persona,complete los campos','', { duration: 5000 });
  })
      }  else if(this.id>0){
        this.persoService.editarPersona(this.form.value).subscribe(persona =>{
          if(persona.exito==1){
              (persona.mensaje)  
               this.form.reset();
                  this._snackBar.open('La Persona ha sido actualizado con exito','', { duration: 1500 });
                  this.route.navigate(['dashboard/listarpersona']);
          }
          else{
              (persona.mensaje)
              this._snackBar.open('Error al Actualizar Persona','', { duration: 5000 });
          }
          
        }, () =>{
            ("Error de conexion");
        })
      }
      
    
    
    
    
    }







}

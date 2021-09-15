import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { UsuarioServiceService } from '../usuario-service.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {


  listPersona:any []=['persona'];

  id: any;
  usuario:any;
  usu : any;

  form: FormGroup

  constructor(private usuariService:UsuarioServiceService,
              private fb :FormBuilder,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog,
              private router: ActivatedRoute,
              private route:Router,

              ) { 

                this.form= this.fb.group({
                    nombreUsuario:['',Validators.required],
                    password:['',Validators.required],
                    idPersona:['',Validators.required],
                    idUsuario:[''],

                  })
              }

  ngOnInit(): void {
    this.getPersona();
    this.SetEditar();
  }

  SetEditar(){
    this.form.value.nombreUsuario.disable
    this.usuario = this.router.snapshot.paramMap.get('id');
  
    if(this.usuario!= null)
      {
        this.usu=JSON.parse(this.usuario)
        console.log(this.usu)
        this.form.setValue({
          nombreUsuario:this.usu.nombreUsuario,
          password:this.usu.password,
          idPersona:this.usu.nombrePersona,
          idUsuario:this.usu.idUsuario
        });
        this.id=Number(this.usu.idUsuario)
        
      }
      
  }


  ingresar(){

    if(!this.id){
      let usu2 : IUsuario;
      usu2={
        nombreUsuario:this.form.value.nombreUsuario,
        password:this.form.value.password,
        idPersona:this.form.value.idPersona,
      }
    this.usuariService.addUsuario(usu2).subscribe(usu=>{
      if(usu.exito==1){
         (usu.mensaje)
         this.form.reset();
         this._snackBar.open('Registro exitoso de Usuario','', { duration: 1500 });
         this.route.navigate(['dashboard/usuario']);
      }else{
        (usu.mensaje)
        this._snackBar.open('Error al Registrar Usuario','', { duration: 5000 });
  
      }
    },()=>{
      ("Error de conexion");
      this._snackBar.open('Error al Registrar Usuario,complete los campos','', { duration: 5000 });
    })
        }  else if(this.id>0){
          this.usuariService.updateUsuario(this.form.value).subscribe(usua =>{
            if(usua.exito==1){
                (usua.mensaje)  
                 this.form.reset();
                    this._snackBar.open('El Usuario ha sido actualizado con exito','', { duration: 1500 });
                    this.route.navigate(['dashboard/usuario']);
            }
            else{
                (usua.mensaje)
                this._snackBar.open('Error al Actualizar Usuario','', { duration: 5000 });
            }
            
          }, () =>{
              ("Error de conexion");
          })
        }
        
      
      
      
      
      }


  getPersona(){
    this.usuariService.getPer().subscribe(per =>{
     
      this.listPersona=per;

    })
  }

}

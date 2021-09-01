import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { DialogComponent } from '../../inventario/listar-categoria/dialog/dialog.component';
import { UsuarioServiceService } from './usuario-service.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  //loading = false;
  hide = true;
  id: number | undefined;


  displayedColumns: string[] = ['id', 'nombre','password','idPersona','accion'];
  datasource:any
  btnAgregar:string ="0";
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  listUsuario:any []=[];
  listPersona:any []=['persona'];

  form: FormGroup
  constructor(private usuariService:UsuarioServiceService,
              private fb :FormBuilder,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog,
    ) {
      this.form= this.fb.group({
      //  idUsuario:[''],
        nombreUsuario:['',Validators.required],
        password:['',Validators.required],
        idPersona:['',Validators.required]
      })
     }

  ngOnInit(): void {
    this.get();
    this.getPersona();
  }

  ingresar() {
    //const usuario = this.form.value.usuario;
    //const password= this.form.value.password;
    if(this.id== undefined){
      this.usuariService.addUsuario(this.form.value).subscribe(usuario =>{
        if(usuario.exito==1){
            (usuario.mensaje)  
            this.get();
             this.form.reset();
                //window.location.reload();
                this._snackBar.open('Registro exitoso de Usuario','', { duration: 1500 });           
               // this.route.navigate(['dashboard/categoria']);
        }
        else{
            (usuario.mensaje)
            this._snackBar.open('Error al Registrar Usuario','', { duration: 5000 });
        }
        
     /* }, () =>{
          ("Error de conexion");
          this._snackBar.open('Error al Registrar Usuario','', { duration: 5000 });*/
      })
    }else{
       ///METODO ACTUALIZAR
     //  this.actualizarPrueba();
    
    }
    
    
   // this.loading=true;
  }

  actualizarPrueba(usuar:IUsuario){
    
    usuar.idUsuario=this.id;
    this.usuariService.updateUsuario(usuar).subscribe(data=>{
      this.form.reset();
      //this.accion='agregar';
      this.id=undefined;
      this._snackBar.open('Exito al Actualizar Usuario','', { duration: 5000 });
      this.get();
    },error=>{
      (error);
    })
  }



  getPersona(){
    this.usuariService.getPer().subscribe(per =>{
     
      this.listPersona=per;

    })
  }

  get(){
    this.usuariService.getUsuario().subscribe(usu =>{
     
      this.listUsuario=usu;
      this.datasource=new MatTableDataSource(this.listUsuario);
      this.datasource.paginator=this.paginator;

    })
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  /*eliminar(usu:IUsuario){
    this.usuariService.delete(usu).subscribe(usu=>{
      if(usu.exito===1)
      {
       
        this.get();
      }else{
          (usu.mensaje);

      }
    })  
  }*/

  resetear(){
    this.form.reset();
  }


 editar(usuario: IUsuario){
    //(usuario);
    this.id= usuario.idPersona;

    this.form.patchValue({
      nombreUsuario:usuario.nombreUsuario,
        password: usuario.password,
        idPersona:usuario.idPersona
    })
 }





 
openDialog(usu:IUsuario) {//E L I M I N A R
  const dialogo=this.dialog.open(DialogComponent,{
    width:'300px',
  })
  dialogo.afterClosed().subscribe(s=>{
    if(s){
      this.usuariService.delete(usu).subscribe(cat=>{
        if(cat.exito===1)
        {
          this.get();
        }else{
            (cat.mensaje);
  
        } })
    }
  })
   }

   




  
}

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



  displayedColumns: string[] = ['id', 'nombre','password','idPersona','accion'];
  datasource:any
  btnAgregar:string ="0";
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  listUsuario:any []=[];

  constructor(private usuariService:UsuarioServiceService,
              private fb :FormBuilder,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog,
    ) {
  
     }

  ngOnInit(): void {
    this.get();
  
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

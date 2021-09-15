import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ICategoria } from 'src/app/interfaces/ICategoria';
import { IPersona } from 'src/app/interfaces/IPersona';
import { DialogComponent } from '../listar-categoria/dialog/dialog.component';
import { CategoriaService } from '../services/categoria.service';
import { ServicePersonaService } from './service-persona.service';

@Component({
  selector: 'app-listar-persona',
  templateUrl: './listar-persona.component.html',
  styleUrls: ['./listar-persona.component.css']
})
export class ListarPersonaComponent implements OnInit {
  displayedColumns: string[] = ['idPersona', 'nombrePersona','cedula','edad','idTipoPersona','accion'];
  datasource:any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  listPersona:any []=[];

  constructor(private personaSer:ServicePersonaService,//poner el servidor de persona
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.get();
  }


  get(){
    this.personaSer.get().subscribe(persona =>{
      this.listPersona=persona;
      this.datasource=new MatTableDataSource(this.listPersona);
      this.datasource.paginator=this.paginator;

    })
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
  

openDialog(per:IPersona) {
  const dialogo=this.dialog.open(DialogComponent,{
    width:'300px',
  })
  dialogo.afterClosed().subscribe(s=>{
    if(s){
      this.personaSer.delete(per).subscribe(per=>{
        console.log(per)
        if(per.exito===1)
        {
          this.get();
          this._snackBar.open('La Persona ha sido eliminado con exito','', { duration: 3500 });
        }else{
            (per.mensaje);
  
        } })
    }
  })
   }





}

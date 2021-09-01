import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { IMarca } from 'src/app/interfaces/IMarca';
import { MarcaServiceService } from '../-moduloinventario/crud-marca/Services/marca-service.service';
import { DialogComponent } from '../listar-categoria/dialog/dialog.component';
/*
const httOption={
  headers: new  HttpHeaders({
    'Context-Type':'application/json'
  })
}
*/
@Component({
  selector: 'app-listar-marca',
  templateUrl: './listar-marca.component.html',
  styleUrls: ['./listar-marca.component.css']
})
export class ListarMarcaComponent implements OnInit {
displayedColumns: string[]=['id','nombre','descripcion','accion'];
datasource:any
btnAgregar:string="0";


@ViewChild(MatPaginator) paginator!: MatPaginator;
  listMarca:any[]=[];

  constructor(private marcaSer: MarcaServiceService,
                public dialog: MatDialog,
                private _snackBar: MatSnackBar,
                ) { }

  ngOnInit(): void {
    this.getMarca();
  }

  getMarca(){
    this.marcaSer.get().subscribe(marca =>{
      this.listMarca=marca;
      this.datasource=new MatTableDataSource(this.listMarca);
      this.datasource.paginator=this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }


  agregar(){
    this.btnAgregar="1";
  }



  /*eliminar(mar:IMarca){
    this.marcaSer.delete(mar).subscribe(mar=>{
      if(mar.exito===1){
        this.getMarca();
      }else{
        (mar.mensaje);
      }
    })
  }*/


  openDialog(mar:IMarca) {
    const dialogo=this.dialog.open(DialogComponent,{
      width:'300px',
    })
    dialogo.afterClosed().subscribe(s=>{
      if(s){
        this.marcaSer.delete(mar).subscribe(cat=>{
          if(cat.exito===1)
          {
            this.getMarca();
            this._snackBar.open('La marca ha sido eliminado con exito','', { duration: 3500 });
          }else if(cat.exito===3){
            this._snackBar.open(cat.mensaje+''+' entidades','', { duration: 3500 });
          }
          else{
              (cat.mensaje);
    
          } })
      }
    })
     }


}

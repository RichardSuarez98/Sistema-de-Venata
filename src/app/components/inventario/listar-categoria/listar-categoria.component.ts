import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ICategoria } from 'src/app/interfaces/ICategoria';
import { CategoriaService } from '../services/categoria.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.component.html',
  styleUrls: ['./listar-categoria.component.css']
})
export class ListarCategoriaComponent implements OnInit {
  //[x: string]: any;
  loading = false;

  displayedColumns: string[] = ['id', 'nombre','descripcion','accion'];
  datasource:any

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  listCategoria:any []=[];
 /// dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  constructor(private categoriaSer:CategoriaService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              ) { }


  ngOnInit(): void {
    this.get();

  }

  get(){
    this.categoriaSer.get().subscribe(categoria =>{
     
      this.listCategoria=categoria;
      this.datasource=new MatTableDataSource(this.listCategoria);
      this.datasource.paginator=this.paginator;

    })
  }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.datasource.filter = filterValue.trim().toLowerCase();
    }
  
  /*eliminar sin dialog de angular 
  eliminar(cate:ICategoria){
    if(confirm('Seguro que desea eliminar'))
    this.categoriaSer.delete(cate).subscribe(cat=>{
      if(cat.exito===1)
      {
        this.get();
      }else{
          (cat.mensaje);

      } })  }*/

  mostrar(){
    this.loading=true;
    //this.get();
  }
/*
  cerr(){
    this.loading=false;
    this.get();
  }
*/

openDialog(cate:ICategoria) {
  const dialogo=this.dialog.open(DialogComponent,{
    width:'300px',
  })
  dialogo.afterClosed().subscribe(s=>{
    if(s){
      this.categoriaSer.delete(cate).subscribe(cat=>{
        if(cat.exito===1)
        {
          this.get();   
          this._snackBar.open('La categoria ha sido eliminado con exito','', { duration: 3500 });
        }else if(cat.exito===3){
          this._snackBar.open(cat.mensaje+''+' entidades','', { duration: 3500 });
           // console.log(cat.mensaje)
        }
        else{
            (cat.mensaje);
  
        } })
    }
  })
   }



   

}



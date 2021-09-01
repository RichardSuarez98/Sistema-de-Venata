import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ICategoria } from 'src/app/interfaces/ICategoria';
import { IInventario } from 'src/app/interfaces/IInventario';
import { ServiceInventarioService } from '../-moduloinventario/crud-inventario/service/service-inventario.service';
import { DialogComponent } from '../listar-categoria/dialog/dialog.component';

@Component({
  selector: 'app-listar-inventario',
  templateUrl: './listar-inventario.component.html',
  styleUrls: ['./listar-inventario.component.css']
})
export class ListarInventarioComponent implements OnInit {
displayedColumns: string[]=['idInventario','nombreProducto','iva','precioUnitario','cantidad','accion'];
datasource:any
btnAgregar:string ="0";
@ViewChild(MatPaginator) paginator!: MatPaginator;

lisInventario:any []=[];

  constructor(private inventarioSer:ServiceInventarioService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.get();
  }

  get(){
    this.inventarioSer.get().subscribe(inventario =>{
     
      this.lisInventario=inventario;
      this.datasource=new MatTableDataSource(this.lisInventario);
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

/* eliminar sin dialog de angular material
eliminar(inv:IInventario){
  this.inventarioSer.delete(inv).subscribe(inv=>{
    if(inv.exito===1)
    {
      this.get();
    }else{
        (inv.mensaje);

    }

  })
}*/



openDialog(inv:IInventario) {
  const dialogo=this.dialog.open(DialogComponent,{
    width:'300px',
  })
  dialogo.afterClosed().subscribe(s=>{
    if(s){
      this.inventarioSer.delete(inv).subscribe(cat=>{
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


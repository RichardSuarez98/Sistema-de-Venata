import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IProducto } from 'src/app/interfaces/IProducto';
import { ProductoServiceService } from '../-moduloinventario/crud-producto/service/producto-service.service';
import { DialogComponent } from '../listar-categoria/dialog/dialog.component';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductoComponent implements OnInit {
displayedColumns: string[]=['idProducto','nombreProducto','descripcionProducto','nombreMarca','nombreCategoria','accion'];
datasource:any
btnAgregar:string="0";

@ViewChild(MatPaginator) paginator!: MatPaginator;
listProducto:any[]=[];

  constructor(private producSer: ProductoServiceService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducto();
  }

  getProducto(){
    this.producSer.get().subscribe(producto=>{
      this.listProducto=producto;
      this.datasource=new MatTableDataSource(this.listProducto);
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

  /*eliminar sin el showdialog de angular material
  eliminar(prod:IProducto){
    this.producSer.delete(prod).subscribe(prod=>{
      if(prod.exito===1){
        this.getProducto();
      }else{
        (prod.mensaje);
      }
    })
  }*/







  
openDialog(prod:IProducto) {
  const dialogo=this.dialog.open(DialogComponent,{
    width:'300px',
  })
  dialogo.afterClosed().subscribe(s=>{
    if(s){
      this.producSer.delete(prod).subscribe(cat=>{
        if(cat.exito===1)
        {
          this.getProducto();
        }else{
            (cat.mensaje);
  
        } })
    }
  })
   }




}

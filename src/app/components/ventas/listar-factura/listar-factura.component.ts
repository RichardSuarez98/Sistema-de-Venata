import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { IDetalle } from 'src/app/interfaces/IDetalle';
import { IFactura } from 'src/app/interfaces/IFactura';
import { DialogVComponent } from '../dialog-v/dialog-v.component';
import { VentaServiceService } from '../venta-service.service';

@Component({
  selector: 'app-listar-factura',
  templateUrl: './listar-factura.component.html',
  styleUrls: ['./listar-factura.component.css']
})
export class ListarFacturaComponent implements OnInit {

displayedColumns: string[] = ['idFactura', 'cajero','cliente','cedula','fechaEmision','totalFactura','accion'];
datasource:any

@ViewChild(MatPaginator) paginator!: MatPaginator;

listFactura:any []=[];/*
var FechadeEmision;
const NumerodeFactura;
var Cajero;
var Cliente;
var Cedula;
const TotalFactura;*/



  constructor(private ventService:VentaServiceService,
              public dialog : MatDialog) { }

  ngOnInit(): void {
    this.get();
  }

  get(){
    this.ventService.get().subscribe(venta =>{
     
      this.listFactura=venta;
      this.datasource=new MatTableDataSource(this.listFactura);
     // this.paginator=this.idFactura
      this.datasource.paginator=this.paginator;
      console.log(venta);

    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
  
  agregar(){
   
  }
  

  openDialog(fac:IFactura) {
 
    const dialogo=this.dialog.open(DialogVComponent,{
      width:'700px',
     data:fac
    })
    dialogo.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     // this.animal = result;
    });
  
     }
  





}

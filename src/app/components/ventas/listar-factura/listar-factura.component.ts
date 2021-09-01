import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VentaServiceService } from '../venta-service.service';

@Component({
  selector: 'app-listar-factura',
  templateUrl: './listar-factura.component.html',
  styleUrls: ['./listar-factura.component.css']
})
export class ListarFacturaComponent implements OnInit {

displayedColumns: string[] = ['idFactura', 'idUsuario','idPersona','fechaEmision','totalFactura','totalProducto','accion'];
datasource:any

@ViewChild(MatPaginator) paginator!: MatPaginator;

listFactura:any []=[];
  constructor(private ventService:VentaServiceService) { }

  ngOnInit(): void {
    this.get();
  }

  get(){
    this.ventService.get().subscribe(venta =>{
     
      this.listFactura=venta;
      this.datasource=new MatTableDataSource(this.listFactura);
      this.datasource.paginator=this.paginator;

    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
  
  agregar(){
   
  }
  






}

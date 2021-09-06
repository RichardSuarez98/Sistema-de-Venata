import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IDetalle } from 'src/app/interfaces/IDetalle';
import { IFactura } from 'src/app/interfaces/IFactura';
import { VentaServiceService } from '../venta-service.service';

@Component({
  selector: 'app-dialog-v',
  templateUrl: './dialog-v.component.html',
  styleUrls: ['./dialog-v.component.css']
})
export class DialogVComponent implements OnInit {
  displayedColumns: string[] = [/*'idDetalle', 'idFactura',*/'nombreProducto','cantidad','precioUnitario','subtotal','total'];
  datasource:any


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  listFactura:any []=[];
  detalleFactura : IDetalle []=[];
  NumerodeFactura!: number;
  Cajero!: string;
  FechadeEmision!: Date;
  Cliente!: string;
  Cedula!: string;
  TotalFactura!: number;

  constructor(  
              private ventSer: VentaServiceService,
              @Inject(MAT_DIALOG_DATA) public fac:IFactura

              ) { }

  ngOnInit(): void {
    this.getDialog();
    console.log(this.fac);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }


  getDialog(){  
    this.NumerodeFactura=this.fac.idFactura;
    this.Cajero=this.fac.cajero;
    this.FechadeEmision=this.fac.fechaEmision;
    this.Cliente= this.fac.cliente;
    this.Cedula= this.fac.cedula;
    this.TotalFactura=this.fac.totalFactura;

   this.ventSer.getDetalle(this.fac.idFactura).subscribe(s =>{
      if(s.exito===1){
        this.detalleFactura=s.data;
        this.datasource=new MatTableDataSource(this.detalleFactura);
        this.datasource.paginator=this.paginator;  
      }
      
      
    })

  }
  




}

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IDetalle } from 'src/app/interfaces/IDetalle';
import { IFactura } from 'src/app/interfaces/IFactura';
import { IFacturar } from 'src/app/interfaces/IFacturar';
import { ListarFacturaComponent } from '../listar-factura/listar-factura.component';
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

  Estado!: string;
AnularBoton: Boolean = true;
  factu!:IFacturar;

  constructor(  
              private ventSer: VentaServiceService,
              @Inject(MAT_DIALOG_DATA) public fac:IFactura,
              private dialog: MatDialog
              ) { }
              private ada!: ListarFacturaComponent;

  ngOnInit(): void {
    this.getDialog();
    /*if(this.Estado='Anulado')
    this.AnularBoton=false;*/
    //console.log(this.fac);
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
    if(this.fac.estadoFacturacion==true){
      this.Estado="Facturado"
    }else
    {
      this.Estado="Anulado"
      this.AnularBoton=false;
    }

   this.ventSer.getDetalle(this.fac.idFactura).subscribe(s =>{
      if(s.exito===1){
        this.detalleFactura=s.data;
        this.datasource=new MatTableDataSource(this.detalleFactura);
        this.datasource.paginator=this.paginator;  
      }
      
      
    })

  }
  
  devolverFactura(){
    this.factu= {idFactura:this.fac.idFactura, detalles: this.detalleFactura}
    console.log(this.factu)
    this.ventSer.devolverFactura(this.factu).subscribe(v =>{
      //this.ada.get();
      this.dialog.closeAll();
     

    })
    //this.ada.get();

    //this.getDialog();

  }




}

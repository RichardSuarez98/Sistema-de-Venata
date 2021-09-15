import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IDetalle } from 'src/app/interfaces/IDetalle';
import { Detalle, IFacturar } from 'src/app/interfaces/IFacturar';
import { IPersona } from 'src/app/interfaces/IPersona';
import { ProductoServiceService } from '../../inventario/-moduloinventario/crud-producto/service/producto-service.service';
import { VentaServiceService } from '../venta-service.service';
import { FormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-registrar-factura',
  templateUrl: './registrar-factura.component.html',
  styleUrls: ['./registrar-factura.component.css'],
})
export class RegistrarFacturaComponent implements OnInit {
  displayedColumns: string[] = ['idProducto','nombreProducto','cantidad','precioUnitario','total'];
  datasource:any
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  Cliente!: string;
  Cedula!: string;
  nomusu:any
  idUsuario!:number
  idPersona!:number
  factu!:IFacturar

  cantidadnum!:number

   deta:Detalle[]=[]
  
  total=0;
 
  per:IPersona[]=[]
  form!: FormGroup
  formDetalle!:FormGroup
  //formConcepto!:FormGroup

   detall : Detalle={
    idInventario:0,
    idProducto:0,
    nombreProducto:'',
    cantidad:0,
    precioUnitario:0
  //detal.idProducto=pro.data.idProducto;
  
     }
 

  constructor(public dialog: MatDialog,
              private ventSer:VentaServiceService,
              private fb:FormBuilder,
              private _snackBar: MatSnackBar,
            //  private fbDE:FormBuilder,
            //  private fbConcepto:FormBuilder,

            /*  @Inject(MAT_DIALOG_DATA) public fac:IFactura*/) {
              this.form=this.fb.group({          
                cedula:['',[Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],             
              })
           
              this.formDetalle= this.fb.group({
                idInventario:['',Validators.required],
                idProducto:['',Validators.required],
                nombreProducto :['',Validators.required],
                precioUnitario :['',Validators.required],
                cantidad:['',Validators.min(1)],
            
              });
         
             }

  ngOnInit(): void {
    this.nomusu=JSON.parse(localStorage.getItem('usuario')!);
    this.idUsuario=this.nomusu.idUsuario;
  //  this.datasource.paginator=this.paginator;


  }

      buscar(){ 
      this.ventSer.getPersona(this.form.value.cedula).subscribe(p=>{
          if(p.exito===1){
          // this.per=p.data
          // this.Cedula=p.data.cedula;
          //  this.Cliente=p.data.nombrePersona;
          // this.per=p.data[0]
            //this.Cedula=p.data[0].cedula;
            //this.Cliente=p.data[0].nombrePersona;
                //     console.log(this.per);
            this.Cedula=p.data.cedula;
            this.Cliente=p.data.nombrePersona;
            this.idPersona=p.data.idPersona     
          }else{
            this.Cedula="no existente";
            this.Cliente="no existente";
          }
        })    
    }

      buscarProducto(){
        this.ventSer.getBuscarProducto(this.formDetalle.value.idProducto).subscribe(pro=>{
          console.log(pro)
          if(pro.exito===1){
            this.detall.idInventario=pro.data.idInventario;
            
            this.detall.idProducto=pro.data.idProducto;
            this.detall.nombreProducto=pro.data.nombreProducto;
            this.detall.precioUnitario=pro.data.precioUnitario;
            //this.detall.cantidad=pro.data.cantidad;
            this.detall.cantidad=1;
            console.log(pro.data)
            this.cantidadnum=pro.data.cantidad
            console.log(this.cantidadnum)

           // this.codigoProducto=pro.data.idProducto;
            //this.nombreproduct=pro.data.nombreProducto;
            //this.precio=pro.data.precioUnitario;
            //this.cantidado=pro.data.cantidad;
            
           // this.formDetalle.value.cantidad=this.cantidado;
  
            }else{
               this.detall.nombreProducto="no existe producto"          
            }
            
        })
        //this.formDetalle.reset();
      }

      

    remove(id:number){
        this.deta.splice(id,1);
    }

  ngDoCheck() {
      //this.totalp = 0;
      for (let pp of this.deta){
        pp.total=pp.cantidad!*pp.precioUnitario!;
        this.total=pp.total;
        this.total=this.total +pp.total
      } 

    } 



    addConcepto(){
    if(this.formDetalle.value.idProducto<0){
      this._snackBar.open('LLene todos los campos de producto','', { duration: 5000 });

    } 
    else{
      if(this.formDetalle.value.cantidad > this.cantidadnum)
      this._snackBar.open('cantidad mayor al de la inventario','', { duration: 5000 });
      else{
        this.deta.push(this.formDetalle.value)
        this.datasource=this.deta
      }
       
    }     

      // this.deta.push(this.formDetalle.value)
      // this.datasource=this.deta

    }


    facturar(){
    this.factu= {idUsuario:this.idUsuario,idPersona:this.idPersona, detalles:this.deta}
     
     if(this.factu.idPersona! <0 || this.factu.detalles!.length<1){
      this._snackBar.open('LLene todos los campos de la Factura','', { duration: 5000 });

     }else{
      this.ventSer.add(this.factu).subscribe(x=>{
        this._snackBar.open('Su Factura se ha generado con Exito','', { duration: 5000 });
      })
      
     }
     
    }





}




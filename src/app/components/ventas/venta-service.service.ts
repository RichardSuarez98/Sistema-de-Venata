import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFactura } from 'src/app/interfaces/IFactura';
import { IFacturar } from 'src/app/interfaces/IFacturar';
import { IResponse } from 'src/app/interfaces/IResponse';

@Injectable({
  providedIn: 'root'
})
export class VentaServiceService {
  private url='https://localhost:44359/api/Factura';
  private urlDetalle='https://localhost:44359/api/Detalle';
  private urlPersona='https://localhost:44359/api/Persona';
  private urlBuscarProducto='https://localhost:44359/api/Producto';

  constructor(private http:HttpClient) { }

  get ():Observable<any> {
    return this.http.get<any>(this.url);
  }

  add(factura:IFacturar):Observable<IResponse>{
      ("HOLA")
    return this.http.post<IResponse>(this.url,factura);
  }

  getDetalle(id: number):Observable<IResponse>{
    return this.http.get<IResponse>(`${this.urlDetalle}/${id}`);
  }

  getBuscarProducto(id: number):Observable<IResponse>{
    return this.http.get<IResponse>(`${this.urlBuscarProducto}/${id}`);// sirve para mandar a buscar el id
  }

  
  getPersona(id: string):Observable<IResponse>{
    return this.http.get<IResponse>(`${this.urlPersona}/${id}`);
  }

  
  devolverFactura(factura:IFacturar):Observable<IResponse>{
    return this.http.put<IResponse>(this.url,factura);
  }

 


  



}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFactura } from 'src/app/interfaces/IFactura';
import { IResponse } from 'src/app/interfaces/IResponse';

@Injectable({
  providedIn: 'root'
})
export class VentaServiceService {
  private url='https://localhost:44359/api/Factura';
  private urlDetalle='https://localhost:44359/api/Detalle';
  
  constructor(private http:HttpClient) { }

  get ():Observable<any> {
    return this.http.get<any>(this.url);
  }
  add(factura:IFactura):Observable<IResponse>{
      ("HOLA")
    return this.http.post<IResponse>(this.url,factura);
  }

  getDetalle(id: number):Observable<IResponse>{
    return this.http.get<IResponse>(`${this.urlDetalle}/${id}`);
  }



}

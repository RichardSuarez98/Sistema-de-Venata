import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInventario } from 'src/app/interfaces/IInventario';
import { IResponse } from 'src/app/interfaces/IResponse';

@Injectable({
  providedIn: 'root'
})
export class ServiceInventarioService {

  private urlInventario='https://localhost:44359/api/Inventario';
  private urlEliminarInventario='https://localhost:44359/api/Inventario/eliminarInventario';
  private urlProducto='https://localhost:44359/api/Producto';                             
 

  constructor(private http:HttpClient) { }
  get ():Observable<any> {
    return this.http.get<any>(this.urlInventario);
  }

  add(inventario:IInventario):Observable<IResponse>{
      ("HOLA")
    return this.http.post<IResponse>(this.urlInventario,inventario);
  }

  delete(inv:IInventario):Observable<IResponse>{

      (inv)
    return this.http.put<IResponse>(this.urlEliminarInventario,inv);
  }
  getProducto():Observable<any>{
    return this.http.get<any>(this.urlProducto);
   }
  
}

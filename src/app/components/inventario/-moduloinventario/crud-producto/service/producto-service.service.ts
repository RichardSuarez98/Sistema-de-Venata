import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducto } from 'src/app/interfaces/IProducto';
import { IResponse } from 'src/app/interfaces/IResponse';

@Injectable({
  providedIn: 'root'
})

export class ProductoServiceService {

    private url='https://localhost:44359/api/Producto';
    private urlEliminar='https://localhost:44359/api/Producto/eliminarProducto';

    private urlCategoria='https://localhost:44359/api/Categoria';
    private urlMarca='https://localhost:44359/api/Marca';

  constructor(private http:HttpClient) { }

  get ():Observable<any> {
    return this.http.get<any>(this.url);
  }
  
 getCategoria():Observable<any>{
  return this.http.get<any>(this.urlCategoria);
 }

 getMarca():Observable<any>{
  return this.http.get<any>(this.urlMarca);
 }

  add(producto:IProducto):Observable<IResponse>{
    return this.http.post<IResponse>(this.url,producto);
  }

delete(prod:IProducto):Observable<IResponse>{
  return this.http.put<IResponse>(this.urlEliminar,prod);
}

EditarProducto(pro:IProducto):Observable<IResponse>{
  return this.http.put<IResponse>(this.url,pro);
}





}

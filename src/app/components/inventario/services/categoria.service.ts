import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoria } from 'src/app/interfaces/ICategoria';
import { IResponse } from 'src/app/interfaces/IResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
   private url='https://localhost:44359/api/Categoria';
  private urlEliminar='https://localhost:44359/api/Categoria/eliminarCategoria';

  constructor(private http:HttpClient) { }

  get ():Observable<any> {
    return this.http.get<any>(this.url);
  }
  add(categoria:ICategoria):Observable<IResponse>{
      console.log(categoria)
    return this.http.post<IResponse>(this.url,categoria);
  }

delete(cate:ICategoria):Observable<IResponse>{

    (cate)
  return this.http.put<IResponse>(this.urlEliminar,cate);
}

EditarCategoria(act:ICategoria):Observable<IResponse>{
  (act);
  return this.http.put<IResponse>(this.url,act);
}



}



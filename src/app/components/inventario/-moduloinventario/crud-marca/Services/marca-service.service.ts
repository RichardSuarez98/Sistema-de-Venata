import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IMarca } from 'src/app/interfaces/IMarca';
import { IResponse } from 'src/app/interfaces/IResponse';

@Injectable({
  providedIn: 'root'
})
export class MarcaServiceService {
  // S E R V I C I O  P A R A  M A R C A      CRUD
  private urlMarca='https://localhost:44359/api/Marca';
  private urlEliminarMarca='https://localhost:44359/api/Marca/eliminarMarca';


  constructor(private http:HttpClient) { }

    get ():Observable<any> {
      return this.http.get<any>(this.urlMarca);
    }

    add(marca:IMarca):Observable<IResponse>{
      return this.http.post<IResponse>(this.urlMarca,marca);
    }

    delete(mar:IMarca):Observable<IResponse>{
      return this.http.put<IResponse>(this.urlEliminarMarca,mar);
    }

    EditarMarca(mar:IMarca):Observable<IResponse>{
      return this.http.put<IResponse>(this.urlMarca,mar);
    }


}

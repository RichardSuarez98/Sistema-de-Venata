import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPersona } from 'src/app/interfaces/IPersona';
import { IResponse } from 'src/app/interfaces/IResponse';

@Injectable({
  providedIn: 'root'
})
export class ServicePersonaService {

  private url='https://localhost:44359/api/Persona';
  private urlEliminar='https://localhost:44359/api/Persona/eliminarPersona';

  constructor(private http:HttpClient) { }

  get ():Observable<any> {
    return this.http.get<any>(this.url);
  }
  add(persona:IPersona):Observable<IResponse>{
      ("HOLA")
    return this.http.post<IResponse>(this.url,persona);
  }

delete(per:IPersona):Observable<IResponse>{

    (per)
  return this.http.put<IResponse>(this.urlEliminar,per);
}

}

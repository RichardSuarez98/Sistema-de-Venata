import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/interfaces/IResponse';
import { IUsuario } from 'src/app/interfaces/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {
  private urlUsuario='https://localhost:44359/api/Usuario';
  private urlPersona='https://localhost:44359/api/Persona';
  private urlEliminar='https://localhost:44359/api/Usuario/eliminarUsuario';
  private urlEditar='https://localhost:44359/api/Usuario';
    
  constructor(private http:HttpClient) { }

  getPer():Observable<any> {
    return this.http.get<any>(this.urlPersona);
  }

  getUsuario():Observable<any> {
    return this.http.get<any>(this.urlUsuario);
  }

  addUsuario(usuario:IUsuario):Observable<IResponse>{
    ("HOLA")
  return this.http.post<IResponse>(this.urlUsuario,usuario);
}

  delete(usu:IUsuario):Observable<IResponse>{
    (usu)
  return this.http.put<IResponse>(this.urlEliminar,usu);
}

    
    updateUsuario(usuario:IUsuario){
        return this.http.put<IResponse>(this.urlEditar,usuario);
    }



}


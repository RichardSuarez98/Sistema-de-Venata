import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IResponse } from '../interfaces/IResponse';
import { ILogin } from '../interfaces/loginInterface';
import { Usuario } from '../interfaces/Usuario';
import {map} from 'rxjs/operators';

const httOption={
  headers: new  HttpHeaders({
    'Context-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class LoginServicesService {

  logout() {
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null!);  
  }

 public useri : Observable<Usuario>

  private url = 'https://localhost:44359/api/Usuario/login/';

  private usuarioSubject: BehaviorSubject<Usuario>;

  public get usuarioData(): Usuario{
    return this.usuarioSubject.value;
  }

  constructor(private http: HttpClient) { 
    this.usuarioSubject=
    new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')!));
    this.useri=this.usuarioSubject.asObservable();
  }



  login(usuario: ILogin): Observable<IResponse> {
(usuario)
    return this.http.post<IResponse>(this.url,usuario,httOption).pipe(
      map(res=>{
        if(res.exito=== 1){
            const usuario : Usuario = res.data;
            localStorage.setItem('usuario',JSON.stringify(usuario));
            this.usuarioSubject.next(usuario);
        }
        return res;

      })
    );

  }




  


}


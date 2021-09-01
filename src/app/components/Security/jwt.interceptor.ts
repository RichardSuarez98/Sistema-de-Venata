import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginServicesService } from "src/app/services/login-services.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor{

    constructor(private loginservice:LoginServicesService){}

    intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
       const usuario= this.loginservice.usuarioData;

       if(usuario){
        request=request.clone({
            setHeaders:{
                Authorization: `Bearer ${usuario.Token}` 
            }
        });
       }
       return next.handle(request);


    }







}
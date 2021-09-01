import { Injectable } from "@angular/core";
import { Router,CanActivate,ActivatedRouteSnapshot } from "@angular/router";
import { LoginServicesService } from "src/app/services/login-services.service";


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{


    constructor(private route:Router,
                private loginservice:LoginServicesService){


    }

    canActivate(route: ActivatedRouteSnapshot){
        const usuario= this.loginservice.usuarioData;

        if(usuario){
         return true;
        }

        this.route.navigate(['/login']);
        return false;
    }


}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServicesService } from 'src/app/services/login-services.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showFiller = false;
  nomusu:any
  constructor(
               private _login:LoginServicesService,
               private _route:Router) { }

  ngOnInit(): void {
    this.nomusu=JSON.parse(localStorage.getItem('usuario')!);
    //(this.nomusu.nombreUsuario)
  }

  logout(){
    this._login.logout();
    this._route.navigate(['login'])

  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServicesService } from 'src/app/services/login-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isExpanded: boolean=false;
expan: boolean=false;
expanPersona: boolean=false;
expanVenta: boolean=false;


showFiller = false;
nomusu:any


  constructor(private _login:LoginServicesService,
    private _route:Router) { }

  ngOnInit(): void {
    this.nomusu=JSON.parse(localStorage.getItem('usuario')!);

  }

  logout(){
    this._login.logout();
    this._route.navigate(['login'])

  }

}

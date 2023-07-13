import { Component } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  actions : Array<any> = [
    {title : "Home", "route":"/home", icon : "house"},
    {title : "Products", "route":"/admin/products", icon : "search"},
    {title : "New Product", "route":"/admin/newProduct", icon : "save"}
  ];
  currentAction :any;

  constructor(public appState :AppStateService,
              public loadingService : LoadingService){
    
  }

  setCurrentAction(action: any){
    this.currentAction = action;
  }

  

}

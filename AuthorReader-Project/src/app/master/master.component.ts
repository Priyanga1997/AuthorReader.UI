import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  constructor(public nav: NavbarService,private route:Router) { }
  
  ngOnInit(): void {
    this.nav.show();
  }
   clickLogout(){
      this.route.navigate(['']);
   }
}

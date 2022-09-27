import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  constructor(public nav: NavbarService,private route:Router,
    private observer:BreakpointObserver) { }
  
  ngOnInit(): void {
    this.nav.show();
  //   this.observer.observe(['(max-width:800px)']).subscribe((res)=
  //       if(res.matches){
  //         this.sidenav.mode='over';
  //         this.sidenav.close();
  //       }
  //       else{
  //        this.sidenav.mode='side';
  //        this.sidenav.close();
  //       }
  //      });
  //    }
   }
   clickLogout(){
      this.route.navigate(['']);
   }
}

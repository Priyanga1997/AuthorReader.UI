import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reader-login',
  templateUrl: './reader-login.component.html',
  styleUrls: ['./reader-login.component.css']
})
export class ReaderLoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  readerNavigate(){
    this.router.navigate(['reader']);
  }

}

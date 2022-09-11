import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  searchClick(){
    this.router.navigate(['bookdetails']);
  }
  backClick(){
    this.router.navigate(['navigation']);
  }
}

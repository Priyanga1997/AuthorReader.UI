import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {
  public bookList:any;
  constructor(private router:Router,private formBuilder: FormBuilder,private http: HttpClient,private api:ApiService) { }
 
  ngOnInit(): void {
      this.api.getBook().subscribe(res=>{this.bookList=res;})
    }
  backClick(){
    this.router.navigate(['navigation']);
  }
  //  public title:string ='';
  // searchBook($event:any){
  //  const value =$event.target.value;
  //  console.log(value);
  //  this.getBooks(value);
  // }
  // getBooks(value:string){
  //   this.api.getBookDetails(value).subscribe((res)=>{console.log(res);
  //   },
  //   error=>{console.error(error);
  //   });
    
  // }

}

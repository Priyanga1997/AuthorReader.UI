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
  searchForm !: FormGroup;
  public bookList:any;
  constructor(private router:Router,private formBuilder: FormBuilder,private http: HttpClient,private api:ApiService) { }
 
  ngOnInit(): void {
    //this.searchForm = this.formBuilder.group({
     // title: ['', Validators.required],
      //author: [''],
     // publisher: [''],
      //publishedDate: ['', Validators.required]
      this.api.getBook().subscribe(res=>{this.bookList=res;})
    }
  searchClick(){
    this.router.navigate(['bookdetails']);
  }
  backClick(){
    this.router.navigate(['navigation']);
  }
   public title:string ='';
   author1:any;
   publisher1:any;
  searchBook($event:any){
    //this.http.get("http://localhost:3000/bookList?title=${this.title})").subscribe(res=>this.Success(res),res=>console.log(res));
   const value =$event.target.value;
   console.log(value);
   this.getBooks(value);
  }
  getBooks(value:string){
    this.api.getBookDetails(value).subscribe((res)=>{console.log(res);
    },
    error=>{console.error(error);
    }
    );
    
  }
  
  Success(input:any){
    this.searchForm = input;
  }
}

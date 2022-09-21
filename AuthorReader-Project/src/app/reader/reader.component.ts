import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../services/api.service';
import { PurchaseService } from '../services/purchase.service';
import {Reader} from './reader.model';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {
  public bookList:any=[];
  isEdit = false;
  public totalItem :number=0;
  searchForm !: FormGroup;
  public title:string='';
  public category:string='';
  public price:number=0;
  public publisher:string='';
  images:any;
  ReaderModel:Reader=new Reader();
  ReaderModels:Array<Reader>=new Array<Reader>();
  constructor(private router:Router,private formBuilder: FormBuilder,private http: HttpClient,private api:ApiService,
    private purchase:PurchaseService) { }
 
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      title: [''],
      category: [''],
      publisher: [''],
      price: ['' ]
    });
    this.searchAllBooks();
    this.api.getBook().subscribe(res=>{this.bookList=res;
      this.bookList.forEach((a:any)=>{
        Object.assign(a,{quantity:1,total:a.price});
      });  
      this.purchase.getBooks().subscribe(res=>{
        this.totalItem = res.length;  
      })  
  })
  }
  SuccessGet(input:any){
    this.images=input;
  }
  backClick(){
    this.router.navigate(['navigation']);
  }
  addToCart(item:any){
   this.purchase.addToCart(item);
  }
  navigateToPurchase(){
    this.router.navigate(['purchase']);
  }
  searchAllBooks(){
    this.http.get("https://localhost:44398/api/reader/"+'?title='+this.ReaderModel.Title+'&category='+this.ReaderModel.Category+'&price='+this.ReaderModel.Price+'&publisher='+this.ReaderModel.Publisher)
          .subscribe(res => this.Success(res), res => console.log(res));
  }
  Success(input:any){
    this.ReaderModels = input;
    console.log(this.ReaderModels);
  }
  EditSearch(input: any) {
    debugger;
    this.isEdit=true;
    this.ReaderModel = input;
  }
}

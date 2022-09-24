import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../services/api.service';
import { NavbarService } from '../services/navbar.service';
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
  searchForm:any=FormGroup;
  public title:any='';
  public category:any='';
  public price:any=0;
  public publisher:any='';
  images:any;
  public id:string='';
  public idForDelete:string='';
  showTable: boolean = false;
  ReaderModel:Reader=new Reader();
  ReaderModels:Array<Reader>=new Array<Reader>();
  constructor(private router:Router,private formBuilder: FormBuilder,private http: HttpClient,private api:ApiService,
    private purchase:PurchaseService, private nav:NavbarService) { }
 
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      title: [''],
      category: [''],
      publisher: [''],
      price: ['' ]
    });
    this.nav.hide();
    this.searchAllBooks();
    this.purchase.getBooks().subscribe(res=>{this.bookList=res;
      this.bookList.forEach((a:any)=>{
        Object.assign(a,{quantity:1,total:a.price});
      });  
      this.purchase.getBooks().subscribe(res=>{
        this.totalItem = res.length;  
      })  
  })
  }
    getUrl()
{
  return "url('../assets/SearchBookImage.jpg')";
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
  isEmpty:boolean=false;
  searchAllBooks(){
  
      this.http.get("https://localhost:44398/api/reader/"+'?title='+this.ReaderModel.Title+'&category='+this.ReaderModel.Category+'&price='+this.ReaderModel.Price+'&publisher='+this.ReaderModel.Publisher)
      .subscribe(res => this.Success(res), res => console.log(res));
      this.showTable = !this.showTable;
 
  }
  Success(input:any){
    this.ReaderModels = input;
    console.log(this.ReaderModels);
  }
  EditSearch(input: any) {
    debugger;
    this.isEdit=true;
    this.ReaderModel = input;
    this.id = input.id;
    //this.http.put("https://localhost:44398/api/reader?id="+input.id).subscribe(res=>this.Success(res),res=>console.log(res));
  }
  DeleteSearch(input:any){
    this.http.delete("https://localhost:44398/api/reader?id="+input.id).subscribe(res=>this.Success(res),res=>console.log(res));
  }
 
   alert(){
    this.title=this.ReaderModel.Title;
    this.category=this.ReaderModel.Category;
    this.price=this.ReaderModel.Price;
    this.publisher=this.ReaderModel.Publisher;
    if(this.title&&this.category&&this.price==0&&this.publisher==null){
         alert('Please enter any of the input field to get the search results');
     }
   }
}

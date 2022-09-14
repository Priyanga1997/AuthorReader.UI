import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CreatebookComponent } from '../createbook/createbook.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { Book } from '../bookdetails/book.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  displayedColumns: string[] = ['id','title', 'category', 'price','publisher', 'active','content','action'];
  dataSource!: MatTableDataSource<any>;
  isEdit= false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  activeList = ["yes", "No"];
  createForm !: FormGroup;
   
  constructor(private formBuilder: FormBuilder,private dialog: MatDialog,private http:HttpClient){
  }
 
  ngOnInit(): void {
   this.createForm = this.formBuilder.group({
    title: ['', Validators.required],
    category: ['', Validators.required],
    publisher: ['', Validators.required],
    price: ['', Validators.required],
    active: ['', Validators.required],
    content: ['', Validators.required]
  });
  this.getAllBooks();
  }

  openDialog(): void {
     this.dialog.open(CreatebookComponent, {
      width: '35%'
    });
  }

     getAllBooks(){
      //this.http.get("http://localhost:3000/bookList").subscribe(res=>this.Success(res),res=>console.log(res));
       this.http.get("http://localhost:3000/bookList").subscribe({
       next:(res:any)=>{
           this.dataSource=new MatTableDataSource(res);
             this.dataSource.paginator = this.paginator;
             this.dataSource.sort=this.sort;
           },
           error:(err)=>{
           alert("Error while fetching records!");
           }
         })
     }
     Success(input:any){
      this.createForm=input;
    }
    addBook() {
      this.http.post("http://localhost:3000/bookList", this.createForm.value)
      .subscribe(res=>this.PostSuccess(res),res=>console.log(res));
    }
    PostSuccess(input:any){
      this.getAllBooks();
    }
 
     if(isEdit:any){
       this.http.put("http://localhost:3000/bookList",this.createForm.value).subscribe((res:any)=>this.PostSuccess(res),(res:any)=>console.log(res));
     }
   
     editBook(row:any) {
       this.isEdit=true;
       this.createForm.controls = row;
     }
     deleteBook(row:any){
       this.http.delete("http://localhost:3000/bookList/6").subscribe(res=>console.log(res),res=>console.log(res));
     }
  
 applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();

     if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
     }
   }
}

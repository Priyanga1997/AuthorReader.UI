import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, } from '@angular/router';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'category', 'price', 'author', 'publisher', 'active', 'content', 'action'];
  dataSource!: MatTableDataSource<any>;
  isEdit = false;
  actionBtn: string = "Save";
  public dataID: number = 0;
  public emailId :any;
  public emailJson = localStorage.getItem('emailId');
  public authorId ="";
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  activeList = ["yes", "No"];
  createForm !: FormGroup;
  public title: string = '';
  public category: string = '';
  public price: number = 0;
  public publisher: string = '';
  public active: string = '';
  public content: string = '';
  public selectedFile!: File;
  public image: string = '';
  public author: string = '';
  public authorName ="";
  public username = localStorage.getItem('userName');
  AddSuccessMessage ='';
  UpdateSuccessMessage='';
  DeleteSuccessMessage='';
  ImageUploadSuccessMessage='';
  BlockBookSuccessMessage='';
  UnblockBookSuccessMessage='';
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private http: HttpClient,
    private api: ApiService, private route: Router, private nav: NavbarService
  ) {
  }
  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      image: [''],
      publisher: ['', Validators.required],
      price: ['', Validators.required],
      active: ['yes', Validators.required],
      content: ['', Validators.required],
      author:['',Validators.required]
    });
    this.emailId = this.emailJson;
    this.getAllBooks();
    this.nav.hide();
  }
  images: any;
  uploadFile(event: any) {
    debugger;
    this.ImageUploadSuccessMessage ="Image uploaded.";
    document.getElementById('btnImageUploadSuccessMsg')?.click();
    this.selectedFile = event.target.files[0];
  }
  SuccessGet(input: any) {
    this.images = input;
  }
  getAllBooks() {
     this.api.getBooks(this.emailId).subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
      },
      error: (err) => {
        alert("Error while fetching records!");
      }
    })
   }

  addBook() {
     this.title = this.createForm.get('title')?.value;
     this.category = this.createForm.get('category')?.value;
     this.price = this.createForm.get('price')?.value;
     this.publisher = this.createForm.get('publisher')?.value;
     this.active = this.createForm.get('active')?.value;
     this.content = this.createForm.get('content')?.value;
     this.author = this.createForm.get('author')?.value;
     const formData = new FormData();
     formData.append('image', this.selectedFile, this.selectedFile.name);
     formData.append('Title', this.title);
     formData.append('Price', (this.price).toString());
     formData.append('Category', this.category);
     formData.append('Active', this.active);
     formData.append('Content', this.content);
     formData.append('Publisher', this.publisher);
     formData.append('EmailId', this.emailId);
     formData.append('Id', (this.dataID).toString());
     formData.append('Author', this.author);
    if (this.isEdit) {

      // this.http.put("https://localhost:44393/api/author/updateBookDetails/" + '?id=' + this.dataID, formData)
      //   .subscribe(res => this.PutSuccess(res), res => console.log(res));
      this.http.put("http://localhost:48726/api/gateway/author/updateBookDetails" + '?id=' + this.dataID, formData)
       //this.http.put("http://4.227.217.95/api/gateway/author/updateBookDetails" + '?id=' + this.dataID, formData)
        .subscribe(res => this.PutSuccess(res), res => console.log(res));
    }
    else {
        // this.http.post('https://localhost:44393/api/author/createBooks/',formData).subscribe(res=>this.PostSuccess(res),res=>console.log(res));
        this.http.post('http://localhost:48726/api/gateway/author/createBooks',formData).subscribe(res=>this.PostSuccess(res),res=>console.log(res));
         //this.http.post('http://4.227.217.95/api/gateway/author/createBooks',formData).subscribe(res=>this.PostSuccess(res),res=>console.log(res));
    }
  }
  PostSuccess(input: any) {
    this.AddSuccessMessage ="Data got added successfully.";
    document.getElementById('btnAddSuccessMsg')?.click();
    this.getAllBooks();
  }
  PutSuccess(input: any) {
    this.UpdateSuccessMessage ="Data got updated successfully.";
    document.getElementById('btnUpdateSuccessMsg')?.click();
    this.getAllBooks();
  }
  DeleteSuccess(input: any) {
    this.DeleteSuccessMessage ="Data got deleted successfully.";
    document.getElementById('btnDeleteSuccessMsg')?.click();
  }

  editBook(row: any) {
    debugger;
    console.log(row);
    this.dataID = row.id;
    this.isEdit = true;
    this.actionBtn = "Update";
    this.createForm.controls['title'].setValue(row.title);
    this.createForm.controls['category'].setValue(row.category)
    this.createForm.controls['price'].setValue(row.price);
    this.createForm.controls['author'].setValue(row.author);
    this.createForm.controls['publisher'].setValue(row.publisher);
    this.createForm.controls['active'].setValue(row.active);
    this.createForm.controls['content'].setValue(row.content);
  }

  deleteBook(row: any) {
    //this.api.deleteBook(row.id).subscribe(res => this.DeleteSuccess(res), res => console.log(res));
    // this.http.delete("https://localhost:44393/api/author/deleteBookDetails/" + '?id=' + row.id).subscribe(res => this.DeleteSuccess(res), res => console.log(res));
    this.http.delete("https://localhost:48726/api/gateway/author/deleteBookDetails" + '?id=' + row.id).subscribe(res => this.DeleteSuccess(res), res => console.log(res));
    //this.http.delete("http://4.227.217.95/api/gateway/author/deleteBookDetails" + '?id=' + row.id).subscribe(res => this.DeleteSuccess(res), res => console.log(res));
  }

  blockBook(row:any){
    this.authorId=row.id;  
    this.api.blockBook(this.authorId);
    this.getAllBooks();
    this.BlockBookSuccessMessage ="Book has been blocked.";
    document.getElementById('btnBlockBookSuccessMsg')?.click();
  }

  unblockBook(row:any){
    this.authorId=row.id;  
    this.api.unblockBook(this.authorId);
      this.getAllBooks();    
      this.UnblockBookSuccessMessage ="Book has been unblocked.";
    document.getElementById('btnUnblockBookSuccessMsg')?.click();
  }
  onClose() {
    this.createForm.reset();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

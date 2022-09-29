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
  displayedColumns: string[] = ['id', 'title', 'category', 'price', 'publisher', 'active', 'content', 'action'];
  dataSource!: MatTableDataSource<any>;
  isEdit = false;
  actionBtn: string = "Save";
  public dataID: number = 0;
  public authorId ="";
  public authorJson = localStorage.getItem('authorId');
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
  AddSuccessMessage ='';
  UpdateSuccessMessage='';
  DeleteSuccessMessage='';
  ImageUploadSuccessMessage='';
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
      content: ['', Validators.required]
    });
    this.authorId = this.authorJson !== null ? JSON.parse(this.authorJson) : " ";
    this.getAllBooks();
    this.nav.hide();
    // this.http.get("https://localhost:44398/api/home/get-images").subscribe(res => this.SuccessGet(res), res => console.log(res));

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
     this.api.getBooks(this.authorId).subscribe({
     // this.http.get("https://localhost:44398/api/author").subscribe({
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
    //  this.api.getBooksOfAllAuthors(this.authorId).subscribe({
    //    next: (res: any) => {
    //      this.dataSource = new MatTableDataSource(res);
    //      this.dataSource.paginator = this.paginator;
    //      this.dataSource.sort = this.sort;
    //    },
    //    error: (err) => {
    //      alert("Error while fetching records!");
    //    }
    //  })
   }

  addBook() {
    //var data ={
     // Title :this.createForm.get('title')?.value,
     // Category : this.createForm.get('category')?.value,
     // Price : this.createForm.get('price')?.value,
     // Publisher : this.createForm.get('publisher')?.value,
     // Active : this.createForm.get('active')?.value,
     // Content : this.createForm.get('content')?.value
     // }
    
     this.title = this.createForm.get('title')?.value;
     this.category = this.createForm.get('category')?.value;
     this.price = this.createForm.get('price')?.value;
     this.publisher = this.createForm.get('publisher')?.value;
     this.active = this.createForm.get('active')?.value;
     this.content = this.createForm.get('content')?.value;
     const formData = new FormData();
     formData.append('image', this.selectedFile, this.selectedFile.name);
     formData.append('Title', this.title);
     formData.append('Price', (this.price).toString());
     formData.append('Category', this.category);
     formData.append('Active', this.active);
     formData.append('Content', this.content);
     formData.append('Publisher', this.publisher);
     formData.append('AuthorId', this.authorId);
     console.log(this.authorId);
    if (this.isEdit) {

      this.http.put("https://localhost:44398/api/home" + '?id=' + this.dataID, formData)
        .subscribe(res => this.PutSuccess(res), res => console.log(res));
    }
    else {
     // this.http.post("https://localhost:44398/api/author", data)
       // .subscribe(res => this.PostSuccess(res), res => console.log(res));
        this.http.post('https://localhost:44398/api/home/',formData).subscribe(res=>console.log(res),res=>console.log(res));
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
    this.createForm.controls['publisher'].setValue(row.publisher);
    this.createForm.controls['active'].setValue(row.active);
    this.createForm.controls['content'].setValue(row.content);
  }

  deleteBook(row: any) {
    this.http.delete("https://localhost:44398/api/author/" + '?id=' + row.id).subscribe(res => this.DeleteSuccess(res), res => console.log(res));
  }

  blockBook(row:any){
    this.authorId=row.id;  
    this.api.blockBook(this.authorId);
      this.getAllBooks();
  }

  unblockBook(row:any){
    this.authorId=row.id;  
    this.api.unblockBook(this.authorId);
      this.getAllBooks();    
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

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
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private http: HttpClient,
    private api: ApiService, private route: Router, private nav: NavbarService
  ) {
  }


  // @ViewChild('fileInput') fileInput!: ElementRef;
  // fileAttr = 'Choose File';
  // uploadFileEvt(imgFile: any) {
  //   if (imgFile.target.files && imgFile.target.files[0]) {
  //     this.fileAttr = '';
  //     Array.from(imgFile.target.files).forEach((file: any) => {
  //       this.fileAttr += file.name + ' - ';
  //     });
  //     // HTML5 FileReader API
  //     let reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       let image = new Image();
  //       image.src = e.target.result;
  //       image.onload = (rs) => {
  //         let imgBase64Path = e.target.result;
  //       };
  //     };
  //     reader.readAsDataURL(imgFile.target.files[0]);
  //     // Reset if duplicate image uploaded again
  //     this.fileInput.nativeElement.value = '';
  //   } else {
  //     this.fileAttr = 'Choose File';
  //   }
  // }
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
  // fileToUpload:File;
  // handleFileInput(file:FileList){
  //   this.fileToUpload = file.item(0);
  //   var reader = new FileReader();
  //   reader.onload=(event:any)=>{
  //     this.urls = event.target.result;

  //   }
  //   reader.readAsDataURL(this.fileToUpload);
  // }
  // uploadFileEvt(e:any){
  //   //const file = event.target.files[0]
  //  if(e.target.files){
  //    //for(let i=0;i<File.length;i++){
  //      var reader = new FileReader();
  //      reader.readAsDataURL(e.target.files[0]);
  //      reader.onload=(events:any)=>{
  //      this.urls.push(events.target.result);
  //      }
  //    }
  //  //}
  // }
  uploadFile(event: any) {
    // if(files.length==0){
    //   return ;
    // }
    // let fileToUpload=<File>files[0];
    debugger;
    console.log('Image uploaded');
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

      this.http.put("https://localhost:44398/api/author" + '?id=' + this.dataID, this.createForm.value)
        .subscribe(res => this.PutSuccess(res), res => console.log(res));
    }
    else {
     // this.http.post("https://localhost:44398/api/author", data)
       // .subscribe(res => this.PostSuccess(res), res => console.log(res));
        this.http.post('https://localhost:44398/api/home/',formData).subscribe(res=>console.log(res),res=>console.log(res));
    }
  }
  PostSuccess(input: any) {
    alert("Data got added successfully");
    this.getAllBooks();
  }
  PutSuccess(input: any) {
    alert("Data got updated successfully");
    this.getAllBooks();
  }
  DeleteSuccess(input: any) {
    alert("Data got deleted successfully");
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

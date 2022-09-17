import { Component, EventEmitter, Inject, Injectable, Input, OnInit, Output, ViewChild,ElementRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreatebookComponent } from '../createbook/createbook.component';
import { ApiService } from '../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatCellDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Router, RouterLinkWithHref } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'category', 'price', 'publisher', 'active', 'content', 'action'];
  dataSource!: MatTableDataSource<any>;
  isEdit = false;
  actionBtn: string = "Save";
  public dataID:number=0;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  activeList = ["yes", "No"];
  createForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private http: HttpClient,
    private api:ApiService,private route:Router
  ) {
  }

  selectedFile=null;
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
      image:[''],
      publisher: ['', Validators.required],
      price: ['', Validators.required],
      active: ['', Validators.required],
      content: ['', Validators.required]
    });
    this.getAllBooks();
  }
  urls: string[] = [];
  uploadFileEvt(e:any){
   if(e.target.files){
     //for(let i=0;i<File.length;i++){
       var reader = new FileReader();
       reader.readAsDataURL(e.target.files[0]);
       //reader.onload=(events:any)=>{
        // this.urls.push(events.target.result);
      // }
    // }
   }
  }



  openDialog(): void {
    this.dialog.open(CreatebookComponent, {
      width: '35%'
    });
  }
 
  getAllBooks() {
    this.http.get("http://localhost:3000/bookList").subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("Error while fetching records!");
      }
    })
  }
  Success(input: any) {
    this.createForm = input;
  }

  addBook() {
    if (this.isEdit) {
       
       this.http.put("http://localhost:3000/bookList/" +this.dataID, this.createForm.value)
         .subscribe(res => this.PostSuccess(res), res => console.log(res));
    }
    else {
      this.http.post("http://localhost:3000/bookList", this.createForm.value)
        .subscribe(res => this.PostSuccess(res), res => console.log(res));
    }
  }
  PostSuccess(input: any) {
    this.getAllBooks();
  }

  editBook(row: any) {
    debugger;
    console.log(row);
    this.dataID=row.id;
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
    this.http.delete("http://localhost:3000/bookList/"+row.id).subscribe(res => this.PostSuccess(res), res => console.log(res));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

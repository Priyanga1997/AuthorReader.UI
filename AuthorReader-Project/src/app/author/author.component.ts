import { Component,OnInit,ViewChild} from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router,} from '@angular/router';
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
  public dataID:number=0;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  activeList = ["yes", "No"];
  createForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private http: HttpClient,
    private api:ApiService,private route:Router,private nav: NavbarService
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
      active: ['yes', Validators.required],
      content: ['', Validators.required]
    });
    this.getAllBooks();
    this.nav.hide();
  }
  urls: string[] = [];
  // fileToUpload:File;
  // handleFileInput(file:FileList){
  //   this.fileToUpload = file.item(0);
  //   var reader = new FileReader();
  //   reader.onload=(event:any)=>{
  //     this.urls = event.target.result;

  //   }
  //   reader.readAsDataURL(this.fileToUpload);
  // }
  uploadFileEvt(e:any){
    //const file = event.target.files[0]
   if(e.target.files){
     //for(let i=0;i<File.length;i++){
       var reader = new FileReader();
       reader.readAsDataURL(e.target.files[0]);
       reader.onload=(events:any)=>{
       this.urls.push(events.target.result);
       }
     }
   //}
  }
  getAllBooks() {
    this.http.get("https://localhost:44398/api/author").subscribe({
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
       
       this.http.put("https://localhost:44398/api/author"+'?id='+this.dataID, this.createForm.value)
         .subscribe(res => this.PutSuccess(res), res => console.log(res));
    }
    else {
      this.http.post("https://localhost:44398/api/author", this.createForm.value)
        .subscribe(res => this.PostSuccess(res), res => console.log(res));
    }
  }
  PostSuccess(input: any) {
    alert("data got added successfully");
    this.getAllBooks();
  }
  PutSuccess(input: any) {
    alert("data got updated successfully");
    this.getAllBooks();
  }
  DeleteSuccess(input:any){
    alert("data got deleted successfully");
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
    this.http.delete("https://localhost:44398/api/author/"+'?id='+row.id).subscribe(res => this.DeleteSuccess(res), res => console.log(res));
  }

  onClose(){
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

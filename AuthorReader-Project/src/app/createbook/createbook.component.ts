import { Component, Inject,OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-createbook',
  templateUrl: './createbook.component.html',
  styleUrls: ['./createbook.component.css']
})
export class CreatebookComponent implements OnInit {
  activeList = ["yes", "No"];
  createForm !: FormGroup;
 
  actionBtn :string="Save"
  constructor(private formBuilder: FormBuilder, private api: ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<CreatebookComponent>) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      publisher: ['', Validators.required],
      price: ['', Validators.required],
      active: ['', Validators.required],
      content: ['', Validators.required]
    });
    if(this.editData)
    {
      this.actionBtn="Update";
      this.createForm.controls['title'].setValue(this.editData.title);
      this.createForm.controls['category'].setValue(this.editData.category);
      this.createForm.controls['price'].setValue(this.editData.price);
      this.createForm.controls['publisher'].setValue(this.editData.publisher);
      this.createForm.controls['active'].setValue(this.editData.active);
      this.createForm.controls['content'].setValue(this.editData.content);
    }
  }
  
   addBook() {
     if(!this.editData){
     if(this.createForm.valid){
       this.api.postBook(this.createForm.value)
       .subscribe({
         next:()=>{
            alert("Book added successfully");
          this.createForm.reset();
            this.dialogRef.close('save');
          },
         error:()=>{
           alert("Error while adding the book");
         }       
       })
     }
    }
  }
  }



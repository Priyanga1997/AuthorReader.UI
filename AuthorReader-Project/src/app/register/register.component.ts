import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../models/userdata';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register:any=FormGroup;
  UserDataModel:UserData=new UserData();
  ErrorMessage:any='';
  userType:any='';
  SuccessMessage='';
  constructor(private fb:FormBuilder,private router:Router, private _service: LoginService, private http:HttpClient) { }

  ngOnInit(): void {
    this.register=this.fb.group({
      username:['',Validators.required],
      password:['', Validators.compose([
        Validators.minLength(5),
        Validators.required])]
      })
  }
  onOptionsSelected(event:any){
    this.UserDataModel.userType = event.target.value;
   console.log(this.UserDataModel.userType); //option value will be sent as event
  }
  registerSubmit()
  {
    var userdata = {
      userName:this.UserDataModel.userName,
      password:this.UserDataModel.password,
      userType:this.UserDataModel.userType
    };
    this.http.post("https://localhost:44398/api/login/register-user",userdata).subscribe(res=>{
    console.log('You have successfully registered');
    this.SuccessMessage ="You have successfully registered.";
    document.getElementById('btnSuccessMsg')?.click();
    });
  }
  goToLogin(){
    this.router.navigate(['login']);
  }
}

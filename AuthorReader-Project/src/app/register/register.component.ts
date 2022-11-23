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
      emailId:['',Validators.required],
      password:['', Validators.compose([
        Validators.minLength(5),
        Validators.required])],
        usertype:['',Validators.required]
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
      emailId:this.UserDataModel.emailId,
      password:this.UserDataModel.password,
      userType:this.UserDataModel.userType
    };
    if(this.userType == 'Author')
    {
    // this.http.post("https://localhost:44393/api/login/register-user",userdata).subscribe(res=>{
    this.http.post("http://localhost:48726/api/gateway/login/register-user",userdata).subscribe(res=>{
    //this.http.post("http://4.227.217.95/api/gateway/login/register-user",userdata).subscribe(res=>{
    console.log('You have successfully registered');
    this.SuccessMessage ="You have successfully registered.";
    document.getElementById('btnSuccessMsg')?.click();
    });
  }
    else{
      // this.http.post("https://localhost:44333/api/readerlogin/reader-register",userdata).subscribe(res=>{
        this.http.post("http://localhost:48726/api/gateway/readerlogin/reader-register",userdata).subscribe(res=>{
        //this.http.post("http://4.227.217.95/api/gateway/readerlogin/reader-register",userdata).subscribe(res=>{
        console.log('You have successfully registered');
        this.SuccessMessage ="You have successfully registered.";
        document.getElementById('btnSuccessMsg')?.click();
        });
    }
  }
  goToLogin(){
    this.router.navigate(['login']);
  }
  getUrl() {
    return "url('../assets/RegisterImage.jpg')";
  }

}

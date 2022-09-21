import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../models/userdata';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 login:any=FormGroup;
 UserDataModel:UserData=new UserData();
 ErrorMessage:any='';
 userType:any='';
 optionSelected: any;

onOptionsSelected(event:any){
  this.userType = event.target.value;
 console.log(this.userType); //option value will be sent as event
}
  constructor(private fb:FormBuilder,private router:Router, private _service:LoginService) { }

  ngOnInit(): void {
    this.login=this.fb.group({
      username:['',Validators.required],
      password:['', Validators.compose([
        Validators.minLength(5),
        Validators.required])],
      usertype:['',Validators.required]
        //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])]
    });
  }
  loginSubmit(){
    this._service.loginUser(this.UserDataModel).subscribe(res=>{
      console.log('You are able to login');
      alert('You have logged in successfully');
      localStorage.setItem('token',res.token);
      if(this.userType=="Author")
      {
         this.router.navigate(['author']);
      }
      if(this.userType=="Reader")
      {
        this.router.navigate(['reader']);
      }
    },res=>
    {
      console.log(res);
      this.ErrorMessage="Some error have occured!!Try entering the valid username and password";
      document.getElementById('btnErrorMsg')?.click();
    });
    
  }
  goToSignup(){
    this.router.navigate(['register']);
  }
}

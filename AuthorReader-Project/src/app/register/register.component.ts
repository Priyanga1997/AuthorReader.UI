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
  constructor(private fb:FormBuilder,private router:Router, private _service: LoginService) { }

  ngOnInit(): void {
    this.register=this.fb.group({
      username:['',Validators.required],
      password:['', Validators.compose([
        Validators.minLength(5),
        Validators.required])]
      })
  }
  registerSubmit()
  {
    this._service.register(this.UserDataModel).subscribe(res=>{
    console.log('You have successfully registered');
      // alert('Hi');
      localStorage.setItem('token',res.token);
    },res=>
    {
      console.log(res);
      this.ErrorMessage="Some error have occured";
      document.getElementById('btnErrorMsg')?.click();
    });
  }
  goToLogin(){
    this.router.navigate(['login']);
  }
}

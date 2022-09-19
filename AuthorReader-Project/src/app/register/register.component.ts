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
    alert('You have registered successfully');
      localStorage.setItem('token',res.token);
    });
  }
  goToLogin(){
    this.router.navigate(['login']);
  }
}

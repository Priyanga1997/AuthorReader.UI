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
  this.UserDataModel.userType = event.target.value;
 console.log(this.UserDataModel.userType); //option value will be sent as event
}
  constructor(private fb:FormBuilder,private router:Router, private _service:LoginService) { }

  ngOnInit(): void {
    this.login=this.fb.group({
      username:['',Validators.required],
      emailId:['',Validators.required],
      password:['', Validators.compose([
        Validators.minLength(5),
        Validators.required])],
      usertype:['',Validators.required]
        //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])]
    });
  }
  loginSubmit(){
    var userdata = {
      userName:this.UserDataModel.userName,
      emailId:this.UserDataModel.emailId,
      password:this.UserDataModel.password,
      userType:this.UserDataModel.userType
    };
    // if(res.userData.userType=="Author")
    // {
    //    this.router.navigate(['author']);
    // }
    // if(res.userData.userType=="Reader")
    // {
    //   this.router.navigate(['reader']);
    // }
    if(userdata.userType == 'Author')
    {
      debugger;
      this._service.authorLogin(userdata).subscribe(res=>{
      //localStorage.setItem('authorId',res.userData.id);
      localStorage.setItem('token',res.token);
      localStorage.setItem('emailId',this.UserDataModel.emailId);
      localStorage.setItem('userName',this.UserDataModel.userName);
      document.getElementById('btnSuccessMessage')?.click();
      this.router.navigate(['author']);
    },res=>
    {
      console.log(res);
      this.ErrorMessage="Some error have occured!!Try entering the valid username and password";
      document.getElementById('btnErrorMsg')?.click();
    });
  }
  else{
    this._service.readerLogin(userdata).subscribe(res=>{
      localStorage.setItem('token',res.token);
      localStorage.setItem('emailId',this.UserDataModel.emailId);
      localStorage.setItem('userName',this.UserDataModel.userName);
      document.getElementById('btnSuccessMessage')?.click();
     this.router.navigate(['reader']);
    },res=>
    {
      console.log(res);
      this.ErrorMessage="Some error have occured!!Try entering the valid username and password";
      document.getElementById('btnErrorMsg')?.click();
    });
  }
    
  }
  goToSignup(){
    this.router.navigate(['register']);
  }
  getUrl() {
    return "url('../assets/LoginImage.jpg')";
  }

}

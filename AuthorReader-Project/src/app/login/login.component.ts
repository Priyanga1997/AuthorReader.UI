import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 login:any=FormGroup;
  constructor(private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.login=this.fb.group({
      username:['',Validators.required],
      password:['', Validators.compose([
        Validators.minLength(5),
        Validators.required])]
        //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])]
    });
  }
  loginSubmit(data:any){
    console.log(data);
    this.router.navigate(['navigation']);
    
  }
  goToSignup(){
    this.router.navigate(['register']);
  }

}

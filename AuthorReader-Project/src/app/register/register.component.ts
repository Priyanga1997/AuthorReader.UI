import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register:any=FormGroup;
  constructor(private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.register=this.fb.group({
      username:['',Validators.required],
      password:['', Validators.compose([
        Validators.minLength(5),
        Validators.required])]
      })
  }
  registerSubmit(data:any)
  {
    console.log(data);
  }
  goToLogin(){
    this.router.navigate(['login']);
  }
}

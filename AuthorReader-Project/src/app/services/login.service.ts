import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  _loginUrl="https://localhost:44398/api/login/login-user";
  _registerUrl="https://localhost:44398/api/login/register-user";
  constructor(private http:HttpClient) { }
  loginUser(login:any){
    return this.http.post<any>(this._loginUrl,login);
  }
  register(register:any){
    return this.http.post<any>(this._registerUrl,register);
  }
  getToken(){
    return localStorage.getItem('token');
  }
}

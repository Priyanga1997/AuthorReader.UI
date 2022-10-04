import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  _loginUrl="https://localhost:44393/api/login/login-user";
  _readerLoginUrl="https://localhost:44333/api/login/login-user";
  // _registerUrl="https://localhost:44398/api/login/register-user";
  constructor(private http:HttpClient) { }
  authorLogin(login:any){
    return this.http.post<any>(this._loginUrl,login);
  }
  readerLogin(login:any){
    return this.http.post<any>(this._readerLoginUrl,login);
  }
  // register(register:any){
  //   return this.http.post<any>(this._registerUrl,register);
  // }
  getToken(){
    return localStorage.getItem('token');
  }
}

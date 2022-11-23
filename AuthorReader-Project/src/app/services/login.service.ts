import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // public loginUrl="https://localhost:44393/api/login/login-user";
  // public readerLoginUrl="https://localhost:44333/api/readerlogin/reader-login";
  // public loginUrl="http://4.227.217.95/api/gateway/login/login-user";
  // public readerLoginUrl="http://4.227.217.95/api/gateway/readerlogin/reader-login";

  public loginUrl="http://localhost:48726/api/gateway/login/login-user";
  public readerLoginUrl="http://localhost:48726/api/gateway/readerlogin/reader-login";

  constructor(private http:HttpClient) { }
  authorLogin(login:any){
    return this.http.post<any>(this.loginUrl,login);
  }
  readerLogin(login:any){
    return this.http.post<any>(this.readerLoginUrl,login);
  }
  getToken(){
    return localStorage.getItem('token');
  }
}

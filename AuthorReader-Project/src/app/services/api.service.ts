import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 public _postOrders = "https://localhost:44398/api/reader/";
 public _blockURL ="https://localhost:44398/api/home/blockBook";
 public _unblockURL="https://localhost:44398/api/home/unblockBook";;
 
  constructor(private http: HttpClient) { }
  getBook() {
    return this.http.get<any>("https://localhost:44398/api/author/").pipe(map((res: any) => {
      return res;
    }));
  }


  getBooks(id: any) {
    debugger;
    return this.http.get<any>("https://localhost:44398/api/author?id=" + id);
  }

  postOrders(postOrders:any) {
    return this.http.post(this._postOrders,postOrders).pipe(map((res: any) => {
      return res;
    }));
  }

  blockBook(id:any){
    this.http.put(this._blockURL,id).subscribe(res=>this.Success(res),res=>console.log(res))
  }

  unblockBook(id:any){
    this.http.put(this._unblockURL,id).subscribe(res=>this.Success(res),res=>console.log(res))
  }

  Success(input:any){
   console.log(input);
  }

}

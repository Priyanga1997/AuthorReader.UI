import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 public _postOrders = "https://localhost:44333/api/order/";
 public _blockURL ="https://localhost:44393/api/author/blockBook";
 public _unblockURL="https://localhost:44393/api/author/unblockBook";;
 
  constructor(private http: HttpClient) { }
  getAllBooks() {
    return this.http.get<any>("https://localhost:44393/api/author/getAllBooks").pipe(map((res: any) => {
      return res;
    }));
  }

  getBooks(emailId: any) {
    debugger;
    return this.http.get<any>("https://localhost:44393/api/author/getBooksByAuthorId?emailId=" + emailId);
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

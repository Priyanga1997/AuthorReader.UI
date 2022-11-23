import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
//  public postOrdersURL = "https://localhost:44333/api/order/";
//  public blockURL ="https://localhost:44393/api/author/blockBook";
//  public unblockURL="https://localhost:44393/api/author/unblockBook";
//  public getAllBooksURL="https://localhost:44393/api/author/getAllBooks";
//  public getBooksURL="https://localhost:44393/api/author/getBooksByEmailId?emailId=";
//  public deleteBookURL = "https://localhost:44393/api/author/deleteBookDetails/" + '?id=';

//public postOrdersURL = "http://4.227.217.95/api/order/";
// public blockURL ="http://4.227.217.95/api/gateway/author/blockBook";
// public unblockURL="http://4.227.217.95/api/gateway/author/unblockBook";
// public getAllBooksURL="http://4.227.217.95/api/gateway/author/getAllBooks";
// public getBooksURL="http://4.227.217.95/api/gateway/author/getBooksByEmailId?emailId=";

public blockURL ="http://localhost:48726/api/gateway/author/blockBook";
public unblockURL="http://localhost:48726/api/gateway/author/unblockBook";
public getAllBooksURL="http://localhost:48726/api/gateway/author/getAllBooks";
public getBooksURL="http://localhost:48726/api/gateway/author/getBooksByEmailId?emailId=";


 
  constructor(private http: HttpClient) { }
  getAllBooks() {
    return this.http.get(this.getAllBooksURL).pipe(map((res: any) => {
      return res;
    }));
  }

  getBooks(emailId: any) {
    debugger;
    return this.http.get(this.getBooksURL+ emailId);
  }

  // postOrders(postOrders:any) {
  //   return this.http.post(this.postOrdersURL,postOrders).pipe(map((res: any) => {
  //     return res;
  //   }));
  // }

  blockBook(id:any){
    return this.http.put(this.blockURL,id).subscribe(res=>this.Success(res),res=>console.log(res))
  }

  unblockBook(id:any){
    return this.http.put(this.unblockURL,id).subscribe(res=>this.Success(res),res=>console.log(res))
  }

  // deleteBook(id:any){
  //   return this.http.delete(this.deleteBookURL,id);
  // }

  Success(input:any){
   console.log(input);
  }

}

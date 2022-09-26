import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 _postOrders = "https://localhost:44398/api/reader/";
  constructor(private http: HttpClient) { }

  // postBook(data: any) {
  //   return this.http.post<any>("http://localhost:3000/bookList/", data);
  // }

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

}

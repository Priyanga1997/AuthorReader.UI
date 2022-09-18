import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // postBook(data: any) {
  //   return this.http.post<any>("http://localhost:3000/bookList/", data);
  // }

  getBook() {
    return this.http.get<any>("http://localhost:3000/bookList/").pipe(map((res:any)=>{
      return res;
    }));
  }
}

//   putBook(data:any,id:number){
//     return this.http.put("http://localhost:3000/bookList/" +id,data);
//   }

//    getBookDetails(value:string):Observable<any>{
//     return this.http.get("http://localhost:3000/bookList/?q=${value}");
//    }
// }

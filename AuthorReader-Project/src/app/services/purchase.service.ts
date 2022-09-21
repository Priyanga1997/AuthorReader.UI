import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  public purchaseItemList :any =[]
  public bookList = new BehaviorSubject<any>([]);
  constructor() { }
  getBooks()
  {
    return this.bookList.asObservable();
}
setBooks(book:any){
  this.purchaseItemList.push(...book)
  this.bookList.next(book);
}
addToCart(book:any){
  this.purchaseItemList.push(book);
  this.bookList.next(this.purchaseItemList);
  this.getTotalPrice();
  console.log(this.purchaseItemList);
}
getTotalPrice():number{
  let grandTotal=0; 
  this.purchaseItemList.map((a:any)=>{ 
  grandTotal +=a.total;
})
return grandTotal;
}
removeCartItem(product:any)
{ 
  this.purchaseItemList.map((a:any,index:any)=>{
  if(product.id===a.id){
  this.purchaseItemList.splice(index,1);
}
  })
}
}


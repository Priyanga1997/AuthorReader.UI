import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  _orderUrl="https://localhost:44398/api/order/getOrderDetails/";
  _cancelorderUrl="https://localhost:44398/api/order/cancelOrder/";
  constructor(private http:HttpClient) { }
  viewOrders(emailId:any) {
    return this.http.get(this._orderUrl+'?EmailId='+ emailId).pipe(map((res: any) => {
      return res;
    }));
  }
  cancelOrder(orderId:any) {
    return this.http.get(this._cancelorderUrl+'?OrderId='+ orderId).pipe(map((res: any) => {
      return res;
    }));
  }
}

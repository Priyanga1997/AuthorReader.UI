import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // public orderUrl="https://localhost:44333/api/order/getOrderDetails?EmailId=";
  // public cancelorderUrl="https://localhost:44333/api/order/cancelOrder/";
  // public orderUrl="http://4.227.217.95/api/gateway/order/getOrderDetails?EmailId=";
  // public cancelorderUrl="http://4.227.217.95/api/gateway/order/cancelOrder";

  public orderUrl="http://localhost:48726/api/gateway/order/getOrderDetails?EmailId=";
  public cancelorderUrl="http://localhost:48726/api/gateway/order/cancelOrder";
  constructor(private http:HttpClient) { }

  viewOrders(emailId:any) {
    debugger;
    return this.http.get(this.orderUrl+ emailId);
  }

  cancelOrder(orderId:any) {
    return this.http.put(this.cancelorderUrl+'?OrderId='+ orderId,'').pipe(map((res: any) => {
      return res;
    }));
  }
}

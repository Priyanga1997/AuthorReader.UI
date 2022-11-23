import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/OrderModel';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public orders:any=[];
  public emailId:string='';
  OrderModel: Order = new Order();
  public imageURL="https://digitalbooksimages.blob.core.windows.net/images/";
  constructor(private orderService:OrderService, public router:Router) { }

  ngOnInit(): void {
      
      }
      //getting column names
  orderColumns: Array<any> = new Array<any>();
  
  //getting column data
  orderData: Array<any> = new Array<any>();
  @Input("order-columns")
  set SetGridColumns(_orderColumns:Array<any>){
    this.orderColumns=_orderColumns;
  }

  @Input("order-data")
  set SetGridData(_orderData:Array<any>){
    this.orderData=_orderData;
  }

  @Output("cancel-order")
  emitemittercancelorder:EventEmitter<any>=new EventEmitter<any>();
  cancelOrder(_cancelOrder:any){
    debugger;
    this.emitemittercancelorder.emit(_cancelOrder);
  }

  @Output("refund")
  emitemitterrefund:EventEmitter<any>=new EventEmitter<any>();
  refund(_refund:any){
    debugger;
    this.emitemitterrefund.emit(_refund);
  }
  }

  


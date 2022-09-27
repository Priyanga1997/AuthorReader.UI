import { Component, Input, OnInit } from '@angular/core';
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
  public imageURL="https://localhost:44398/";
  constructor(private orderService:OrderService) { }

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
  }


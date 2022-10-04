import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  public books:any=[];
  public grandTotal !:number;
  public imageURL="https://localhost:44393/";
  constructor(private purchase:PurchaseService, private router: Router) { }

  ngOnInit(): void {
    this.purchase.getBooks().subscribe(res=>{
      this.books=res;     
      this.grandTotal = this.purchase.getTotalPrice();     
      })      
      }

      removeItem(item:any){
        this.purchase.removeCartItem(item);
      }
      navigateToReader(){
        this.router.navigate(['reader']);
      }
      GoBack(){
        this.router.navigate(['reader']);
      }

  }



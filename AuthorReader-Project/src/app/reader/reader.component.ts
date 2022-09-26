import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../services/api.service';
import { NavbarService } from '../services/navbar.service';
import { PurchaseService } from '../services/purchase.service';
import { Reader } from '../models/reader.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReaderLoginComponent } from '../reader-login/reader-login.component';
import { Order } from '../models/OrderModel';
import { ReaderLogin } from '../models/ReaderLoginModel';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {
  public bookList: any = [];
  isEdit = false;
  public totalItem: number = 0;
  searchForm: any = FormGroup;
  readerLoginForm: any = FormGroup;
  orderForm: any = FormGroup;
  public title: any = '';
  public category: any = '';
  public price: any = 0;
  public publisher: any = '';
  public userName: any = '';
  public emailId: any = '';
  images: any;
  public id: string = '';
  public idForDelete: string = '';
  public selectedTitle:string='';
  public selectedPrice:number=0;
  public selectedTotal:number=0;
  public total:number=0;
  public quantity:number=0;
  showTable: boolean = false;
  readerLogin = false;
  showOrder = false;
  showViewOrder = false;
  showOrders = false;
  ReaderLoginModel: ReaderLogin = new ReaderLogin();
  OrderModel: Order = new Order();
  OrderModels: Array<Order> = new Array<Order>();
  ReaderModel: Reader = new Reader();
  ReaderModels: Array<Reader> = new Array<Reader>();
  
  @ViewChild('callAPIDialog') callAPIDialog!: TemplateRef<any>;
  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private api: ApiService,
    private purchase: PurchaseService, private nav: NavbarService, public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      title: [''],
      category: [''],
      publisher: [''],
      price: ['']
    });
    this.readerLoginForm = this.formBuilder.group({
      username: ['',Validators.required],
      emailId: ['',Validators.required]
    });
    this.orderForm = this.formBuilder.group({
      quantity: ['',Validators.required]
    });
    this.nav.hide();
    this.searchAllBooks();
    this.purchase.getBooks().subscribe(res => {
      this.bookList = res;
      this.bookList.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.price });
      });
      this.purchase.getBooks().subscribe(res => {
        this.totalItem = res.length;
      })
    })
  }
  getUrl() {
    return "url('../assets/SearchBookImage.jpg')";
  }

  SuccessGet(input: any) {
    this.images = input;
  }
  backClick() {
    this.router.navigate(['navigation']);
  }
  addToCart(item: any) {
    this.purchase.addToCart(item);
  }
  navigateToPurchase() {
    this.router.navigate(['purchase']);
  }
  isEmpty: boolean = false;
  searchAllBooks() {

    this.http.get("https://localhost:44398/api/reader/" + '?title=' + this.ReaderModel.Title + '&category=' + this.ReaderModel.Category + '&price=' + this.ReaderModel.Price + '&publisher=' + this.ReaderModel.Publisher)
      .subscribe(res => this.Success(res), res => console.log(res));
    this.showTable = !this.showTable;

  }
  Success(input: any) {
    this.ReaderModels = input;
    console.log(this.ReaderModels);
  }
  BuyBook(input:any) {
    this.readerLogin = true;
    this.dialog.open(this.callAPIDialog);
    alert('Enter your username and password to place an order');
    this.id = input.id;  
    this.title = input.title;
    this.price = input.price;
  }
  orderDetails(event:any) {
    debugger;
    this.showOrder = true;
    this.selectedTitle = this.title;
    this.selectedPrice = this.price;
    this.ReaderModel.Title = this.selectedTitle;
  }
  updateTotal(event:any){
    this.quantity = parseInt(event.target.value);
    this.total = this.selectedPrice * this.quantity;
    this.selectedTotal = this.total;
    this.OrderModel.total = this.selectedTotal;
    this.OrderModel.quantity = this.quantity;
  }
  onOptionsSelected(event:any){
    this.OrderModel.paymentType = event.target.value;
   console.log(this.OrderModel.paymentType); //option value will be sent as event
  }
  submit(){
    debugger;
    this.showViewOrder = true;
    var postOrderData = {
      Username: this.ReaderLoginModel.userName,
      EmailId:this.ReaderLoginModel.emailId,
      BookId:this.id,
      Title:this.ReaderModel.Title,
      Price:this.ReaderModel.Price,
      Quantity:this.OrderModel.quantity,
      Total:this.OrderModel.total,
      PaymentMethod:this.OrderModel.paymentType
    };
    console.log(postOrderData);
    this.http.post('https://localhost:44398/api/Order/postOrder', postOrderData).subscribe(res=>this.PostSuccess(res),res=>console.log(res));
  }
  PostSuccess(input: any) {
    this.OrderModels = input;
    this.ReaderLoginModel = input;
    alert('Your order has been placed successfully');
  }
  viewOrders(){
    this.showOrders= true;
  }
  close(){
  this.dialog.closeAll();
  }
  // username:any;
  // email:any
  //   openDialog(): void {
  //     const dialogRef = this.dialog.open(ReaderComponent, {
  //       width: '250px',
  //       data: {name: this.username, animal: this.email},
  //     });

  // }
  EditSearch(input: any) {
    debugger;
    this.isEdit = true;
    this.ReaderModel = input;
    this.id = input.id;
    //this.http.put("https://localhost:44398/api/reader?id="+input.id).subscribe(res=>this.Success(res),res=>console.log(res));
  }
  DeleteSearch(input: any) {
    this.http.delete("https://localhost:44398/api/reader?id=" + input.id).subscribe(res => this.Success(res), res => console.log(res));
  }

  alert() {
    this.title = this.ReaderModel.Title;
    this.category = this.ReaderModel.Category;
    this.price = this.ReaderModel.Price;
    this.publisher = this.ReaderModel.Publisher;
    if (this.title && this.category && this.price == 0 && this.publisher == null) {
      alert('Please enter any of the input field to get the search results');
    }
  }
}

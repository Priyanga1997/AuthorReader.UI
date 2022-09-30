import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, TemplateRef, ViewChild, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Reader } from 'src/app/models/reader.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from 'src/app/models/OrderModel';
import { ReaderLogin } from 'src/app/models/ReaderLoginModel';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { OrderService } from 'src/app/services/order.service';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon';
import { outputAst } from '@angular/compiler';
import { LoginService } from 'src/app/services/login.service';

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
  //public emailId: any = '';
  images: any;
  public id: string = '';
  public idForDelete: string = '';
  public selectedTitle: string = '';
  public selectedPrice: number = 0;
  public selectedTotal: number = 0;
  public total: number = 0;
  public quantity: number = 0;
  showTable: boolean = false;
  readerLogin = false;
  showOrder = false;
  showOrderDetails = false;
  showSearchDetails = true;
  showOrders = false;
  showReadBookDetails = false;
  public emailId ="";
  public emailIdJson = localStorage.getItem('emailId');
  ReaderLoginModel: ReaderLogin = new ReaderLogin();
  OrderModel: Order = new Order();
  OrderModels: Array<Order> = new Array<Order>();
  ReaderModel: Reader = new Reader();
  ReaderModels: Array<Reader> = new Array<Reader>();
  opened = false;
  sidenav!: MatSidenav;
  @ViewChild('callAPIDialog') callAPIDialog!: TemplateRef<any>;
  //public userEmailId="";
  //public emailId="";
  //public userEmailId = "";
  //public userEmailIdJson = localStorage.getItem('userEmailId');
  
  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private api: ApiService,
    private purchase: PurchaseService, private nav: NavbarService, public dialog: MatDialog,
    private orderService: OrderService,private login:LoginService
  ) { }

  ngOnInit(): void {
    this.nav.hide();
    this.searchForm = this.formBuilder.group({
      title: [''],
      category: [''],
      publisher: [''],
      price: ['']
    });
    this.readerLoginForm = this.formBuilder.group({
      username: ['', Validators.required],
      emailId: ['', Validators.required]
    });
    this.orderForm = this.formBuilder.group({
      quantity: ['', Validators.required]
    });
    //this.searchAllBooks();
    this.purchase.getBooks().subscribe(res => {
      this.bookList = res;
      this.bookList.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.price });
      });
      this.purchase.getBooks().subscribe(res => {
        this.totalItem = res.length;
      })
    })
    this.emailId = this.emailIdJson !== null ? JSON.parse(this.emailIdJson) : " ";
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
  public ErrorMessage: any;
  searchAllBooks() {
    this.http.get("https://localhost:44398/api/reader/" + '?title=' + this.ReaderModel.Title + '&category=' + this.ReaderModel.Category + '&price=' + this.ReaderModel.Price + '&publisher=' + this.ReaderModel.Publisher)
      .subscribe((res: any) => {
        this.Success(res);
        if (res.length <= 0) {
          this.ErrorMessage = "No Book Found. Search by entering valid details!!";
          document.getElementById('btnErrorMsg')?.click();
          console.log(this.ErrorMessage);
        };
      },
        (err: any) => {
          console.log(err);
        });
  }

  Success(input: any) {
    this.ReaderModels = input;
    console.log(this.ReaderModels);
  }
  BuyBook(input: any) {
    this.readerLogin = true;
    this.dialog.open(this.callAPIDialog);
    alert('Enter your payment details to place an order');
    this.id = input.id;
    this.title = input.title;
    this.price = input.price;
    this.selectedTitle = this.title;
    this.selectedPrice = this.price;
    this.ReaderModel.Title = this.selectedTitle;
  }
  orderDetails(event: any) {
    debugger;
    this.showOrder = true;
    // this.selectedTitle = this.title;
    // this.selectedPrice = this.price;
    // this.ReaderModel.Title = this.selectedTitle;
  }
  updateTotal(event: any) {
    this.quantity = parseInt(event.target.value);
    this.total = this.selectedPrice * this.quantity;
    this.selectedTotal = this.total;
    this.OrderModel.total = this.selectedTotal;
    this.OrderModel.quantity = this.quantity;
  }
  onOptionsSelected(event: any) {
    this.OrderModel.paymentType = event.target.value;
    console.log(this.OrderModel.paymentType); //option value will be sent as event
  }
  submit() {
    debugger;
    this.OrderModel.emailId = localStorage.getItem('emailId');
    var postOrderData = {
      // Username: this.ReaderLoginModel.userName,
      EmailId:this.OrderModel.emailId,
      BookId: this.id,
      Title: this.ReaderModel.Title,
      Price: this.ReaderModel.Price,
      Quantity: this.OrderModel.quantity,
      Total: this.OrderModel.total,
      PaymentMethod: this.OrderModel.paymentType,
      Active: this.OrderModel.active
    };
    console.log(postOrderData);
    this.http.post('https://localhost:44398/api/Order/postOrder', postOrderData)
      .subscribe(res => this.PostSuccess(res), res => console.log(res));
  }
  SuccessMessage='';
  PostSuccess(input: any) {
    this.OrderModels = input;
    this.ReaderLoginModel = input;
    alert('Your Order has been placed successfully.');
    // this.SuccessMessage ="Your Order has been placed successfully.";
    // document.getElementById('btnSuccessMsg')?.click();
  }
  showViewOrder() {
    debugger;
    this.showOrderDetails = true;
    this.showSearchDetails = false;
    this.showReadBookDetails = false;
    this.OrderModel.emailId = localStorage.getItem('emailId');
    this.orderService.viewOrders(this.OrderModel.emailId).subscribe(res => this.GetSuccess(res), res => console.log(res));
  }
  GetSuccess(input: any) {
    this.OrderModels = input;
  }
  close() {
    this.dialog.closeAll();
  }
  showReadBooks(){
    debugger;
    this.showOrderDetails = false;
    this.showSearchDetails = false;
    this.showReadBookDetails = true;
    this.OrderModel.emailId = localStorage.getItem('emailId');
    this.orderService.viewOrders(this.OrderModel.emailId).subscribe(res => this.GetSuccess(res), res => console.log(res));
  }
  cancelOrder(cancelorder:any){
    debugger;
    this.orderService.cancelOrder(cancelorder.orderId).subscribe(res=>this.CancelSuccess(res),res=>console.log(res));
  }
  CancelSuccess(input:any){
    this.SuccessMessage ="You can get your refund within 24hrs of payment.";
    document.getElementById('btnSuccessMsg')?.click();
  }
  getReadBookUrl() {
    return "url('../assets/ReadBookImage.jpg')";
  }
  getViewOrdersUrl() {
    return "url('../assets/ViewOrdersImage.jpg')";
  }
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
}

import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-grid-ui',
  templateUrl: './grid-ui.component.html',
  styleUrls: ['./grid-ui.component.css']
})
export class GridUiComponent implements OnInit {
  public bookList:any=[];
  public totalItem :number=0;
  public imageURL="https://digitalbooksimages.blob.core.windows.net/images/";
  SuccessMessage='';
  constructor(private purchase:PurchaseService,private api:ApiService,private router: Router) { }
//getting column names
gridColumns: Array<any> = new Array<any>();

//getting column data
gridData: Array<any> = new Array<any>();
  ngOnInit(): void {
  }
  @Input("grid-columns")
  set SetGridColumns(_gridColumn:Array<any>){
    this.gridColumns=_gridColumn;
  }

  @Input("grid-data")
  set SetGridData(_gridData:Array<any>){
    this.gridData=_gridData;
  }
  @Output("grid-selected")
  emitemitter:EventEmitter<any>=new EventEmitter<any>();

  selectedGrid(_selected:any){
    debugger;
    this.emitemitter.emit(_selected);
  }

  @Output("grid-deleted")
  emitemitterd:EventEmitter<any>=new EventEmitter<any>();

  deleteGrid(_dselected:any){
    this.emitemitter.emit(_dselected);
  }
  addToCart(item:any){
    this.purchase.addToCart(item);
   }

  @Output("grid-buyBook")
  emitemitterbuyBook:EventEmitter<any>=new EventEmitter<any>();

  buyNow(_buyBook:any){
    debugger;
    this.emitemitterbuyBook.emit(_buyBook);
  }
}

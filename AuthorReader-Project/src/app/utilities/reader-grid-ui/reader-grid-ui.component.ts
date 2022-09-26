import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-reader-grid-ui',
  templateUrl: './reader-grid-ui.component.html',
  styleUrls: ['./reader-grid-ui.component.css']
})
export class ReaderGridUiComponent implements OnInit {
  public imageURL="https://localhost:44398/";
  constructor() { }
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

}

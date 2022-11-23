import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public bookList:any;
  constructor(private api:ApiService) { }
  imageURL="./assets/DigitalBookImage.jpg";
  public bookImageURL="https://digitalbooksimages.blob.core.windows.net/images/";
  public id:any;
  ngOnInit(): void {
    this.api.getAllBooks().subscribe(res=>{this.bookList=res;})
  }
  getUrl(){
    return "url('../assets/DigitalBookImage.jpg')";
  }
  searchText:string='';
  onSearchTextEntered(searchValue:string){
     this.searchText = searchValue;
     console.log(this.searchText);
  }

}

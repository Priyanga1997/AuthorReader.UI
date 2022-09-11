import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CreatebookComponent } from '../createbook/createbook.component';

@Component({
  selector: 'app-root',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private dialog:MatDialog){

  }
  openDialog(): void {
     this.dialog.open(CreatebookComponent, {
      width: '35%'
    });
  }


  ngOnInit(): void {
  }

}

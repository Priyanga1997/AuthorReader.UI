import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  public visible!: boolean;
  constructor() { }
  hide() { this.visible = false; }

  show() { this.visible = true; }
}

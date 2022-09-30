import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthorComponent } from './author.component';

describe('AuthorComponent', () => {
  let component: AuthorComponent;
  let fixture: ComponentFixture<AuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorComponent ],
      imports:[ReactiveFormsModule, HttpClientModule,MatDialogModule,MatSelectModule,MatRadioModule,
        MatInputModule,BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get book details created by author', (() => {
    fixture = TestBed.createComponent(AuthorComponent);
    component = fixture.debugElement.componentInstance;
    let result = component.getAllBooks();
    console.log('get books', result);
    expect(result).toEqual();
  }));
});

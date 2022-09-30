import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { LoginService } from 'src/app/services/login.service';
import { OrderService } from 'src/app/services/order.service';
import { OrderComponent } from '../order/order.component';
import { ReaderComponent } from './reader.component';

describe('ReaderComponent', () => {
  let component: ReaderComponent;
  let fixture: ComponentFixture<ReaderComponent>;

  beforeEach(async () => {
    let http: HttpClient;
    let order: OrderService;
    let readerLogin:LoginService;
    await TestBed.configureTestingModule({
      declarations: [ReaderComponent,OrderComponent],
      imports: [HttpClientModule, AppModule]
    })
      .compileComponents();
    http = TestBed.inject(HttpClient);
    order = TestBed.inject(OrderService);
    readerLogin = TestBed.inject(LoginService);
    fixture = TestBed.createComponent(ReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', ()=>{
    expect(component).toBeTruthy();
  });

  it('search books', (() => {
    fixture = TestBed.createComponent(ReaderComponent);
    component = fixture.debugElement.componentInstance;
    let result = component.searchAllBooks();
    console.log('search books', result);
    expect(result).toEqual(undefined);
  }));

  it('reader purchasing books', (() => {
    fixture = TestBed.createComponent(ReaderComponent);
    component = fixture.debugElement.componentInstance;
    let result = component.submit();
    console.log('reader ordering books', result);
    expect(result).toEqual(undefined);
  }));
});

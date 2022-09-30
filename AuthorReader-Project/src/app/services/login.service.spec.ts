import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let http:HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(LoginService);
    http=TestBed.inject(HttpClient);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

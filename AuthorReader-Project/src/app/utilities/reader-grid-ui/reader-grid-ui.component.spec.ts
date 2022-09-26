import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderGridUiComponent } from './reader-grid-ui.component';

describe('ReaderGridUiComponent', () => {
  let component: ReaderGridUiComponent;
  let fixture: ComponentFixture<ReaderGridUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaderGridUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReaderGridUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

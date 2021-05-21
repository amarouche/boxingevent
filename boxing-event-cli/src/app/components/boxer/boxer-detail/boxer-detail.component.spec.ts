import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxerDetailComponent } from './boxer-detail.component';

describe('BoxerDetailComponent', () => {
  let component: BoxerDetailComponent;
  let fixture: ComponentFixture<BoxerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

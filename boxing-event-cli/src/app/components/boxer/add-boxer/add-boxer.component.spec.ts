import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoxerComponent } from './add-boxer.component';

describe('AddBoxerComponent', () => {
  let component: AddBoxerComponent;
  let fixture: ComponentFixture<AddBoxerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBoxerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBoxerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

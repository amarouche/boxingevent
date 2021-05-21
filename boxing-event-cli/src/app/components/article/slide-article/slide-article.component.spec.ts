import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideArticleComponent } from './slide-article.component';

describe('SlideArticleComponent', () => {
  let component: SlideArticleComponent;
  let fixture: ComponentFixture<SlideArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

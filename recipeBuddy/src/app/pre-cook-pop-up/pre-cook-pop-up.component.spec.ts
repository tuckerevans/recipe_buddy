import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreCookPopUpComponent } from './pre-cook-pop-up.component';

describe('PreCookPopUpComponent', () => {
  let component: PreCookPopUpComponent;
  let fixture: ComponentFixture<PreCookPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreCookPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreCookPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

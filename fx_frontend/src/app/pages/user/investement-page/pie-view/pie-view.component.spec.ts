import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieViewComponent } from './pie-view.component';


describe('PieViewComponent', () => {
  let component: PieViewComponent;
  let fixture: ComponentFixture<PieViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PieViewComponent]
    });
    fixture = TestBed.createComponent(PieViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

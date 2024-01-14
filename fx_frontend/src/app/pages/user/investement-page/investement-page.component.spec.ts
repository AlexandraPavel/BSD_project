import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestementPageComponent } from './investement-page.component';

describe('InvestementPageComponent', () => {
  let component: InvestementPageComponent;
  let fixture: ComponentFixture<InvestementPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestementPageComponent]
    });
    fixture = TestBed.createComponent(InvestementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

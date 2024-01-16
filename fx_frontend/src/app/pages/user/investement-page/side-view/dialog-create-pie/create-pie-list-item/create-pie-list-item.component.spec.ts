import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePieListItemComponent } from './create-pie-list-item.component';

describe('CreatePieListItemComponent', () => {
  let component: CreatePieListItemComponent;
  let fixture: ComponentFixture<CreatePieListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePieListItemComponent]
    });
    fixture = TestBed.createComponent(CreatePieListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

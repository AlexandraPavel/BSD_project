import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { PieItem } from '../model/pie-item';

import { PieListItemComponent } from './pie-list-item.component';

describe('MenuListItemComponent', () => {
  let component: PieListItemComponent;
  let fixture: ComponentFixture<PieListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PieListItemComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieListItemComponent);
    component = fixture.componentInstance;

    const item = {} as PieItem;
    component.item = item;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

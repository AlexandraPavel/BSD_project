import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { CreatePieListItemComponent } from './create-pie-list-item.component';
import { EditPieListItemComponent } from './edit-pie-list-item.component';

describe('EditPieListItemComponent', () => {
  let component: EditPieListItemComponent;
  let fixture: ComponentFixture<EditPieListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPieListItemComponent]
    });
    fixture = TestBed.createComponent(EditPieListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

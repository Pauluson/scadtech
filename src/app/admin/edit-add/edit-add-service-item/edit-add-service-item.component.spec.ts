import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddServiceItemComponent } from './edit-add-service-item.component';

describe('EditAddServiceItemComponent', () => {
  let component: EditAddServiceItemComponent;
  let fixture: ComponentFixture<EditAddServiceItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAddServiceItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddServiceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

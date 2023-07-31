import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditPlanificationComponent} from './edit-planification.component';

describe('EditPlanificationComponent', () => {
  let component: EditPlanificationComponent;
  let fixture: ComponentFixture<EditPlanificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPlanificationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlanificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

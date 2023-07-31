import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AllPlanificationsComponent} from './all-planifications.component';

describe('AllPlanificationsComponent', () => {
  let component: AllPlanificationsComponent;
  let fixture: ComponentFixture<AllPlanificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllPlanificationsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPlanificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

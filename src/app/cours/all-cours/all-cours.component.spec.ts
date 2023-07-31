import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AllCoursComponent} from './all-cours.component';

describe('AllCoursComponent', () => {
  let component: AllCoursComponent;
  let fixture: ComponentFixture<AllCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllCoursComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

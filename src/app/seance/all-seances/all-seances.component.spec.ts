import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AllSeancesComponent} from './all-seances.component';

describe('AllSeancesComponent', () => {
  let component: AllSeancesComponent;
  let fixture: ComponentFixture<AllSeancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllSeancesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSeancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

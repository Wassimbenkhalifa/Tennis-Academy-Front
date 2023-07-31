import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShowSeanceComponent} from './show-seance.component';

describe('ShowSeanceComponent', () => {
  let component: ShowSeanceComponent;
  let fixture: ComponentFixture<ShowSeanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowSeanceComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSeanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

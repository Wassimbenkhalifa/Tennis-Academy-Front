import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AllTerrainComponent} from './all-terrain.component';

describe('AllTerrainComponent', () => {
  let component: AllTerrainComponent;
  let fixture: ComponentFixture<AllTerrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllTerrainComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

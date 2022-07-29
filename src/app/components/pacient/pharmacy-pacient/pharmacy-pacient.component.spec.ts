import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyPacientComponent } from './pharmacy-pacient.component';

describe('PharmacyPacientComponent', () => {
  let component: PharmacyPacientComponent;
  let fixture: ComponentFixture<PharmacyPacientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyPacientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyPacientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

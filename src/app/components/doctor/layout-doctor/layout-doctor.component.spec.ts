import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDoctorComponent } from './layout-doctor.component';

describe('LayoutDoctorComponent', () => {
  let component: LayoutDoctorComponent;
  let fixture: ComponentFixture<LayoutDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

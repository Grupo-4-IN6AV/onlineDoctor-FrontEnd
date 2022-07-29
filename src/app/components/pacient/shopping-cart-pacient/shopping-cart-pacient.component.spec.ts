import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartPacientComponent } from './shopping-cart-pacient.component';

describe('ShoppingCartPacientComponent', () => {
  let component: ShoppingCartPacientComponent;
  let fixture: ComponentFixture<ShoppingCartPacientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartPacientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingCartPacientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

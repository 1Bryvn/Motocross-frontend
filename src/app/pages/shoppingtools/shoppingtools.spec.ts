import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Shoppingtools } from './shoppingtools';

describe('Shoppingtools', () => {
  let component: Shoppingtools;
  let fixture: ComponentFixture<Shoppingtools>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shoppingtools]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Shoppingtools);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

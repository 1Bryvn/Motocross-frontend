import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Buildandprice } from './buildandprice';

describe('Buildandprice', () => {
  let component: Buildandprice;
  let fixture: ComponentFixture<Buildandprice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Buildandprice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Buildandprice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

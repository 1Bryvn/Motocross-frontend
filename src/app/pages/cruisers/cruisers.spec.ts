import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cruisers } from './cruisers';

describe('Cruisers', () => {
  let component: Cruisers;
  let fixture: ComponentFixture<Cruisers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cruisers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cruisers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

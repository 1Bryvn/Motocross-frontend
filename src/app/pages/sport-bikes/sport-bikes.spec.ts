import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportBikes } from './sport-bikes';

describe('SportBikes', () => {
  let component: SportBikes;
  let fixture: ComponentFixture<SportBikes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportBikes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportBikes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

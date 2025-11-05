import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Newandevents } from './newandevents';

describe('Newandevents', () => {
  let component: Newandevents;
  let fixture: ComponentFixture<Newandevents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Newandevents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Newandevents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

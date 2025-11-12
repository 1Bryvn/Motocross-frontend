import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelDetails } from './model-details';

describe('ModelDetails', () => {
  let component: ModelDetails;
  let fixture: ComponentFixture<ModelDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

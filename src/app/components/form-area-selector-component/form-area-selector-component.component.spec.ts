import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAreaSelectorComponent } from './form-area-selector-component.component';

describe('FormAreaSelectorComponent', () => {
  let component: FormAreaSelectorComponent;
  let fixture: ComponentFixture<FormAreaSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAreaSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormAreaSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

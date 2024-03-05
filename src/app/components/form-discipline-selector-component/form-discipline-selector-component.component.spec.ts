import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDisciplineSelectorComponent } from './form-discipline-selector-component.component';

describe('FormDisciplineSelectorComponent', () => {
  let component: FormDisciplineSelectorComponent;
  let fixture: ComponentFixture<FormDisciplineSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDisciplineSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormDisciplineSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

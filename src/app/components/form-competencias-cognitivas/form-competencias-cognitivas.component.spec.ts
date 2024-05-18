import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCompetenciasCognitivasComponent } from './form-competencias-cognitivas.component';

describe('FormCompetenciasCognitivasComponent', () => {
  let component: FormCompetenciasCognitivasComponent;
  let fixture: ComponentFixture<FormCompetenciasCognitivasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCompetenciasCognitivasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCompetenciasCognitivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

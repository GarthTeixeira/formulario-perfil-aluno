import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCadatroFormularioComponent } from './form-cadastro-formulario.component';

describe('FormCadatroFormularioComponent', () => {
  let component: FormCadatroFormularioComponent;
  let fixture: ComponentFixture<FormCadatroFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCadatroFormularioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormCadatroFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

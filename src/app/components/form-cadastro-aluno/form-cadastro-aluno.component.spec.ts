import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCadastroAlunoComponent } from './form-cadastro-aluno.component';

describe('FormCadastroAlunoComponent', () => {
  let component: FormCadastroAlunoComponent;
  let fixture: ComponentFixture<FormCadastroAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCadastroAlunoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCadastroAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

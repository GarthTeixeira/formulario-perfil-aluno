import { TestBed } from '@angular/core/testing';

import { FormAlunosService } from './form-alunos.service';

describe('FormAlunosService', () => {
  let service: FormAlunosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormAlunosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

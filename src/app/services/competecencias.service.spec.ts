import { TestBed } from '@angular/core/testing';

import { CompetecenciasService } from './competecencias.service';

describe('CompetecenciasService', () => {
  let service: CompetecenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetecenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

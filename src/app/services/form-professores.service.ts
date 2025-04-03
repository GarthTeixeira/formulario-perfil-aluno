import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DadosRespostaProfessorInterface } from '../interfaces/dados-reposta-professor-interface';
import { Observable } from 'rxjs';
import { TypeDisciplinaRegister } from '../types/serviceTypes';
import { DataSharedService } from '../shared/data-shared.service';
@Injectable({
  providedIn: 'root',
})
export class FormProfessoresService {
  apiUrl: string | undefined;

  constructor(
    private http: HttpClient,
    private dataService: DataSharedService
  ) {
    this.apiUrl = `${this.dataService.getHost()}/professor-form`;
  }

  insertProfessor(professor: DadosRespostaProfessorInterface): Observable<any> {
    return this.http.post(this.apiUrl + '/insert-professor', professor);
  }

  insertResposta(resposta: any) {
    return this.http.put(this.apiUrl + '/insert-resposta', resposta);
  }

  getFormulariosBySchool(escolaId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-by-school/${escolaId}`);
  }

  getDisciplinaRegister(formId: string): Observable<TypeDisciplinaRegister[]> {
    return this.http.get<TypeDisciplinaRegister[]>(
      `${this.apiUrl}/get-subject-registers/${formId}`
    );
  }
}

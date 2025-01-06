import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DadosRespostaProfessorInterface } from '../interfaces/dados-reposta-professor-interface';
import { Observable } from 'rxjs';
import { TypeProfessorRegister } from '../types/serviceTypes';
@Injectable({
  providedIn: 'root'
})
export class FormProfessoresService {

  apiUrl = 'http://localhost:5000/professor-form';

  constructor(private http:HttpClient) {}

  insertProfessor(professor: DadosRespostaProfessorInterface):Observable<any> {
   
    return this.http.post(this.apiUrl+'/insert-professor', professor)
  }

  insertResposta(resposta: any) {
    return this.http.put(this.apiUrl+'/insert-resposta', resposta)
  }

  getFormulariosBySchool(escolaId:any): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-by-school/${escolaId}`)
  }

  getProfessorRegister(formId:string): Observable<TypeProfessorRegister[]> {
    return this.http.get<TypeProfessorRegister[]>(`${this.apiUrl}/get-subject-registers/${formId}`)
  }

}

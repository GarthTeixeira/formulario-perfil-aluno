import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DadosRespostaProfessorInterface } from '../interfaces/dados-reposta-professor-interface';
@Injectable({
  providedIn: 'root'
})
export class FormProfessoresService {

  apiUrl = 'http://localhost:5000/student_form';

  constructor(private http:HttpClient) {}

  insertProfessor(professor: DadosRespostaProfessorInterface) {
   
    return this.http.post(this.apiUrl+'/insert-professor', professor)
  }

  insertResposta(resposta: any) {
    return this.http.put(this.apiUrl+'/insert-resposta', resposta)
  }

}

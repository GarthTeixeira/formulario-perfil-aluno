import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlunoInterface } from '../interfaces/aluno-interface';

@Injectable({
  providedIn: 'root'
})
export class FormAlunosService {

  apiUrl = 'http://localhost:5000/student_form';

  constructor(private http:HttpClient) {}

  insertAluno(aluno: AlunoInterface) {
    const data = {aluno, respostas: {}}
    return this.http.post(this.apiUrl+'/insert-form', data)
  }

}

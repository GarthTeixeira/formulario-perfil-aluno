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
   
    return this.http.post(this.apiUrl+'/insert-aluno', aluno)
  }

  insertResposta(resposta: any) {
    return this.http.put(this.apiUrl+'/insert-resposta', resposta)
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisciplinasService {

  apiUrl = 'http://localhost:5000/disciplines';

  private corsHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  constructor(private http: HttpClient) { }

    getAllDisciplinas(): Observable<any> {
      return this.http.get<any>(this.apiUrl+'/get-all');
    }

    getByArea(area: string) {
    
      return this.http.get<any>(`${this.apiUrl}/get-area/${area}`,{headers: this.corsHeaders});
    }
}

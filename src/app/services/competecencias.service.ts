import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetecenciasService {

  apiUrl = 'http://localhost:5000/competences';

  constructor(private http: HttpClient) { }

  getByArea(area: string | undefined) : Observable<any> { 
    return this.http.get<any>(`${this.apiUrl}/get-area/${area}?withHabilities=true`);
  }
}

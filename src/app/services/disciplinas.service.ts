import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSharedService } from '../shared/data-shared.service';
import { LocalStorageService } from '../shared/services/local-storage-service.service';
import { Disciplina } from '../types/serviceTypes';

@Injectable({
  providedIn: 'root'
})
export class DisciplinasService {

  private corsHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  constructor(
    private http: HttpClient, 
    private dataShared: DataSharedService, 
    private localStorageService: LocalStorageService
  ) { }

    getAllDisciplinas(): Observable<any> {
      const baseUrl = this.dataShared.getHost();
      return this.http.get<any>(baseUrl+'/get-all');
    }

    getDisciplinasOfSchool(): Observable<any>{
      const baseUrl = this.dataShared.getHost()
      const school_id = this.dataShared.getData()?.escola || this.localStorageService.getItem('userData')['escola'];
      return this.http.get<any>(`${baseUrl}/disciplina/${school_id}`)
    }

    getByArea(area: string) {
      const baseUrl = this.dataShared.getHost();
      const school_id = this.dataShared.getData()?.escola || this.localStorageService.getItem('userData')['escola'];
      return this.http.get<Disciplina>(
        `${baseUrl}/schools/get-by-area?school=${school_id}&area=${area}`,
        {headers: this.corsHeaders}
      );
    }

    getByAreaWithActualSerie(area: string) {
      const baseUrl = this.dataShared.getHost();
      const school_id = this.dataShared.getData()?.escola || this.localStorageService.getItem('userData')['escola'];
      const serie = this.localStorageService.getItem('userData')['turma']['serie']
      return this.http.get<Disciplina>(
        `${baseUrl}/schools/get-by-area?school=${school_id}&area=${area}&serie=${serie[0]}`,
        {headers: this.corsHeaders}
      );
    }
}

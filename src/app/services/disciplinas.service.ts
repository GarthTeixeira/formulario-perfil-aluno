import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSharedService } from '../shared/data-shared.service';

@Injectable({
  providedIn: 'root'
})
export class DisciplinasService {

  private corsHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  constructor(private http: HttpClient, private dataShared: DataSharedService) { }

    getAllDisciplinas(): Observable<any> {
      const baseUrl = this.dataShared.getHost();
      return this.http.get<any>(baseUrl+'/get-all');
    }

    getByArea(area: string) {
      const baseUrl = this.dataShared.getHost();
      const school_id = this.dataShared.getData().escola;
      return this.http.get<any>(
        `${baseUrl}/schools/get-by-area?school=${school_id}&area=${area}`,
        {headers: this.corsHeaders}
      );
    }
}

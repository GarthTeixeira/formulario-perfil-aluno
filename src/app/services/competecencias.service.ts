import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSharedService } from '../shared/data-shared.service';

@Injectable({
  providedIn: 'root'
})
export class CompetecenciasService {

  constructor(private http: HttpClient,private dataService: DataSharedService) { }

  getByArea(area: string | undefined) : Observable<any> { 
    const apiUrl = `${this.dataService.getHost()}/competences`
    return this.http.get<any>(`${apiUrl}/get-area/${area}?withHabilities=true`);
  }

  getCognitive() : Observable<any> { 
    const apiUrl = `${this.dataService.getHost()}/competences`
    return this.http.get<any>(`${apiUrl}/get-area/COGNITIVOS?withHabilities=false`);
  }
}

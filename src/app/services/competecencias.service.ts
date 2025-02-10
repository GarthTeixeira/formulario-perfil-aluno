import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSharedService } from '../shared/data-shared.service';

@Injectable({
  providedIn: 'root'
})
export class CompetecenciasService {

  apiUrl:string | undefined

  constructor(private http: HttpClient,private dataService: DataSharedService) {
     this.apiUrl = `${this.dataService.getHost()}/competences`
   }

  getByArea(area: string | undefined) : Observable<any> { 
    return this.http.get<any>(`${this.apiUrl}/get-area/${area}?withHabilities=true`);
  }

  getCognitive() : Observable<any> { 
    return this.http.get<any>(`${this.apiUrl}/get-area/COGNITIVOS?withHabilities=false`);
  }
}

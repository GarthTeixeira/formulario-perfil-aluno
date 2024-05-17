import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataSharedService } from '../shared/data-shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EscolasService {

  constructor(private http: HttpClient,private dataService: DataSharedService) { }

  getEscolasOptions(): Observable<any> {
    return this.http.get<any>(`${this.dataService.getHost()}/schools/get-schools-names`);
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DataSharedService {

  private data: any;

  private host: string | undefined;

  constructor(){
    this.host = environment.apiKey
  }

  getHost() {
    return this.host;
  }

  setData(data: any) {
    this.data = data;
  }

  getData() {
    return this.data;
  }
}

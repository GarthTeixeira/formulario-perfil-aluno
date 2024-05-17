import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharedService {

  private data: any;

  private host: string = 'http://localhost:5000';

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

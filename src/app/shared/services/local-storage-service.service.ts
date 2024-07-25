import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Salvar dados no localStorage
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Obter dados do localStorage
  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Remover item do localStorage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Limpar todos os dados do localStorage
  clear(): void {
    localStorage.clear();
  }
}

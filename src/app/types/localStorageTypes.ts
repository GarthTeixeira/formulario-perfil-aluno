import { EscolaInterface } from "../interfaces/escola-interface";

export type Turma = {
    _id:string;
    serie:string;
    nome:string;
}
export type UserDataLocalStorage = {
    id: string;
    nome: string;
    escola:EscolaInterface;
    email:string;
    turma:Turma
  };